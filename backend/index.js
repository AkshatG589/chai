const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
require("dotenv").config();

// ✅ Clerk
const { clerkMiddleware, verifyToken } = require("@clerk/express");

// Initialize app
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Clerk middleware (must be AFTER body parsing)
app.use(
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

// CONNECT TO MONGO
connectToMongo();

// Import Routes
const findUserRoutes = require("./router/user/findUser");
const UserExtraRoutes = require("./router/user/userExtra");
const UserAchievementRoutes = require("./router/user/achievements");
const Payment = require("./router/payments");
const Projects = require("./router/projects");
// Use Routes
app.use("/api/user", findUserRoutes);
app.use("/api/extra",UserExtraRoutes);
app.use("/api/achievements",UserAchievementRoutes);
app.use("/api/payments",Payment);
app.use("/api/projects", Projects);
// Root route
app.get("/", (req, res) => {
  res.send("Hello World! Backend is running 🚀");
});

// Start Server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});