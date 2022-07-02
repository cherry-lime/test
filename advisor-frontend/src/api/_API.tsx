import axios from "axios";

/**
 * Create axios instance to be used in the rest of API
 */

const API =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? axios.create({
        withCredentials: true,
        baseURL: "http://localhost:5000/",
      })
    : axios.create({
        withCredentials: true,
        baseURL: "https://tabackend.azurewebsites.net",
      });

export default API;
