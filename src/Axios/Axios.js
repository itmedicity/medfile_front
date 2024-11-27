// @ts-nocheck
import Axios from "axios";
import { API_URL, RETURN_URL } from "../Constant/Static";

const axiosApi = Axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "en-GB,en",
    },
});

axiosApi.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

axiosApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const localData = localStorage.getItem("app_auth");
        const userSlno = atob(JSON.parse(localData)?.authNo);
        const originalRequest = error.config;
        // Check if the error is due to an expired token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite retries
            try {
                await axiosApi.get(`/user/getRefershToken/${userSlno}`, { withCredentials: true });
                return axiosApi(originalRequest);
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                // Handle logout or redirection to login page
                window.location.href = "/";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosApi;
