const { verifyToken } = require("@clerk/express");

const checkOwner = async (req, res, next) => {
  try {
    const username = req.params.username;

    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      req.isOwner = false;
      return next();
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    const clerkUserId = payload.sub;

    const { users } = require("@clerk/clerk-sdk-node");
    const clerkUser = await users.getUser(clerkUserId);

    req.isOwner = clerkUser.username === username;
    req.authUserId = clerkUserId;

    next();
  } catch (error) {
    console.error("checkOwner error:", error);
    req.isOwner = false;
    next(); // allow route to run
  }
};

module.exports = checkOwner;