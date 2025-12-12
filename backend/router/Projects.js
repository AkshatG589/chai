const express = require("express");
const router = express.Router();
const UserProject = require("../models/UserProject");
const getClerkUser = require("../middleware/getClerkUser");
const upload = require("../middleware/upload");
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

    // 2️⃣ Fetch all projects for this clerk user
    const projects = await UserProject.find({ clerkUserId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      user: {
        username,
        clerkUserId,
      },
      projects,
    });
  } catch (error) {
    console.error("Fetch user projects error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching user projects",
    });
  }
});

module.exports = router;