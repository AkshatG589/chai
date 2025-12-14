const express = require("express");
const router = express.Router();
const { users } = require("@clerk/clerk-sdk-node");
const UserExtra = require("../../models/UserExtra");

// ----------------------------------------------------
// GET ALL CLERK USERS (PAGINATION + SEARCH)
// GET /api/clerkuser/all
// ----------------------------------------------------
router.get("/all", async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const search = (req.query.search || "").toLowerCase();

    const offset = (page - 1) * limit;

    // -------------------------------
    // Fetch users from Clerk
    // -------------------------------
    const clerkResponse = await users.getUserList({
      limit,
      offset,
    });

    // 🔥 IMPORTANT FIX
    const clerkUsers = Array.isArray(clerkResponse)
      ? clerkResponse
      : clerkResponse.data || [];

    const total = clerkResponse.total_count ?? clerkUsers.length;

    // -------------------------------
    // Search filter (username / email)
    // -------------------------------
    const filteredUsers = search
      ? clerkUsers.filter((u) => {
          const username = (u.username || "").toLowerCase();
          const email =
            (u.email_addresses?.[0]?.email_address || "").toLowerCase();

          return username.includes(search) || email.includes(search);
        })
      : clerkUsers;

    // -------------------------------
    // Fetch UserExtra
    // -------------------------------
    const clerkIds = filteredUsers.map((u) => u.id);

    const extras = await UserExtra.find(
      { clerkUserId: { $in: clerkIds } },
      {
        clerkUserId: 1,
        bio: 1,
        city: 1,
        state: 1,
        country: 1,
      }
    ).lean();

    const extraMap = {};
    extras.forEach((e) => {
      extraMap[e.clerkUserId] = e;
    });

    // -------------------------------
    // Final Response
    // -------------------------------
    const usersResponse = filteredUsers.map((u) => {
  const primaryEmail =
    Array.isArray(u.emailAddresses) && u.emailAddresses.length > 0
      ? u.emailAddresses[0].emailAddress
      : null;

  return {
    id: u.id,
    username: u.username || null,

    // ✅ CORRECT FIELD NAMES
    firstName: u.firstName || null,
    lastName: u.lastName || null,
    email: primaryEmail,

    imageUrl: u.imageUrl || u.profileImageUrl || null,

    extra: extraMap[u.id]
      ? {
          bio: extraMap[u.id].bio || null,
          city: extraMap[u.id].city || null,
          state: extraMap[u.id].state || null,
          country: extraMap[u.id].country || null,
        }
      : null,
  };
});

    return res.json({
      success: true,
      page,
      limit,
      total,
      users: usersResponse,
    });
  } catch (error) {
    console.error("Fetch Clerk users error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
});

module.exports = router;