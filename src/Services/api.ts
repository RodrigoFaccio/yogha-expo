import axios from "axios";

const api = axios.create({
  baseURL: "http://18.215.162.219:3001",
});

export default api;
