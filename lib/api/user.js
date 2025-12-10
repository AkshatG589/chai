import axios from "axios";

const API = process.env.NEXT_PUBLIC_BACKEND_URL;

// -------------------------------------------------------
// 1️⃣ Get CLERK user   (already made)
// -------------------------------------------------------
export const getUser = async (username, token) => {
  try {
    const res = await axios.get(`${API}/api/user/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// -------------------------------------------------------
// 2️⃣ Get PUBLIC extra profile (NO TOKEN NEEDED)
// GET /api/extra/:username
// -------------------------------------------------------
export const getPublicExtraProfile = async (username) => {
  try {
    const res = await axios.get(`${API}/api/extra/${username}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching public profile:", error);
    throw error;
  }
};

// -------------------------------------------------------
// 3️⃣ Create/Update User Extra Profile (Requires Token)
// PUT /api/extra/update
// -------------------------------------------------------
export const updateUserExtra = async (data, token) => {
  try {
    const res = await axios.put(`${API}/api/extra/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error updating extra profile:", error);
    throw error;
  }
};