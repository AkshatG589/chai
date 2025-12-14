import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/* ---------------------------------------------------------
   GET ALL CLERK USERS
   GET /api/clerkuser/all
   Query Params:
   - page   (number)   → default 1
   - limit  (number)   → 10 | 20 | 50 | 100
   - search (string)   → username or email
--------------------------------------------------------- */
export const getAllClerkUsers = async ({
  page = 1,
  limit = 10,
  search = "",
} = {}) => {
  try {
    const res = await axios.get(`${API}/api/clerkuser/all`, {
      params: {
        page,
        limit,
        search,
      },
    });

    return res.data;
  } catch (error) {
    console.error("API getAllClerkUsers error:", error);
    throw error.response?.data || error;
  }
};