// @ts-nocheck
import Axios from "axios";
import { API_URL, RETURN_URL } from "../Constant/Static";
import { toast } from "react-toastify";

const axiosApi = Axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": 'application/json',
        "Accept-Language": "en-GB,en"
    },
})

axiosApi.interceptors.request.use(function (config) {
    const auth_info = localStorage.getItem('app_auth');
    const tokenData = JSON.parse(auth_info)
    const authToken = tokenData?.authToken
    if (authToken !== null && authToken !== undefined) {
        config.headers.Authorization = `Bearer ${authToken}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
})

axiosApi.interceptors.response.use(function (response) {
    if (response.data.status === 102 || response.data.status === 101) {
        localStorage.removeItem('app_auth');
        toast.error(
            <div className='flex h-20 flex-col' >
                <div className="text-center">
                    Session Expired, Please Login Again
                </div>
                <div className='flex justify-center'>
                    <button
                        className='bg-[#ed766a] text-white rounded-md p-[0.5] w-2/4 my-1'
                        onClick={() => window.location.href = RETURN_URL}>
                        Login
                    </button>
                </div>
            </div>, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return response;
}, function (error) {
    return Promise.reject(error);
})


export default axiosApi