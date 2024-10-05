import axiosApi from "../Axios/Axios"

export const getDocTypeMasterList = async () => {
    return axiosApi.get('/documentTypeMaster/getDocTypeMaster').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getSubTypeMasterList = async () => {
    return axiosApi.get('/subTypeMaster/getAllSubTypeMaster').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getCategoryMasterList = async () => {
    return axiosApi.get('/documentCategory/getAllDocCategory').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}