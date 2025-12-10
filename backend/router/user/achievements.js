const express = require("express");
const router = express.Router();

const UserAchievement = require("../../models/UserAchievement");
const getClerkUser = require("../../middleware/getClerkUser");
const { users } = require("@clerk/clerk-sdk-node");

// ======================================================
// CREATE A NEW PROJECT
// GET /api/projects/create
// ======================================================
router.post("/create", getClerkUser, async (req, res) => {
  try {
    const { clerkUserId } = req;

    const { title, issuer, year, certificateUrl, description, image } = req.body;

    if (!title)
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });

    const achievement = await UserAchievement.create({
      clerkUserId,
      title,
      issuer,
      year,
      certificateUrl,
      description,
      image,
    });

    res.json({
      success: true,
      message: "Achievement created successfully",
      data: achievement,
    });
  } catch (err) {
    console.error("Create achievement error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
// ======================================================
// PUBLIC PROJECTS ENDPOINT
// GET /api/achievements/:username
// ======================================================
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const clerkUsers = await users.getUserList({ username });

    if (clerkUsers.length === 0)
      return res.json({ success: false, message: "User not found in Clerk" });

    const clerkUserId = clerkUsers[0].id;

    const achievements = await UserAchievement.find({ clerkUserId });

    res.json({
      success: true,
      username,
      count: achievements.length,
      data: achievements,
    });

  } catch (err) {
    console.error("Public achievements error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ======================================================
// 3️⃣ UPDATE EXISTING PROJECT (PUT)
//    URL: /api/achievements/update/:projectId
// ======================================================
router.put("/update/:id", getClerkUser, async (req, res) => {
  try {
    const { clerkUserId } = req;
    const { id } = req.params;

    // Try finding the achievement that belongs to the logged-in user
    const achievement = await UserAchievement.findOne({
      _id: id,
      clerkUserId,
    });

    // If still not found → return error
    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    // Update fields
    Object.assign(achievement, req.body);
    await achievement.save();

    return res.json({
      success: true,
      message: "Achievement updated successfully",
      data: achievement,
    });

  } catch (err) {
    console.error("Update achievement error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ======================================================
// 4️⃣ DELETE PROJECT
// GET /api/achievements/delete/:id
// ======================================================
router.delete("/delete/:id", getClerkUser, async (req, res) => {
  try {
    const { clerkUserId } = req;
    const { id } = req.params;

    await UserAchievement.findOneAndDelete({ _id: id, clerkUserId });

    res.json({
      success: true,
      message: "Achievement deleted successfully",
    });

  } catch (err) {
    console.error("Delete achievement error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});