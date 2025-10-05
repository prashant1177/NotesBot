const User = require("./models/user.js");
const mongoose = require("mongoose");

database()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function database() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/writingnotes`);
}

async function seedNotes() {
  try {
    const user = await User.findOneAndUpdate(
      { email: `ganesh@gmail.com` },
      { isPremium: true }
    );
    console.log(`✅ Inserted notes`, user);

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding notes:", error);
    mongoose.connection.close();
  }
}

seedNotes();
