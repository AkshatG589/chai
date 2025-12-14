const express = require("express");
const router = express.Router();
const UserProject = require("../models/UserProject");
const getClerkUser = require("../middleware/getClerkUser");
const upload = require("../middleware/upload");
const checkOwner = require("../middleware/checkOwner");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const { users } = require("@clerk/clerk-sdk-node"); // Clerk backend SDK

// POST /add → with multer for file upload
router.post("/add", getClerkUser, upload.single("image"), async (req, res) => {
  try {
    const { title, description, tech, link, github, tags } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Project title is required",
      });
    }

    let imageUrl = "";

    // If image exists → upload to Cloudinary
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    const newProject = new UserProject({
      clerkUserId: req.clerkUserId,
      title,
      description,
      tech: tech ? JSON.parse(tech) : [],   // frontend sends string
      link,
      github,
      image: imageUrl,
      tags: tags ? JSON.parse(tags) : [],   // frontend sends string
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating project",
    });
  }
});

// --------------------------------------------------------------
// GET: Fetch all projects by username
// /api/projects/:username
// --------------------------------------------------------------
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    // 1️⃣ Fetch Clerk user via username
    const userList = await users.getUserList({
      username: [username],
      limit: 1,
    });

    if (userList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const clerkUserId = userList[0].id;

    // 2️⃣ Fetch all projects
    const projects = await UserProject.find({ clerkUserId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      user: {
        username,
        clerkUserId,
      },
      projects, // ✅ frontend-friendly key
    });
  } catch (error) {
    console.error("Fetch user projects error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching user projects",
    });
  }
});

// ------------------------------
// UPDATE PROJECT
// ------------------------------
router.put(
  "/:username/:projectId",
  upload.single("image"),
  checkOwner,
  async (req, res) => {
    try {
      const { username, projectId } = req.params;

      // ❌ Not owner
      if (!req.isOwner) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const project = await UserProject.findById(projectId);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      // Ensure project belongs to same user
      if (project.clerkUserId !== req.authUserId) {
        return res.status(403).json({
          success: false,
          message: "You cannot edit this project",
        });
      }

      const { title, description, tech, link, github, tags } = req.body;

      // Update fields
      if (title !== undefined) project.title = title;
      if (description !== undefined) project.description = description;
      if (link !== undefined) project.link = link;
      if (github !== undefined) project.github = github;

      if (tech) project.tech = JSON.parse(tech);
      if (tags) project.tags = JSON.parse(tags);

      // If new image uploaded → upload to Cloudinary
      if (req.file) {
        const imageUrl = await uploadToCloudinary(req.file.buffer);
        project.image = imageUrl;
      }

      await project.save();

      return res.json({
        success: true,
        message: "Project updated successfully",
        project,
      });
    } catch (error) {
      console.error("Update project error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error while updating project",
      });
    }
  }
);

// ------------------------------
// DELETE PROJECT
// ------------------------------
router.delete(
  "/:username/:projectId",
  checkOwner,
  async (req, res) => {
    try {
      const { projectId } = req.params;

      // ❌ Not owner
      if (!req.isOwner) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const project = await UserProject.findById(projectId);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      // Ensure ownership
      if (project.clerkUserId !== req.authUserId) {
        return res.status(403).json({
          success: false,
          message: "You cannot delete this project",
        });
      }

      await project.deleteOne();

      return res.json({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      console.error("Delete project error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error while deleting project",
      });
    }
  }
);

// --------------------------------------------------------------
// GET: Fetch latest projects by username
// GET /api/projects/:username/latest
// --------------------------------------------------------------
router.get("/:username/latest", async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    // 1️⃣ Find Clerk user by username
    const userList = await users.getUserList({
      username: [username],
      limit: 1,
    });

    if (userList.length === 0) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }

    const clerkUserId = userList[0].id;

    // 2️⃣ Fetch latest project (sorted by createdAt DESC)
    const latestProject = await UserProject.findOne({ clerkUserId })
      .sort({ createdAt: -1 });

    if (!latestProject) {
      return res.status(200).json({
        success: false,
        message: "No projects found for this user",
      });
    }

    // 3️⃣ Response
    return res.status(200).json({
      success: true,
      username,
      project: latestProject,
    });

  } catch (error) {
    console.error("Fetch latest project error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching latest project",
    });
  }
});
module.exports = router;