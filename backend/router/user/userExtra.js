const express = require("express");
const router = express.Router();

const getClerkUser = require("../../middleware/getClerkUser");
const UserExtra = require("../../models/UserExtra");
const { users } = require("@clerk/clerk-sdk-node");

// ======================================================
// PUBLIC PROFILE ENDPOINT (NO TOKEN NEEDED)
// GET /api/extra/:username
// ======================================================
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // 1️⃣ Find Clerk user using username
    const clerkUsers = await users.getUserList({ username });

    if (clerkUsers.length === 0) {
      return res.status(200).json({
        success: false,
        message: "User not found in Clerk",
      });
    }

    const clerkUser = clerkUsers[0]; // only one user will exist with that username
    const clerkUserId = clerkUser.id;

    // 2️⃣ Find UserExtra profile
    const userExtra = await UserExtra.findOne({ clerkUserId });

    if (!userExtra) {
      return res.json({
        success: true,
        exists: false,
        message: "User exists but extra profile not created",
        data: null,
      });
    }

    // 3️⃣ Return public profile
    return res.json({
      success: true,
      exists: true,
      username: clerkUser.username,
      profile: userExtra,
    });

  } catch (error) {
    console.error("Public profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;

// ======================================================
// 2️⃣ CREATE/UPDATE USER EXTRA PROFILE
// ======================================================
router.put("/update", getClerkUser, async (req, res) => {
  try {
    const { clerkUserId } = req;
    const newData = req.body; // frontend JSON body

    // Check if user extra schema exists
    let user = await UserExtra.findOne({ clerkUserId });

    if (!user) {
      // CREATE NEW USER EXTRA PROFILE
      user = new UserExtra({
        clerkUserId,
        ...newData,
      });

      await user.save();

      return res.json({
        success: true,
        action: "created",
        message: "User extra profile created successfully",
        data: user,
      });
    }

    // UPDATE EXISTING PROFILE
    Object.assign(user, newData); // merge all fields
    await user.save();

    return res.json({
      success: true,
      action: "updated",
      message: "User extra profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("PUT /update user-extra error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;