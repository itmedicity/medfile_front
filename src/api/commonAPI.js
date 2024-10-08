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

export const getSelectCategoryNameList = async () => {
    return axiosApi.get('/documentCategory/selectCategoryMaster').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data?.map((item) => {
                return { value: item.cat_slno, label: item.category_name.toUpperCase() }
            })
        }
    })
}

export const getSubCategoryList = async () => {
    return axiosApi.get('/docSubCategoryName/getAllDocSubCategory').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getGroupList = async () => {
    return axiosApi.get('/docGroupMaster/getAllDocGroup').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getIntitutionTypeList = async () => {
    return axiosApi.get('/instituteType/getAllInstituteType').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getSelectInstitutionTypeList = async () => {
    return axiosApi.get('/instituteType/getInstitutionTypeSelect').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data?.map((item) => {
                return { value: item.institute_type_slno, label: item.institute_type_name.toUpperCase() }
            })
        }
    })
}

export const getInstitutionList = async () => {
    return axiosApi.get('/institutionMaster/getAllInstitutionMaster').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getCourseTypeList = async () => {
    return axiosApi.get('/courseType/getAllCourseType').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getSelectCourseTypeList = async () => {
    return axiosApi.get('/courseType/getCourseTypeSelect').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data?.map((item) => {
                return { value: item.course_type_slno, label: item.course_type_name.toUpperCase() }
            })
        }
    })
}

export const getCourseList = async () => {
    return axiosApi.get('/courseMaster/getAllCourseMaster').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getDocNumber = async () => {
    return axiosApi.get('/selectComponets/getDocNumber').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data[0]?.number
        }
    })
}