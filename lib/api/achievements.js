import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
/**
 * Create Achievement
 * @param {FormData} formData
 * @param {string} token - Clerk JWT
 */
export const createAchievement = async (formData, token) => {
  const res = await axios.post(
    `${API}/api/achievements/create`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

/**
 * Update Achievement
 * @param {string} id
 * @param {FormData} formData
 * @param {string} token
 */
export const updateAchievement = async (id, formData, token) => {
  const res = await axios.put(
    `${API}/api/achievements/update/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

/**
 * Delete Achievement
 * @param {string} id
 * @param {string} token
 */
export const deleteAchievement = async (id, token) => {
  const res = await axios.delete(
    `${API}/api/achievements/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

/**
 * Get ALL achievements of a user (public)
 * @param {string} username
 */
export const getAchievementsByUsername = async (username) => {
  const res = await axios.get(
    `${API}/api/achievements/${username}`
  );
  return res.data;
};

/**
 * Get LATEST achievement of a user (public)
 * @param {string} username
 */
export const getLatestAchievement = async (username) => {
  const res = await axios.get(
    `${API}/api/achievements/latest/${username}`
  );
  return res.data;
};