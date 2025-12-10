// middleware/getClerkUser.js
const { verifyToken } = require("@clerk/express");

const getClerkUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    // Verify token using your Clerk backend secret
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    // Extract user ID from token
    req.clerkUserId = payload.sub;

    next();
  } catch (error) {
    console.error("getClerkUser error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = getClerkUser;