const mongoose = require("mongoose");

const userAchievementSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      index: true, // 🔥 fast user-based queries
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    issuer: {
      type: String,
      trim: true,
    },

    year: {
      type: Number,
      min: 1950,
      max: new Date().getFullYear(),
    },

    certificateUrl: {
      type: String,
      match: /^https?:\/\/.+/,
    },

    description: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      match: /^https?:\/\/.+/,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAchievement", userAchievementSchema);