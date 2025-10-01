require("dotenv").config(); // Load .env file variables
const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const User = require("../models/User.js");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { authenticateJWT } = require("../middleware/middleware.js");
const SubCancel = require("../models/SubCancel.js");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

//
//
// Run every day at midnight
cron.schedule("0 0 * * *", async () => {
  const now = new Date();

  try {
    // Find users whose premiumExpiry is in the past and still marked as premium
    const result = await User.updateMany(
      { isPremium: true, premiumExpiry: { $lt: now } },
      {
        $set: {
          isPremium: false,
          subscriptionId: null,
          premiumStart: null,
          premiumExpiry: null,
        },
      }
    );

    console.log(`Auto-downgraded ${result.modifiedCount} users from premium`);
  } catch (err) {
    console.error("Error in auto-downgrade cron job:", err);
  }
});

// Create subscription
router.post("/payment/create-subscription", async (req, res) => {
  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: "plan_RCSt131Ud0DwIi", // This must be created in Razorpay dashboard
      customer_notify: 1,
      total_count: 12, // 12 months max
    });
    res.json({ subscriptionId: subscription.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/payment/verify", authenticateJWT, async (req, res) => {
  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
    req.body;

  const sign = razorpay_subscription_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    await User.findByIdAndUpdate(req.user.id, {
      $set: {
        isPremium: true,
        subscriptionId: razorpay_subscription_id,
        premiumExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month ahead
      },
    });
    res.json({ success: true });
  } else {
    res.status(400).json({ error: "Invalid signature" });
  }
});

router.get("/checkpremium", authenticateJWT, async (req, res) => {
  try {
    // assuming you store it in DB under user.isPremium
    const user = await User.findById(req.user.id);
    res.json({ isPremium: user?.isPremium || false });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//
// Cancel subscription
//
router.post("/cancel-subscription", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    try {
      const { reason } = req.body;
      await SubCancel.create({ reason: reason || "no reason", user: user._id });
    } catch (error) {
      console.log("Error creating subcancel");
    }
    if (!user || !user.subscriptionId) {
      return res.status(400).json({ error: "No paid subscription found." });
    }

    const response = await razorpay.subscriptions.cancel(user.subscriptionId);

    res.json({ success: true, response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// Webhook for subscription updates
//
router.post("/razorpay/webhook", async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const shasum = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (shasum !== req.headers["x-razorpay-signature"]) {
    return res.status(400).json({ error: "Invalid webhook signature" });
  }

  const event = req.body.event;
  const payload = req.body.payload;

  if (event === "subscription.updated") {
    const subscription = payload.subscription.entity;
    const subscriptionId = subscription.id;
    const status = subscription.status;

    if (status === "active") {
      await User.findOneAndUpdate(
        { subscriptionId },
        {
          $set: {
            isPremium: true,
            premiumExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        }
      );
    } else if (
      status === "cancelled" ||
      status === "completed" ||
      status === "expired"
    ) {
      await User.findOneAndUpdate(
        { subscriptionId },
        {
          $set: {
            isPremium: false,
            subscriptionId: null,
            premiumStart: null,
            premiumExpiry: null,
          },
        }
      );
    }
  }

  res.json({ status: "ok" });
});

module.exports = router; // export the router
