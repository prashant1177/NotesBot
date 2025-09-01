const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const User = require("../models/User.js");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { authenticateJWT } = require("../middleware/middleware.js");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// rzp_test_RCTBfvEKpFxGP3
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
      plan_id: "plan_RCT8xTrE8f7LUJ", // This must be created in Razorpay dashboard
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
    console.log(razorpay_subscription_id);
    console.log(razorpay_payment_id);
    console.log(razorpay_signature);
  const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest("hex");
    console.log(expectedSign);

  if (expectedSign === razorpay_signature) {
    await User.findByIdAndUpdate(req.user.id ,
      {
        $set: {
          isPremium: true,
          subscriptionId: razorpay_subscription_id,
          premiumExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month ahead
        },
      }
    );
    res.json({ success: true });
  } else {
    console.log("Invalid signature")
    res.status(400).json({ error: "Invalid signature" });
  }
});

router.get("/checkpremium", authenticateJWT, async (req, res) => {
  try {
    // assuming you store it in DB under user.isPremium
    const user = await User.findById(req.user.id);
    console.log(user)
    res.json({ isPremium: user?.isPremium || false });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router; // export the router
