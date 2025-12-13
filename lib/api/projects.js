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
/* ---------------------------------------------------------
   UPDATE PROJECT
   PUT /:username/:projectId
   Requires:
   - Clerk token
   - FormData (multipart)
--------------------------------------------------------- */
export const updateProject = async (
  username,
  projectId,
  formData,
  token
) => {
  try {
    const response = await axios.put(
      `${API}/api/projects/${username}/${projectId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API updateProject error:", error);
    throw error.response?.data || error;
  }
};

/* ---------------------------------------------------------
   DELETE PROJECT
   DELETE /:username/:projectId
   Requires:
   - Clerk token
--------------------------------------------------------- */
export const deleteProject = async (
  username,
  projectId,
  token
) => {
  try {
    const response = await axios.delete(
      `${API}/api/projects/${username}/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API deleteProject error:", error);
    throw error.response?.data || error;
  }
};
/* ---------------------------------------------------------
   GET LATEST PROJECT BY USERNAME (GET /:username/latest)
   Public endpoint → No login required
--------------------------------------------------------- */
export const getLatestProjectByUsername = async (username) => {
  try {
    const response = await axios.get(
      `${API}/api/projects/${username}/latest`
    );

    return response.data;
  } catch (error) {
    console.error("API getLatestProjectByUsername error:", error);
    throw error.response?.data || error;
  }
};