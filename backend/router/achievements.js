const express = require("express");
const router = express.Router();

const { users } = require("@clerk/clerk-sdk-node");
const upload = require("../middleware/upload"); // multer memory storage
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const UserAchievement = require("../models/UserAchievement");
const getClerkUser = require("../middleware/getClerkUser");

router.post(
  "/create",
  getClerkUser,              // 🔐 Clerk auth
  upload.single("image"),    // 🖼️ optional image
  async (req, res) => {
    try {
      const { clerkUserId } = req;

      const {
        title,
        issuer,
        year,
        certificateUrl,
        description,
      } = req.body;

      // ❌ Mandatory check
      if (!title) {
        return res.status(400).json({
          success: false,
          message: "Title is required",
        });
      }

      let imageUrl = null;

      // 🖼️ Upload image if provided
      if (req.file) {
        imageUrl = await uploadToCloudinary(
          req.file.buffer,
          "user_achievements"
        );
      }

      // ✅ Create achievement
      const achievement = new UserAchievement({
        clerkUserId,
        title,
        issuer,
        year,
        certificateUrl,
        description,
        image: imageUrl,
      });

      await achievement.save();

      return res.status(201).json({
        success: true,
        message: "Achievement created successfully",
        achievement,
      });
    } catch (error) {
      console.error("Create achievement error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// UPDATE achievement
router.put(
  "/update/:id",
  getClerkUser,              // 🔐 Clerk auth
  upload.single("image"),    // 🖼️ optional new image
  async (req, res) => {
    try {
      const { clerkUserId } = req;
      const { id } = req.params;

      const achievement = await UserAchievement.findById(id);

      if (!achievement) {
        return res.status(200).json({
          success: false,
          message: "Achievement not found",
        });
      }

      // 🔒 Owner check
      if (achievement.clerkUserId !== clerkUserId) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this achievement",
        });
      }

      const {
        title,
        issuer,
        year,
        certificateUrl,
        description,
      } = req.body;

      // 📝 Update fields if provided
      if (title !== undefined) achievement.title = title;
      if (issuer !== undefined) achievement.issuer = issuer;
      if (year !== undefined) achievement.year = year;
      if (certificateUrl !== undefined) achievement.certificateUrl = certificateUrl;
      if (description !== undefined) achievement.description = description;

      // 🖼️ Upload new image if provided
      if (req.file) {
        const imageUrl = await uploadToCloudinary(
          req.file.buffer,
          "user_achievements"
        );
        achievement.image = imageUrl;
      }

      await achievement.save();

      return res.json({
        success: true,
        message: "Achievement updated successfully",
        achievement,
      });
    } catch (error) {
      console.error("Update achievement error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// DELETE achievement
router.delete(
  "/delete/:id",
  getClerkUser, // 🔐 Clerk auth
  async (req, res) => {
    try {
      const { clerkUserId } = req;
      const { id } = req.params;

      const achievement = await UserAchievement.findById(id);

      if (!achievement) {
        return res.status(200).json({
          success: false,
          message: "Achievement not found",
        });
      }

      // 🔒 Owner check
      if (achievement.clerkUserId !== clerkUserId) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to delete this achievement",
        });
      }

      await achievement.deleteOne();

      return res.json({
        success: true,
        message: "Achievement deleted successfully",
      });
    } catch (error) {
      console.error("Delete achievement error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// GET achievements by username (public profile)
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    // 1️⃣ Fetch Clerk user by username
    const userList = await users.getUserList({
      username: [username],
      limit: 1,
    });

    if (!userList || userList.length === 0) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }

    const clerkUserId = userList[0].id;

    // 2️⃣ Fetch achievements
    const achievements = await UserAchievement.find({ clerkUserId })
      .sort({ year: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      user: {
        username,
        clerkUserId,
      },
      total: achievements.length,
      achievements,
    });
  } catch (error) {
    console.error("Fetch achievements error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET latest achievement by username
router.get("/latest/:username", async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    // 1️⃣ Find Clerk user
    const userList = await users.getUserList({
      username: [username],
      limit: 1,
    });

    if (!userList || userList.length === 0) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }

    const clerkUserId = userList[0].id;

    // 2️⃣ Find latest achievement
    const achievement = await UserAchievement.findOne({ clerkUserId })
      .sort({ createdAt: -1 }); // 🔥 latest first

    if (!achievement) {
      return res.status(200).json({
        success: false,
        message: "No achievements found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      achievement,
    });
  } catch (error) {
    console.error("Fetch latest achievement error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;