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
//get main catefories
export const getMainCategories = async () => {
  return await axiosApi
    .get("/docMaster/selectmainCategories")
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
            doc_institute_status: item.doc_institute_status
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



export const getNonSecDocumentList = async () => {
  return await axiosApi.get("/docMaster/getNonSecDocMaster").then((res) => {
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


export const getLocationMaster = async () => {
  return await axiosApi.get("/locationMaster/selectLocationMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getLocationMasterList = async () => {
  return await axiosApi.get("/locationMaster/getSelectLocationMasterList")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.loc_slno,
            label: item.loc_name.toUpperCase()
          };
        });
      }
    });
};

export const getRackMasterList = async () => {
  return await axiosApi.get("/rackMaster/selectRackMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getCustodianDepartmentMaster = async () => {
  return await axiosApi.get("/custodianDepartment/selectCusDepartmentList").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getSelectCustodianDepartmentList = async () => {
  return await axiosApi.get("/custodianDepartment/selectCusDepartment")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.cust_dept_slno,
            label: item.cust_dept_name.toUpperCase()
          };
        });
      }
    });
};

export const getCustodianMasterList = async () => {
  return await axiosApi.get("/custodianMaster/selectCustodianMasterList").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getRackMasterData = async () => {
  return await axiosApi.get("/rackMaster/selectCmpRackMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.rac_slno,
            label: item.rack.toUpperCase()
          };
        });
      }
    });
};

export const getSelectCustodianDepartmentData = async () => {
  return await axiosApi.get("/custodianMaster/selectCustodianMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.cust_slno,
            label: item.cust_name.toUpperCase()
          };
        });
      }
    });
};

export const getAllSuperUsers = async () => {
  return await axiosApi.get(`/user/getSuperUsers`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getAllUsers = async () => {
  return await axiosApi.get(`/user/getAllUser`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const userTypes = async () => {
  return await axiosApi.get(`/UserTypeMaster/getdatas`).then((res) => {
    const { success, data } = res.data;
    if (success === 1 && Array.isArray(data)) {
      return data.map(item => ({
        value: item.user_type_slno,
        label: item.user_type
      }));
    }
  });
};

export const getModules = async () => {
  return await axiosApi.get(`/ModuleNameMaster/getdatas`).then((res) => {
    const { success, data } = res.data;
    if (success === 1 && Array.isArray(data)) {
      return data.map(item => ({
        value: item.module_slno,
        label: item.module_name
      }));
    }
  });
};

export const getAllModules = async () => {
  return await axiosApi.get(`/ModuleNameMaster/selectAllModules`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data
    }
  });
};
export const getModuleMast = async () => {
  return await axiosApi.get(`/ModuleGroupMaster/getdatas`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};
export const getuserType = async () => {
  return await axiosApi.get(`/UserTypeMaster/getdatas`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};
export const getMenuNames = async () => {
  return await axiosApi.get(`/MenuNameMaster/getdatas`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getUserModules = async (loggedUser) => {
  return await axiosApi.get(`/UserGroupRightMaster/ModulewiseMenus/${loggedUser}`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data ? data : [];
    }
  });
};
export const userWiseSettingsRights = async (loggedUser) => {
  // console.log("loggedUser", loggedUser);

  return await axiosApi.get(`/UserGroupRightMaster/userWiseSettingsRights/${loggedUser}`).then((res) => {
    const { success, data } = res.data;
    // console.log(" success, data,", success, data);

    if (success === 1) {
      return data ? data : [];
    }
  });
};

export const SubCategoryById = async (catSlno) => {
  return await axiosApi.get(`/docSubCategoryName/getSubCategoryById/${catSlno}`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data
    }
  });
};

//fetching departments from medi_hrm

export const gethrmDeptDetails = async () => {
  try {
    const res = await axiosApi.get("/custodianDepartment/selectHrDeptDetails");
    const { success, data } = res.data;

    if (success === 1) {
      // return data;
      return data?.map((item) => {
        return {
          value: item.dept_id,
          label: item.dept_name.toUpperCase()
        };
      });
    } else {
      // If success is not 1, return empty array
      return [];
    }
  } catch (error) {
    console.error("Error in gethrmDeptDetails:", error);
    return [];
  }
};




// Common function for audit reports
export const getAuditReports = async (endpoint) => {
  const res = await axiosApi.get(endpoint);
  const { success, data } = res.data;
  // console.log("dataaaaaaaa", data);

  // Decide what to return if request fails
  if (success === 1) {
    return data;
  } else {
    // You can customize this per endpoint if needed
    return [];
  }
};

export const getdocMasterEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getdocMasterEditAuditReports");
export const getDocumentCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getDocumentCreateAuditReports");
export const getNestedCategoryList = () =>
  getAuditReports("/docMasterAuditReports/getNestedCategoryList");

export const getUserEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getUserEditAuditReports");
export const getUserCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getUserCreateAuditReports");
export const getdocDetailEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getdocDetailEditAuditReports");
export const getDocumentDetailCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getDocumentDetailCreateAuditReports");

export const getDocCatEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getDocCatEditAuditReports");
export const getDocCatCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getDocCatCreateAuditReports");
export const getSubTypeEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getSubTypeEditAuditReports");
export const getSubTypeCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getSubTypeCreateAuditReports");
export const getDocTypeEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getDocTypeEditAuditReports");
export const getDocTypeCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getDocTypeCreateAuditReports");

export const getDocGroupEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getDocGroupEditAuditReports");

export const getDocGroupCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getDocGroupCreateAuditReports");

export const getDocNestedCatEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getDocNestedCatEditAuditReports");

export const getDocNestedCatCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getDocNestedCatCreateAuditReports");

export const getDocSubCategoryEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getDocSubCategoryEditAuditReports");

export const getDocSubCategoryAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getDocSubCategoryAuditReports");

export const getInstituteMastCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getInstituteMastCreateAuditReports");

export const getInstituteTypeEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getInstituteTypeEditAuditReports");

export const getInstituteTypeCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getInstituteTypeCreateAuditReports");

export const getCourseTypeEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getCourseTypeEditAuditReports");

export const getCourseTypeCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getCourseTypeCreateAuditReports");

export const getInstituteMastEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getInstituteMastEditAuditReports");

export const getCourseNameCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getCourseNameCreateAuditReports");

export const getCourseNameEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getCourseNameEditAuditReports");

export const getLocationCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getLocationCreateAuditReports");

export const getLocationEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getLocationEditAuditReports");

export const getRackCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getRackCreateAuditReports");

export const getRackEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getRackEditAuditReports");

export const getCustDeptCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getCustDeptCreateAuditReports");

export const getCustDeptEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getCustDeptEditAuditReports");

export const getCustMasterCreateAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getCustMasterCreateAuditReports");

export const getCustMasterEditAuditReports = () =>
  getAuditReports("/docMasterAuditReports/getCustMasterEditAuditReports");





