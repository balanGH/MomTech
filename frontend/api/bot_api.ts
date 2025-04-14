import axios from "axios";

const api_URL = process.env.EXPO_PUBLIC_BOT_URL

const apiBot = axios.create({
  baseURL: api_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiBot;
