const mongoose = require("mongoose");

const userProjectSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      index: true, // 🔥 helps query speed
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    tech: {
      type: [String],
      default: [],
    },

    tags: {
      type: [String],
      default: [],        // ✅ ADDED
      index: true,        // optional (useful for filtering later)
    },

    link: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProject", userProjectSchema);