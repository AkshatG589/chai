const mongoose = require("mongoose");

const userExtraSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },

    // 🎓 Education
    education: {
      school10: {
        name: String,
        marks: Number,
        city: String,
        state: String,
        description: String,
      },
      school12: {
        name: String,
        marks: Number,
        stream: String,
        city: String,
        state: String,
        description: String,
      },
      colleges: [
        {
          name: String,
          degree: String,
          branch: String,
          startYear: Number,
          endYear: Number,
          cgpa: Number,
          city: String,
          state: String,
          description: String,
        },
      ],
    },

    // 💼 Professional
    skills: [String],

    languages: [
      {
        language: String,
        proficiency: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced", "Fluent", "Native"],
        },
      },
    ],

    hobbies: [String],

    // 🔗 Social Profiles
    links: {
      github: String,
      linkedin: String,
      instagram: String,
      twitter: String,
      website: String,
      youtube: String,
    },

    // 👤 Basic Profile
    bio: String,
    city: String,
    state: String,
    country: String,
    dob: Date,
    gender: String,

    // 💳 Payment Details (expanded with Razorpay)
    payment: {
      upiId: String,
      qrImage: String,
      bankAccount: {
        accountNumber: String,
        ifsc: String,
        bankName: String,
        branchName: String,
      },
      paypal: String,

      // ⭐ Newly Added
      razorpay: {
        keyId: String,      // Razorpay Key ID
        keySecret: String,  // Razorpay Secret
      },
    },

    // 📄 Resume and Cover
    resumeUrl: String,
    coverPhotoUrl: String,

    // ⚙️ Profile Settings
    settings: {
      showEmail: { type: Boolean, default: true },
      showSocialLinks: { type: Boolean, default: true },
      showSkills: { type: Boolean, default: true },
      allowMessages: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserExtra", userExtraSchema);