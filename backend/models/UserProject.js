const mongoose = require("mongoose");

const userProjectSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: String,
    tech: [String],
    link: String,
    github: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProject", userProjectSchema);