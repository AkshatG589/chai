const express = require("express");
const router = express.Router();

const checkOwner = require("../../middleware/checkOwner");
const { users } = require("@clerk/clerk-sdk-node");

router.get("/:username", checkOwner, async (req, res) => {
  try {
    const username = req.params.username;

    // username is unique
    const result = await users.getUserList({ username });
    const user = result[0];

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found",
        isOwner: false,
        user: null,
      });
    }

    // Extract only the safe + required fields
    const safeUser = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses?.[0]?.emailAddress || null,
      imageUrl: user.imageUrl,
      publicMetadata: user.publicMetadata || {},
      privateMetadata: user.privateMetadata || {},
      unsafeMetadata: user.unsafeMetadata || {},
    };

    res.json({
      success: true,
      isOwner: req.isOwner,
      user: safeUser,
    });

  } catch (err) {
    console.log("Find user error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      isOwner: false,
      user: null,
    });
  }
});

module.exports = router;