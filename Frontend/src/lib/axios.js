import axios from "axios";

const backendUrl = import.meta.env.VITE_APP_SERVER_URL;
const axiosInstance = axios.create({
	baseURL: backendUrl,
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;