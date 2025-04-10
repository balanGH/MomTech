import axios from "axios";

const api_URL = process.env.EXPO_PUBLIC_API_URL

const apiClient = axios.create({
  baseURL: api_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
