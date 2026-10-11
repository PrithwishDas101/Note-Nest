import axios from "axios";
import { supabase } from "./supabase.js";

const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5001/api"
  : "/api";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(async (config) => {
  if (!supabase) return config;

  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;

  const token = data.session?.access_token;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});

export default api;