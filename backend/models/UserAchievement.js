const mongoose = require("mongoose");

const userAchievementSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
    },

    title: { type: String, required: true },
    issuer: String,
    year: Number,
    certificateUrl: String,
    description: String,
    image: String, // optional image field
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAchievement", userAchievementSchema);