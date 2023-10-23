import axios from "axios";
import Axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1/",
});
export default api;