import { format } from "date-fns";
import axiosApi from "../Axios/Axios";

export const getDocTypeMasterList = async () => {
  return await axiosApi
    .get("/documentTypeMaster/getDocTypeMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data;
      }
    });
};

export const getSubTypeMasterList = async () => {
  return await axiosApi
    .get("/subTypeMaster/getAllSubTypeMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data;
      }
    });
};

export const getCategoryMasterList = async () => {
  return await axiosApi
    .get("/documentCategory/getAllDocCategory")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data;
      }
    });
};

export const getSelectCategoryNameList = async () => {
  return await axiosApi
    .get("/documentCategory/selectCategoryMaster")
    .then((res) => {
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
  return await axiosApi
    .get("/docSubCategoryName/getAllDocSubCategory")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data;
      }
    });
};

export const getGroupList = async () => {
  return await axiosApi.get("/docGroupMaster/getAllDocGroup").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getIntitutionTypeList = async () => {
  return await axiosApi
    .get("/instituteType/getAllInstituteType")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data;
      }
    });
};

export const getSelectInstitutionTypeList = async () => {
  return await axiosApi
    .get("/instituteType/getInstitutionTypeSelect")
    .then((res) => {
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
  return await axiosApi
    .get("/institutionMaster/getAllInstitutionMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data;
      }
    });
};

export const getCourseTypeList = async () => {
  return await axiosApi.get("/courseType/getAllCourseType").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getSelectCourseTypeList = async () => {
  return await axiosApi.get("/courseType/getCourseTypeSelect").then((res) => {
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
  return await axiosApi.get("/courseMaster/getAllCourseMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getDocNumber = async () => {
  return await axiosApi.get("/selectComponets/getDocNumber").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data[0]?.number;
    }
  });
};

export const getSelectDocTypeMasterList = async () => {
  return await axiosApi
    .get("/documentTypeMaster/selectDocTypeMaster")
    .then((res) => {
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
  return await axiosApi
    .get("/subTypeMaster/selectSubTypeMaster")
    .then((res) => {
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
  return await axiosApi
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
  return await axiosApi
    .get("/courseMaster/getSelectCourseMaster")
    .then((res) => {
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
  return await axiosApi
    .get("/docSubCategoryName/getSubCategoryList")
    .then((res) => {
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
  return await axiosApi
    .get("/docGroupMaster/getSelectGroupList")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.group_slno,
            label: item.group_name.toUpperCase(),
          };
        });
      }
    });
};

export const getDocumentList = async () => {
  return await axiosApi.get("/docMaster/getDocMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data?.map((item) => {
        return {
          id: item.doc_slno,
          docDate: format(new Date(item.doc_date), "dd-MM-yyyy HH:mm:ss"),
          docVersion: format(
            new Date(item.doc_ver_date),
            "dd-MM-yyyy HH:mm:ss"
          ),
          ...item,
        };
      });
    }
  });
};

export const getDocInforByID = async (id) => {
  return await axiosApi.get(`/docMaster/getDocMasterById/${id}`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data[0];
    }
  });
};

export const getDocumentDetl = async (id) => {
  return await axiosApi.get(`/docMaster/getDocDetl/${id}`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getDocTypeCount = async () => {
  return await axiosApi.get(`/docMaster/getDocTypeCount`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getDocAll = async () => {
  return await axiosApi.get(`/docMaster/getDocSecureOnly`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};


export const getnonSecureDoconly = async () => {
  return await axiosApi.get(`/docMaster/getDocNonSecure`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getDocMasterLikeName = async (name) => {
  if (name !== '' || name !== undefined || name !== null) {
    return await axiosApi.get(`/docMaster/getDocMasterLikeName/${name}`).then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data
      } else {
        return []
      }
    });
  } else {
    return []
  }

};


export const getDocMasterLikeNameNonSecureOnly = async (name) => {
  if (name !== '' || name !== undefined || name !== null) {
    return await axiosApi.get(`/docMaster/getDocMasterLikeNameNonSecureOnly/${name}`).then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data
      } else {
        return []
      }
    })
  } else {
    return []
  }
};