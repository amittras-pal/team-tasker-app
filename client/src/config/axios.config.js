import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/",
});

axiosConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["authorization"] = `Bearer ${token}`;
  return config;
});

export default axiosConfig;
