import { format } from "date-fns";
import axiosApi from "../Axios/Axios";

export const getDocTypeMasterList = async () => {
  return axiosApi.get("/documentTypeMaster/getDocTypeMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getSubTypeMasterList = async () => {
  return axiosApi.get("/subTypeMaster/getAllSubTypeMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getCategoryMasterList = async () => {
  return axiosApi.get("/documentCategory/getAllDocCategory").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getSelectCategoryNameList = async () => {
  return axiosApi.get("/documentCategory/selectCategoryMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data?.map((item) => {
        return {
          value: item.cat_slno,
          label: item.category_name.toUpperCase(),
        };
      });
    }
  });
};

export const getSubCategoryList = async () => {
  return axiosApi
    .get("/docSubCategoryName/getAllDocSubCategory")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data;
      }
    });
};

export const getGroupList = async () => {
  return axiosApi.get("/docGroupMaster/getAllDocGroup").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getIntitutionTypeList = async () => {
  return axiosApi.get("/instituteType/getAllInstituteType").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getSelectInstitutionTypeList = async () => {
  return axiosApi.get("/instituteType/getInstitutionTypeSelect").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data?.map((item) => {
        return {
          value: item.institute_type_slno,
          label: item.institute_type_name.toUpperCase(),
        };
      });
    }
  });
};

export const getInstitutionList = async () => {
  return axiosApi
    .get("/institutionMaster/getAllInstitutionMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data;
      }
    });
};

export const getCourseTypeList = async () => {
  return axiosApi.get("/courseType/getAllCourseType").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getSelectCourseTypeList = async () => {
  return axiosApi.get("/courseType/getCourseTypeSelect").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data?.map((item) => {
        return {
          value: item.course_type_slno,
          label: item.course_type_name.toUpperCase(),
        };
      });
    }
  });
};

export const getCourseList = async () => {
  return axiosApi.get("/courseMaster/getAllCourseMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getDocNumber = async () => {
  return axiosApi.get("/selectComponets/getDocNumber").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data[0]?.number;
    }
  });
};

export const getSelectDocTypeMasterList = async () => {
  return axiosApi.get("/documentTypeMaster/selectDocTypeMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data?.map((item) => {
        return {
          value: item.doc_type_slno,
          label: item.doc_type_master_name.toUpperCase(),
        };
      });
    }
  });
};

export const getSelectSubTypeMasterList = async () => {
  return axiosApi.get("/subTypeMaster/selectSubTypeMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data?.map((item) => {
        return {
          value: item.sub_type_slno,
          label: item.doc_sub_type_name.toUpperCase(),
        };
      });
    }
  });
};

export const getSelectInstitutionMasterList = async () => {
  return axiosApi
    .get("/institutionMaster/selectInstituteMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.institution_slno,
            label: item.institution_name.toUpperCase(),
          };
        });
      }
    });
};

export const getSelectCourseMasterList = async () => {
  return axiosApi.get("/courseMaster/getSelectCourseMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data?.map((item) => {
        return {
          value: item.course_slno,
          label: item.course_name.toUpperCase(),
        };
      });
    }
  });
};

export const getSeelctSubCategoryList = async () => {
  return axiosApi.get("/docSubCategoryName/getSubCategoryList").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data?.map((item) => {
        return {
          value: item.subcat_slno,
          label: item.subcat_name.toUpperCase(),
          catSlno: item.cat_slno,
        };
      });
    }
  });
};

export const getSelectGroupList = async () => {
  return axiosApi.get("/docGroupMaster/getSelectGroupList").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data?.map((item) => {
        return { value: item.group_slno, label: item.group_name.toUpperCase() };
      });
    }
  });
};

export const getDocumentList = async () => {
  return axiosApi.get("/docMaster/getDocMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data?.map((item) => {
        return {
          id: item.doc_slno,
          docDate: format(new Date(item.doc_date), "dd-MM-yyyy HH:mm:ss"),
          docVersion: format(new Date(item.doc_ver_date), "dd-MM-yyyy HH:mm:ss"),
          ...item,
        };
      });
    }
  });
};
