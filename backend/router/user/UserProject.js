const express = require("express");
const router = express.Router();

const getClerkUser = require("../../middleware/getClerkUser");
const UserProject = require("../../models/UserProject");
const { users } = require("@clerk/clerk-sdk-node");

// ======================================================
// CREATE A NEW PROJECT
// GET /api/projects/create
// ======================================================
router.post("/create", getClerkUser, async (req, res) => {
  try {
    const { clerkUserId } = req;

    const { title, description, tech, link, github, image } = req.body;

    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });

    const project = await UserProject.create({
      clerkUserId,
      title,
      description,
      tech,
      link,
      github,
      image,
    });

    res.json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (err) {
    console.error("Create project error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
// ======================================================
// PUBLIC PROJECTS ENDPOINT
// GET /api/projects/:username
// ======================================================
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // 1️⃣ Find Clerk user by username
    const clerkUsers = await users.getUserList({ username });

    if (clerkUsers.length === 0) {
      return res.status(200).json({
        success: false,
        message: "User not found in Clerk",
      });
    }

    const clerkUserId = clerkUsers[0].id;

    // 2️⃣ Find all projects of that user
    const projects = await UserProject.find({ clerkUserId }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      username,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Public GET /projects/:username error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ======================================================
// 3️⃣ UPDATE EXISTING PROJECT (PUT)
//    URL: /api/projects/update/:projectId
// ======================================================
router.put("/update/:id", getClerkUser, async (req, res) => {
  try {
    const { clerkUserId } = req;
    const { id } = req.params;
    const updateData = req.body;

    // ensure that user can only update his own project
    const project = await UserProject.findOne({ _id: id, clerkUserId });

    if (!project) {
      return res.status(200).json({
        success: false,
        message: "Project not found or unauthorized",
      });
    }

    Object.assign(project, updateData);
    await project.save();

    return res.json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    console.error("PUT /projects/update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ======================================================
// 4️⃣ DELETE PROJECT
// GET /api/projects/delete/:id
// ======================================================
router.delete("/delete/:id", getClerkUser, async (req, res) => {
  try {
    const { clerkUserId } = req;
    const { id } = req.params;

    const project = await UserProject.findOneAndDelete({
      _id: id,
      clerkUserId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or unauthorized",
      });
    }

    return res.json({
      success: true,
      message: "Project deleted successfully",
      deleted: project,
    });
  } catch (error) {
    console.error("DELETE /projects/delete error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;