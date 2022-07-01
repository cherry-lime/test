import axios from "axios";

/**
 * Create axios instance to be used in the rest of API
 */
const API = axios.create({
  withCredentials: true,
  baseURL: "https://tabackend.azurewebsites.net",
});

export default API;
