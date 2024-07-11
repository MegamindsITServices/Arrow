import axios from "axios";
export const axiosInstance = axios.create();

export const getConfig = async () => {
  try {
    const response = await axios.get("/app.config.json");
    const baseEndpoint = response.data.baseendpoint;

    // Optionally, you can set axios.defaults.baseURL if you want it to apply to all axios instances.
    axiosInstance.defaults.baseURL = baseEndpoint;
  } catch (error) {
    console.error("Error fetching app config:", error);
    throw error;
  }
};
