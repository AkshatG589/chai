import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/* ---------------------------------------------------------
   CREATE PROJECT (POST /add)
   Requires: Clerk token + FormData (multipart)
--------------------------------------------------------- */
export const createProject = async (formData, token) => {
  try {
    const response = await axios.post(`${API}/api/projects/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("API createProject error:", error);
    throw error.response?.data || error;
  }
};

/* ---------------------------------------------------------
   GET PROJECTS BY USERNAME (GET /:username)
   Public endpoint → No login required
--------------------------------------------------------- */
export const getProjectsByUsername = async (username) => {
  try {
    const response = await axios.get(`${API}/api/projects/${username}`);
    return response.data;
  } catch (error) {
    console.error("API getProjectsByUsername error:", error);
    throw error.response?.data || error;
  }
};