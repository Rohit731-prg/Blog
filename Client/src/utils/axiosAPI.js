import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:2580", withCredentials: true });

export default api;