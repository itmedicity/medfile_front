// @ts-nocheck
import Axios from "axios";
import { API_URL, RETURN_URL } from "../Constant/Static";
import { toast } from "react-toastify";

const axiosApi = Axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": 'application/json',
        "Accept-Language": "en-GB,en"
    },
})

let authToken = null

export const setAuthToken = (token) => {
    authToken = token
}


// console.log(authToken)
axiosApi.interceptors.request.use(
    (config) => {
        // const auth_info = localStorage.getItem('app_auth');
        // const tokenData = JSON.parse(auth_info)
        // const authToken = tokenData?.authToken
        // if (authToken !== null && authToken !== undefined) {
        //     config.headers.Authorization = `Bearer ${authToken}`
        // }
        return config;
    },
    (error) => Promise.reject(error)
)

axiosApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log(error)
        const localData = localStorage.getItem("app_auth");
        const userSlno = atob(JSON.parse(localData)?.authNo);

        const originalRequest = error.config;
        // console.log(error.response?.status)
        // Check if the error is due to an expired token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite retries

            // await axiosApi.post(`/user/getRefershToken/${1}`)

            try {
                // Refresh the token
                const { data } = await axiosApi.post(`/user/getRefershToken/${userSlno}`);

                // Store the new access token
                // localStorage.setItem("accessToken", data.accessToken);

                // Retry the original request with the new token
                // originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
                return axiosApi(originalRequest);
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                // Handle logout or redirection to login page
                // localStorage.removeItem("accessToken");
                // window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
)


export default axiosApi