import axiosApi from "../Axios/Axios"

export const getDocTypeMasterList = async () => {
    return axiosApi.get('/documentTypeMaster/getDocTypeMaster').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}