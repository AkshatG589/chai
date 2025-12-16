const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
require("dotenv").config();

// ✅ Clerk
const { clerkMiddleware } = require("@clerk/express");

// Initialize app
const app = express();
const port = process.env.PORT || 5000;

// ===============================
// 🔍 Debug origin (safe to keep)
// ===============================
app.use((req, res, next) => {
  console.log("Incoming Origin:", req.headers.origin || "NO ORIGIN");
  next();
});

// ===============================
// 🌐 CORS (production-safe)
// ===============================
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://192.0.0.4:3000",
        "https://ak-chai.vercel.app"
      ];

      // Allow Postman / server-to-server / mobile apps
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);
      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ===============================
// 📦 Body parsing (IMPORTANT)
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// 🗄️ MongoDB
// ===============================
connectToMongo();

// ===============================
// 🔐 Clerk — ONLY for /api routes
// ===============================
app.use(
  "/api",
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

// ===============================
// 🚏 Routes
// ===============================
app.use("/api/user", require("./router/user/findUser"));
app.use("/api/extra", require("./router/user/userExtra"));
app.use("/api/achievements", require("./router/achievements"));
app.use("/api/payments", require("./router/payments"));
app.use("/api/projects", require("./router/projects"));
app.use("/api/clerkuser", require("./router/user/ClerkUser"));

// ===============================
// 🌍 Public route (NO Clerk)
// ===============================
app.get("/", (req, res) => {
  res.send("Hello World! Backend is running 🚀");
});

// ===============================
// 🚀 Start server
// ===============================
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});