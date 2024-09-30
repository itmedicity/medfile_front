// @ts-nocheck
import Axios from "axios";
import { API_URL } from "../Constant/Static";

export const axiosApi = Axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": 'application/json',
        "Accept-Language": "en-GB,en"
    },
})

axiosApi.interceptors.request.use(function (config) {
    const token = localStorage.getItem('app_auth');
    const tokenData = JSON.parse(token)
    const name = atob(tokenData?.authName)
    console.log(tokenData)
    console.log(name)

    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
}, function (error) {
    return Promise.reject(error);
})

axiosApi.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
})

