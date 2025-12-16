const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
require("dotenv").config();

// Clerk
const { clerkMiddleware } = require("@clerk/express");

// Initialize app
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// CONNECT TO MONGO
connectToMongo();

// 🔐 Apply Clerk ONLY to APIs (NOT globally)
app.use(
  "/api",
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

// Routes
app.use("/api/user", require("./router/user/findUser"));
app.use("/api/extra", require("./router/user/userExtra"));
app.use("/api/achievements", require("./router/achievements"));
app.use("/api/payments", require("./router/payments"));
app.use("/api/projects", require("./router/projects"));
app.use("/api/clerkuser", require("./router/user/ClerkUser"));

// Public root route (NO CLERK HERE)
app.get("/", (req, res) => {
  res.send("Hello World! Backend is running 🚀");
});

// Start Server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});