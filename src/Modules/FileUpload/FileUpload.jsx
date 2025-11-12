// @ts-nocheck
import {
  Box,
  // Button,
  // Checkbox,
  Divider,
  // FormControl,
  // FormLabel,
  // IconButton,
  Input,
  // TextField,
  Textarea,
  Typography,
  // colors,
} from "@mui/joy";
import Grid from "@mui/material/Grid2";
import "./Document/Style.css";
import React, { memo, useEffect, useState } from "react";
import {
  // baseColor,
  // customFontSize,
  // customInputHeight,
  // errorNofity,
  // sanitizeInput,
  // succesNofity,
  warningNofity,
} from "../../Constant/Constant";
import CustomInput from "../../Components/CustomInput";
import Clock from "react-live-clock";
import { getDocNumber, getSelectSubTypeMasterList, userWiseSettingsRights } from "../../api/commonAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CustomBackDropWithOutState from "../../Components/CustomBackDropWithOutState";
import { customDocNumber } from "../../Function/CommonFunction";
import SelectDocTypeMaster from "../../Components/SelectDocTypeMaster";
import SelectDocSubTypeMaster from "../../Components/SelectDocSubTypeMaster";
import SelectInstituteMaster from "../../Components/SelectInstituteMaster";
import SelectCourseMaster from "../../Components/SelectCourseMaster";
import SelectCmpCategoryNameList from "../../Components/SelectCmpCategoryNameList";
import SelectSubCategoryMater from "../../Components/SelectSubCategoryMater";
import SelectGroupMaster from "../../Components/SelectGroupMaster";
import { format, isValid } from "date-fns";
import CustomButtonDateFeild from "../../Components/CustomButtonDateFeild";
import CustomDateFeild from "../../Components/CustomDateFeild";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
// import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
// import CommonMenuList from "../../Components/CommonMenuList";
import { useCallback } from "react";
// import { ToastContainer } from "react-toastify";
import axiosApi from "../../Axios/Axios";
import { lazy } from "react";
import { Suspense } from "react";
import Files from "react-files";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import dummyImage from "../../assets/pdf.png";
// import ClearIcon from "@mui/icons-material/Clear";
import FileListComponent from "./Document/FileListComponent";
import Snackbar from "@mui/joy/Snackbar";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import { PageStar, PrivacyPolicy } from 'iconoir-react'
import CustomCheckBoxWithLabel from "../../Components/CustomCheckBoxWithLabel";
import SelectCmpRackMaster from "../../Components/SelectCmpRackMaster";
import SelectCmpCustodianMaster from "../../Components/SelectCmpCustodianMaster";
import CommonRightBasedMenus from "../../Components/CommonRightBasedMenus";
import SelectNestedCate from "../../Components/SelectNestedCate";

const DocuementList = lazy(() => import("./Document/DocuementList"));

const FileUpload = () => {
  const queryClient = useQueryClient();
  const userData = localStorage.getItem("app_auth");
  const userType = atob(JSON.parse(userData)?.authType);
  const user = atob(JSON.parse(userData)?.authNo);
  const IPAddress = atob(JSON.parse(userData)?.IPAddress);
  const browserName = atob(JSON.parse(userData)?.browserName);
  const browserVersion = atob(JSON.parse(userData)?.browserVersion);
  const osName = atob(JSON.parse(userData)?.osName);
  const osVersion = atob(JSON.parse(userData)?.osVersion);

  // GET UNIQUE DOCUMENT NUMBER
  const {
    isLoading: documentNumberLoading,
    data: documentNumber,
    error: docError,
  } = useQuery({
    queryKey: ["getDocumentNumber"],
    queryFn: getDocNumber,
  });

  // console.log("documentNumber");

  //user rights
  const { data: userSettings } = useQuery({
    queryKey: ['getuserSettings', userType],
    queryFn: () => userWiseSettingsRights(userType),
    enabled: !!userType,
  });


  const { data } = useQuery({
    queryKey: ['selectDocSubTypeMaster'],
    queryFn: getSelectSubTypeMasterList,
    staleTime: Infinity
  })

  const [menurights, setMenurights] = useState([])

  const tabs = [
    {
      menuSlno: 1,
      label: "Create New Document",
      value: "1",
      icon: <PageStar color="rgba(var(--color-white))" />,
    },
    {
      menuSlno: 2,
      label: "Document Approval",
      value: "2",
      icon: <PrivacyPolicy color="rgba(var(--color-white))" />,
    },
  ];


  useEffect(() => {
    let array = tabs?.filter((value) => {
      return userSettings?.find((val) => {
        return value.menuSlno === val.menu_slno;
      })
    });
    setMenurights(array)
  }, [userSettings])

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // TAB HANDLER STATE
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => setValue(newValue);

  // CUSTOM DOC NUMBER
  const custDocNumber = customDocNumber(documentNumber);

  // const [date, setDate] = useState(new Date());

  // DOCUMENT UPLOAD AMIN STATE VALUE
  const [documentState, setDocumentState] = useState({
    docNumber: 0,
    docName: "",
    docDes: "",
    docType: 0,
    docSubType: 0,
    institute: 0,
    course: 0,
    category: 0,
    subCategory: 0,
    group: 0,
    docDate: new Date(),
    docVersion: 1,
    docVersionAment: 0,
    docVersionInfoEdit: 0,
    docVersionDate: new Date(),
    docExpStart: new Date(),
    docExpEnd: new Date(),
    isRequiredExp: false,
    isSecure: false,
    isLegalDoc: false,
    docRack: 0,
    docCustodian: 0,
    shortName: '',
    lifeLongValidity: false,
    DaysToRenew: 0,
    nestedCategory: 0

  });

  const {
    docName,
    docDes,
    docType,
    docSubType,
    institute,
    course,
    category,
    subCategory,
    group,
    docDate,
    docVersionDate,
    docExpStart,
    docExpEnd,
    isRequiredExp,
    isSecure,
    isLegalDoc,
    docRack,
    docCustodian,
    shortName,
    lifeLongValidity,
    DaysToRenew,
    nestedCategory
  } = documentState;

  // const handleDocumentState = useCallback((e) => {
  //   console.log(e.target.value);

  //   setDocumentState({ ...documentState, [e.target.name]: sanitizeInput(e.target.value) });
  // }, [documentState]);



  // const handleDocumentState = (e) => {
  // const { name, value } = e.target;
  // if (value.length <= 4) {
  //   setShortName(value);
  // }
  // };

  const handleDocumentState = useCallback((e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "shortName") {
      // Allow only alphanumeric characters
      newValue = newValue.replace(/[^a-zA-Z0-9]/g, "");

      // Clamp length to 4
      if (newValue.length > 4) {
        newValue = newValue.slice(0, 4);
      }
    }

    // Example: Convert to number if name matches your number inputs
    if (name === "DaysToRenew" /* or any other numeric field */) {
      // Convert empty string to null or 0 if you want
      newValue = newValue === "" ? "" : Number(newValue);
    }

    setDocumentState(prev => ({
      ...prev,
      [name]: newValue,
    }));
  }, []);



  useEffect(() => {
    if (isLegalDoc) {
      setDocumentState((prevState) => {
        return {
          ...prevState,
          isSecure: true
        }
      });
    } else {
      setDocumentState((prevState) => {
        return {
          ...prevState,
          isSecure: false
        }
      });
    }
  }, [isLegalDoc]);


  /********* FILE UPLOAD SECTION START ********/

  const [files, setFiles] = useState([]);

  const handlefileChange = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    // setFiles(newFiles);
  };

  const handleFileRemove = (fileId) => {
    setFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.id !== fileId)
    );
  };

  // const handleClearFiles = () => {
  //   setFiles([]);
  // };
  // console.log(files);

  const handleError = useCallback((error, file) => {
    const { code } = error;
    if (code === 1) {
      warningNofity("Upload failed. Invalid file type");
    } else if (code === 2) {
      warningNofity("Upload failed. File too large");
    } else if (code === 3) {
      warningNofity("Upload failed. File too small");
    } else {
      warningNofity("Upload failed. Maximum file count reached");
    }
  }, []);

  /***********
   * FILE UPLOAD SECTION END
   */

  // HANDLE SUBMIT
  const handleDocInformationSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (documentState.shortName === "") {
      warningNofity("Document Short Name cannot be empty");
      return;
    }

    if (documentState.docName === "") {
      warningNofity("Document Name cannot be empty");
      return;
    }

    if (documentState.docDes === "") {
      warningNofity("Document Description cannot be empty");
      return;
    }

    if (Number(documentState.docType) === 0) {
      warningNofity("Document Type cannot be empty");
      return;
    }

    // if (Number(documentState.docSubType) === 0) {
    //   warningNofity("Document Sub Type cannot be empty");
    //   return;
    // }

    // if (
    //   Number(documentState.institute) === 2 &&
    //   Number(documentState.institute) === 0
    // ) {
    //   warningNofity("Institute cannot be empty");
    //   return;
    // }

    // if (
    //   Number(documentState.institute) === 2 &&
    //   Number(documentState.course) === 0
    // ) {
    //   warningNofity("Course cannot be empty");
    //   return;
    // }

    // if (Number(documentState.category) === 0) {
    //   warningNofity("Category cannot be empty");
    //   return;
    // }

    // if (Number(documentState.subCategory) === 0) {
    //   warningNofity("Sub Category cannot be empty");
    //   return;
    // }

    // if (Number(documentState.group) === 0) {
    //   warningNofity("Group cannot be empty");
    //   return;
    // }

    if (isValid(new Date(documentState.docDate)) === false) {
      warningNofity("Document Date cannot be empty");
      return;
    }

    if (isValid(new Date(documentState.docVersionDate)) === false) {
      warningNofity("Document Version Date cannot be empty");
      return;
    }

    if (
      Boolean(documentState.isRequiredExp) === true &&
      isValid(new Date(documentState.docExpStart)) === false
    ) {
      warningNofity(
        "Document Expiry Start Date cannot be empty || Valid Date is required"
      );
      return;
    }

    if (
      Boolean(documentState.isRequiredExp) === true &&
      isValid(new Date(documentState.docExpEnd)) === false
    ) {
      warningNofity(
        "Document Expiry End Date cannot be empty || Valid Date is required"
      );
      return;
    }

    if (
      Boolean(documentState.isRequiredExp) === true &&
      new Date(documentState.docExpStart) > new Date(documentState.docExpEnd)
    ) {
      warningNofity(
        "Document Expiry Start Date cannot be greater than Expiry End Date"
      );
      return;
    }

    const FormPostData = {
      docID: documentNumber,
      docNumber: custDocNumber,
      docName: documentState.docName.trim(),
      docDes: documentState.docDes.trim(),
      docType: Number(documentState.docType),
      docSubType: Number(documentState.docSubType),
      institute: Number(documentState.institute),
      course: Number(documentState.course),
      category: Number(documentState.category),
      subCategory: Number(documentState.subCategory),
      nestedCategory: Number(documentState.nestedCategory),
      group: Number(documentState.group),
      docDate: format(new Date(documentState.docDate), "yyyy-MM-dd HH:mm"),
      docVersion: 1,
      docVersionAment: 0,
      docVersionInfoEdit: 0,
      docVersionDate: format(new Date(documentState.docVersionDate), "yyyy-MM-dd HH:mm"),
      docExpStart: format(new Date(documentState.docExpStart), "yyyy-MM-dd"),
      docExpEnd: format(new Date(documentState.docExpEnd), "yyyy-MM-dd"),
      isRequiredExp: Boolean(documentState.isRequiredExp) === true ? 1 : 0,
      isSecure: Boolean(documentState.isSecure) === true ? 1 : 0,
      isLegalDoc: Boolean(documentState.isLegalDoc) === true ? 1 : 0,
      docRack: Number(documentState.docRack),
      docCustodian: Number(documentState.docCustodian),
      userID: user,
      docUpload: format(new Date(), "yyyy-MM-dd HH:mm"),
      shortName: documentState.shortName,
      lifeLongValidity: Boolean(documentState.lifeLongValidity) === true ? 1 : 0,
      DaysToRenew: DaysToRenew,
      IPAddress: IPAddress ? IPAddress : 'Unknown',
      browserName: browserName ? browserName : 'Unknown',
      browserVersion: browserVersion ? browserVersion : 'Unknown',
      osName: osName ? osName : 'Unknown',
      osVersion: osVersion ? osVersion : 'Unknown',
    };

    const formData = new FormData();

    formData.append("postData", JSON.stringify(FormPostData));
    files.forEach((file) => {
      formData.append("file", new Blob([file], { type: file.type }), file.name || "file");
    });

    formData.append('file', files);

    try {
      const response = await axiosApi.post("/docMaster/insertDocMaster", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { success, message } = await response.data;
      if (success === 0) {
        // setFiles([]);
        // errorNofity(message);
        setMessage(message);
        setOpen(true);
      } else if (success === 2) {
        setMessage(message);
        setOpen(true);
        // warningNofity(message);
      } else if (success === 1) {
        setMessage(message);
        setOpen(true);
        // succesNofity(message);
        queryClient.invalidateQueries(["getDocumentNumber", "getDocList"]);
        resetForm()
      } else {
        setMessage(message);
        setOpen(true);
        // warningNofity(message);
      }
    } catch (error) {
      setMessage("An error has occurred: " + error);
      setOpen(true);
    }
  },
    [documentState, documentNumber, custDocNumber, files, setMessage, setOpen, queryClient, DaysToRenew, user, IPAddress, browserName, browserVersion, osName, osVersion]
  );

  const resetForm = () => {
    setDocumentState({
      docNumber: 0,
      docName: "",
      docDes: "",
      docType: 0,
      docSubType: 0,
      institute: 0,
      course: 0,
      category: 0,
      subCategory: 0,
      group: 0,
      docDate: new Date(),
      docVersionDate: new Date(),
      docExpStart: new Date(),
      docExpEnd: new Date(),
      isRequiredExp: false,
      isSecure: false,
      isLegalDoc: false,
      docRack: 0,
      docCustodian: 0,
      shortName: '',
      lifeLongValidity: false,
      DaysToRenew: 0,
      nestedCategory: 0
    });
    setFiles([]);
  };

  // const [shrtName, setShrtName] = useState('');

  // const handleChange = (event) => {
  //   setShrtName(event.target.value);
  // };

  const selectedItem = data?.find(
    (item) => item.value === docSubType && item.doc_institute_status === 1
  );

  return (
    <Box className="h-dvh p-2">
      <Box
        className="flex flex-col rounded-xl p-1 w-full"
        sx={{
          backgroundColor: "rgba(var(--bg-card))",
          height: "calc(100% - 50px)",
          border: 0.03,
          borderColor: "rgba(var(--border-primary))",
        }}
      >
        <Snackbar
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          variant="outlined"
          color="success"
          size="lg"
          startDecorator={<MarkUnreadChatAltOutlinedIcon />}
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setOpen(false);
          }}
        >
          {message}
        </Snackbar>
        {/* <ToastContainer /> */}
        <TabContext value={value}>
          {/* <Box sx={{ border: 0, borderBottom: 1.5, borderColor: "rgba(var(--tab-border-color))", borderBottomColor: 'divider', borderWidth: 2 }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                minHeight: 0,
                '& .MuiTabs-indicator': {
                  backgroundColor: 'rgba(var(--logo-pink))',
                },
              }}
              className="flex justify-end items-center"
            // indicatorColor="secondary"
            >
              <Tab
                icon={<PageStar color='rgba(var(--color-white))' />}
                label="Create New Document"
                value="1"
                iconPosition="start"
                sx={{
                  display: "flex",
                  minHeight: 0,
                  textTransform: "none",
                  color: 'rgba(var(--color-white),0.9)',
                  bgcolor: "rgba(var(--tab-color),0.8)",
                  borderRadius: 1,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  minWidth: '15%',
                  '&.Mui-selected': {
                    color: 'rgba(var(--color-white))',
                    bgcolor: 'rgba(var(--tab-color))',
                  },
                }}
              />
              <Tab
                icon={<PrivacyPolicy color='rgba(var(--color-white))' />}
                // color="secondary"
                iconPosition="start"
                label="Document Approval"
                value="2"
                sx={{
                  display: "flex",
                  minHeight: 0,
                  textTransform: "none",
                  color: 'rgba(var(--color-white),0.9)',
                  bgcolor: "rgba(var(--tab-color),0.8)",
                  border: 0,
                  borderRadius: 1,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  minWidth: '15%',
                  '&.Mui-selected': {
                    color: 'rgba(var(--color-white))',
                    bgcolor: 'rgba(var(--tab-color))',
                  },
                }}
              />
            </TabList>
          </Box> */}
          <Box
            sx={{
              border: 0,
              borderBottom: 1.5,
              borderColor: "rgba(var(--tab-border-color))",
              borderBottomColor: "divider",
              borderWidth: 2,
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                minHeight: 0,
                "& .MuiTabs-indicator": {
                  backgroundColor: "rgba(var(--logo-pink))",
                },
              }}
              className="flex justify-end items-center "
            >
              {menurights?.map((tab, index) => (
                <Tab
                  key={index}
                  icon={tab.icon}
                  label={tab.label}
                  value={tab.value}
                  iconPosition="start"
                  sx={{
                    display: "flex",
                    minHeight: 0,
                    textTransform: "none",
                    color: "rgba(var(--color-white),0.9)",
                    bgcolor: "rgba(var(--tab-color),0.8)",
                    borderRadius: 1,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    minWidth: "15%",
                    mr: index !== menurights.length - 1 ? 0.5 : 0,// Adds margin-right except on last tab
                    mb: 0.5,
                    "&.Mui-selected": {
                      color: "rgba(var(--color-white))",
                      bgcolor: "rgba(var(--tab-color))",
                    },
                  }}
                />
              ))}
            </TabList>
          </Box>
          <TabPanel value="1" className="overflow-scroll" sx={{ p: 1 }} >
            <Box className="">
              {/* Top Section start here */}
              <Box
                className="flex flex-col pt-2 py-2 px-2 border-[0.3px] rounded w-full border-borderprimary"
              >
                <Grid
                  container
                  spacing={0.5}
                  sx={{ flexGrow: 1 }}
                  direction="row-reverse"
                >
                  <Grid
                    container
                    spacing={0.3}
                    size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }}
                    className="border border-red-100 rounded-md"
                  >
                    <Box className="flex flex-1 flex-col">
                      <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center text-xs font-semibold text-fontprimarywhite"
                        sx={{ fontFamily: 'var(--font-varient)' }}
                      >
                        Doc Nubmer
                      </Box>
                      <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center text-xs font-semibold text-fontprimarywhite "
                        sx={{ fontFamily: 'var(--font-varient)' }}
                      >
                        {documentNumberLoading
                          ? "Loading..."
                          : docError
                            ? 0
                            : custDocNumber}
                      </Box>
                      <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center  text-xs font-extrabold text-fontprimarywhite"
                        sx={{ fontFamily: 'var(--font-varient)' }}
                      >
                        Doc Date
                      </Box>
                      <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center  text-xs font-semibold  text-fontprimarywhite"
                        sx={{ fontFamily: 'var(--font-varient)' }}
                      >
                        <Clock
                          date={format(new Date(), "yyyy-MM-dd HH:mm:ss")}
                          format={"DD/MM/YYYY h:mm:ss A"}
                          ticking={true}
                          timezone={"Asia/Calcutta"}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid
                    container
                    spacing={0.5}
                    size={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 8 }}
                  >
                    <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                      <CustomInput
                        placeholder="Document Name Type here..."
                        value={docName}
                        onChange={(e) =>
                          handleDocumentState({
                            target: { name: "docName", value: e.target.value },
                          })
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                      <Textarea
                        placeholder="Doccument Descriptions Type here..."
                        // startDecorator={<PageEdit width={25} height={25} color='rgba(var(--icon-primary))' className='iconColor' style={{ transition: 'none' }} />}
                        minRows={2}
                        value={docDes}
                        onChange={(e) =>
                          handleDocumentState({
                            target: { name: "docDes", value: e.target.value },
                          })
                        }
                        sx={{
                          transition: 'none',
                          "&.MuiTextarea-root": {
                            "--Textarea-focusedHighlight": 'none',
                            "--Textarea-focusedShadow": "none",
                            "--Textarea-focusedThickness": "1.1px",
                          },
                          fontSize: 15,
                          fontFamily: "var(--font-varient)",
                          borderWidth: "2.8px",
                          borderRadius: "6px",
                          backgroundColor: 'rgba(var(--input-bg-color))',
                          borderColor: 'rgba(var(--input-border-color))',
                          color: 'rgba(var(--input-font-color))',
                          boxShadow: "none",
                          ':hover': {
                            backgroundColor: 'rgba(var(--input-hover-bg-color))',
                            borderColor: 'rgba(var(--input-hover-border-color))',
                            color: 'rgba(var(--input-hover-font-color))',
                            '.iconColor': {
                              color: 'rgba(var(--icon-green))',
                            }
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>

              {/* Top Section end here */}

              <Typography
                level="title-md"
                textAlign="left"
                textColor="white"
                sx={{
                  p: 0.5,
                  color: 'rgba(var(--font-primary-white),0.9)',
                  fontFamily: "var(--font-varient)",
                }}
              >
                Document Category Updation
              </Typography>

              <Box
                className="flex flex-col border-[0.1rem] rounded w-full py-1 sm:flex-col md:flex-col lg:flex-row xl:flex-row "
                sx={{ borderColor: "rgba(var(--border-primary))" }}
              >
                <Box className="flex flex-col px-10 flex-1 gap-1">
                  <Box className="flex flex-1 items-center justify-between py-[0.199rem] px-2">
                    <CustomCheckBoxWithLabel
                      label="Is Legal Document"
                      checkBoxValue={isLegalDoc}
                      handleCheckBoxValue={(e) => handleDocumentState({ target: { name: "isLegalDoc", value: e.target.checked } })}
                    />

                    <Box>
                      <Input
                        name="shortName"
                        // variant="outlined"
                        // color="neutral"
                        size="sm"
                        value={shortName}
                        onChange={handleDocumentState}
                        placeholder="Short Name (Max 4)"
                        inputProps={{ maxLength: 4 }}
                        sx={{
                          opacity: 0.8,
                          paddingLeft: "0.26rem",
                          lineHeight: "1.0rem",
                          fontSize: "0.81rem",
                          color: 'rgba(var(--font-primary-white))',
                          paddingY: "0.26rem",
                          borderColor: 'rgba(var(--list-border-color))',
                          p: 1,
                        }}
                      />
                    </Box>

                  </Box>
                  <Box className="flex flex-1 flex-col">
                    <SelectDocTypeMaster
                      label={"Document Type Master"}
                      handleChange={(e, element) =>
                        handleDocumentState({
                          target: { name: "docType", value: element },
                        })
                      }
                      value={docType}
                    />
                  </Box>
                  {/* <Box className="flex flex-1 flex-col">
                    <SelectDocSubTypeMaster
                      label={"Document Sub Type Master"}
                      handleChange={(e, element) =>
\                        handleDocumentState({
                          target: { name: "docSubType", value: element },
                        })
                      }
                      value={docSubType}
                    />
                  </Box> */}

                  <Box className="flex flex-1 flex-col">
                    <SelectDocSubTypeMaster
                      label={"Document Sub Type Master"}
                      handleChange={(e, element) => {
                        handleDocumentState({
                          target: { name: "docSubType", value: element },
                        });
                      }}
                      value={docSubType}
                    />
                  </Box>

                  {selectedItem?.doc_institute_status === 1 && (
                    <>
                      <Box className="flex flex-1 flex-col">
                        <SelectInstituteMaster
                          label="Institute Master"
                          handleChange={(e, element) =>
                            handleDocumentState({
                              target: { name: "institute", value: element },
                            })
                          }
                          value={institute}
                        />
                      </Box>

                      <Box className="flex flex-1 flex-col">
                        <SelectCourseMaster
                          label="Course Master"
                          handleChange={(e, element) =>
                            handleDocumentState({
                              target: { name: "course", value: element },
                            })
                          }
                          value={course}
                        />
                      </Box>
                    </>
                  )}

                  <Box className="flex flex-1 flex-col">
                    <SelectCmpCategoryNameList
                      label={"Category Name List"}
                      handleChange={(e, element) => handleDocumentState({
                        target: { name: "category", value: element }
                      })}
                      value={category} // Ensure category is the correct type
                    />
                  </Box>
                  <Box className="flex flex-1 flex-col">
                    <SelectSubCategoryMater
                      label={"Sub Category Master"}
                      catSlno={category ? Number(category) : 0} // Ensure category is a valid number
                      handleChange={(e, element) => handleDocumentState({
                        target: { name: "subCategory", value: element }
                      })}
                      value={subCategory} // Ensure subCategory is the correct type
                    />
                  </Box>

                  <Box className="flex flex-1 flex-col">
                    <SelectNestedCate
                      label={"Nested Category Master"}
                      subCatSlno={subCategory ? Number(subCategory) : 0} // Ensure category is a valid number
                      handleChange={(e, element) => handleDocumentState({
                        target: { name: "nestedCategory", value: element }
                      })}
                      value={nestedCategory} // Ensure nestedCategory is the correct type
                    />
                  </Box>

                  <Box className="flex flex-1 flex-col">
                    <SelectGroupMaster
                      label={"Group Master"}
                      handleChange={(e, element) => handleDocumentState({ target: { name: "group", value: element } })}
                      value={group}
                    />
                  </Box>
                  {/* docuemtn location section start */}
                  <Box className="flex flex-1 flex-col pt-2">
                    <div style={{
                      fontWeight: 700,
                      fontFamily: "var(--font-varient)",
                      opacity: 0.8,
                      paddingLeft: "0.36rem",
                      lineHeight: "1.0rem",
                      fontSize: "0.81rem",
                      color: 'rgba(var(--font-primary-white))'
                    }} >Document Location</div>
                    <Divider />

                    <Box className="flex flex-1 py-[0.4rem] gap-2" >
                      {/* rack  name */}
                      <SelectCmpRackMaster
                        label={"Rack Name"}
                        handleChange={(e, element) => handleDocumentState({ target: { name: "docRack", value: element } })}
                        value={docRack}
                      />
                      {/* custodian name */}
                      <SelectCmpCustodianMaster
                        label={"Custodian Name"}
                        handleChange={(e, element) => handleDocumentState({ target: { name: "docCustodian", value: element } })}
                        value={docCustodian}
                      />
                    </Box>

                    <Box className="flex flex-1 py-[0.1rem] flex-wrap gap-2 justify-between">
                      <Box className="flex flex-col flex-auto">
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontFamily: "var(--font-varient)",
                            opacity: 0.8,
                            paddingLeft: "0.36rem",
                            lineHeight: "1.0rem",
                            fontSize: "0.81rem",
                            color: 'rgba(var(--font-primary-white))'
                          }}
                        >
                          Document Date
                        </Typography>
                        <CustomDateFeild
                          date={docDate}
                          setDate={(date) =>
                            handleDocumentState({
                              target: { name: "docDate", value: date },
                            })
                          }
                        />
                      </Box>
                      <Box className="flex flex-col flex-auto">
                        <Typography
                          level="body-sm"
                          sx={{
                            fontWeight: 600,
                            fontFamily: "var(--font-varient)",
                            opacity: 0.8,
                            paddingLeft: "0.36rem",
                            lineHeight: "1.0rem",
                            fontSize: "0.81rem",
                            color: 'rgba(var(--font-primary-white))'
                          }}
                        >
                          Document Version Date
                        </Typography>
                        <CustomDateFeild
                          date={docVersionDate}
                          setDate={(date) => handleDocumentState({ target: { name: "docVersionDate", value: date } })}
                        />
                      </Box>
                    </Box>

                    <Box className="flex flex-1 items-center justify-between py-[0.1rem] px-2">
                      <CustomCheckBoxWithLabel
                        label="Is a Secure Document"
                        checkBoxValue={isSecure}
                        handleCheckBoxValue={(e) => handleDocumentState({ target: { name: "isSecure", value: e.target.checked } })}
                        disabled={Boolean(isLegalDoc)}
                      />
                    </Box>

                    <Box className="flex flex-col gap-4 p-4 border border-gray-200 rounded-lg shadow-sm">
                      {/* Validity Checkbox */}
                      <CustomCheckBoxWithLabel
                        label="Is Validity Required for this Document"
                        checkBoxValue={isRequiredExp}
                        handleCheckBoxValue={(e) =>
                          handleDocumentState({ target: { name: "isRequiredExp", value: e.target.checked } })
                        }
                      />

                      {/* Life Long Validity and Renewal Section */}
                      {
                        isRequiredExp === true ?

                          <Box className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                            {/* Life Long Validity */}
                            <Box className="flex items-center space-x-1">
                              {/* <label htmlFor="lifeLongValidity" className="text-sm font-medium text-gray-700">
                                Life Long Validity
                              </label> */}
                              {/* <input
                                id="lifeLongValidity"
                                type="checkbox"
                                checked={lifeLongValidity}
                                onChange={(e) =>
                                  handleDocumentState({ target: { name: "lifeLongValidity", value: e.target.checked } })
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              /> */}

                              <CustomCheckBoxWithLabel
                                label="Life Long Validity"
                                checkBoxValue={lifeLongValidity}
                                handleCheckBoxValue={(e) =>
                                  handleDocumentState({ target: { name: "lifeLongValidity", value: e.target.checked } })
                                }
                              />
                            </Box>

                            {/* Days Before Renewal - Only if not lifelong */}
                            {!lifeLongValidity && (
                              <Box className="flex flex-col">
                                <label htmlFor="renewalTime" className="text-sm font-medium mb-0" style={{
                                  color: 'rgba(var(--font-primary-white))',
                                  fontFamily: "var(--font-varient)",
                                }}>
                                  Days Before Renew
                                </label>
                                <input
                                  style={{
                                    color: 'rgba(var(--font-primary-white))',
                                    fontFamily: "var(--font-varient)",
                                  }}
                                  id="renewalTime"
                                  type="number"
                                  min={0}
                                  value={DaysToRenew}
                                  onChange={(e) =>
                                    handleDocumentState({ target: { name: "DaysToRenew", value: e.target.value } })
                                  }
                                  className="border border-gray-300 rounded px-0 py-0.5 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </Box>
                            )}
                          </Box>
                          : null}
                    </Box>



                    {Boolean(isRequiredExp) && !lifeLongValidity && (
                      <Box className="flex  items-center justify-evenly py-[0.1rem] gap-5 flex-wrap">
                        <Box className="flex flex-auto">
                          <CustomButtonDateFeild
                            startLabel={'From Date'}
                            date={docExpStart}
                            setDate={(date) => handleDocumentState({ target: { name: "docExpStart", value: date } })}
                          />
                        </Box>
                        <Box className="flex flex-auto">
                          <CustomButtonDateFeild
                            startLabel={'To Date'}
                            date={docExpEnd}
                            setDate={(date) => handleDocumentState({ target: { name: "docExpEnd", value: date } })}
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>

                  {/* SUBMIT BUTTON SECTION */}
                  <Box className="flex flex-1 flex-row py-2 justify-end">
                    {/* <CommonMenuList
                      handleSubmitButtonFun={handleDocInformationSubmit}
                      handleViewButtonFun={() => setValue("2")}
                    /> */}
                    <CommonRightBasedMenus
                      userType={userType}
                      handleSubmitButtonFun={handleDocInformationSubmit}
                      handleViewButtonFun={() => setValue("2")}
                    />
                  </Box>
                  {/* END SUBMIT BUTTON SECTION */}
                </Box>

                {/* DOCUMENT UPLOAD SECTION */}
                <Box className="flex flex-1 border-[0.1rem] p-2 rounded-lg flex-col mx-5"
                  sx={{ borderColor: "rgba(var(--border-primary))" }}
                >
                  <Files
                    className="files-dropzone"
                    onChange={handlefileChange}
                    onError={handleError}
                    accepts={[
                      "image/png",
                      "image/jpeg",
                      "image/jpg",
                      ".pdf",
                      "application/pdf",
                      ".doc",
                      ".docx",
                      "application/msword",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    ]}
                    multiple
                    maxFiles={10}
                    maxFileSize={10000000}
                    minFileSize={0}
                    clickable
                  >
                    <Box className="flex min-h-16 max-h-16 h-16 rounded-md mb-1 border-[0.1rem] flex-row border-dashed cursor-pointer items-center"
                      sx={{ borderColor: "rgba(var(--icon-primary))" }}
                    >
                      <Box className="flex items-center justify-center w-16" >
                        <CloudUploadIcon
                          sx={{ fontSize: 30, color: "rgba(var(--icon-primary))" }}
                        />
                      </Box>
                      <Typography
                        color="neutral"
                        level="body-md"
                        noWrap
                        sx={{ textAlign: "center", fontFamily: "var(--font-varient)", color: "rgba(var(--font-primary-white))" }}
                      >
                        Drop files here
                      </Typography>
                    </Box>
                  </Files>
                  <Box className="flex flex-1 flex-col rounded-xl">
                    <Box className="flex flex-col gap-1 overflow-scroll shadow-inner rounded-md">
                      <Suspense fallback={<div>Loading...</div>}>
                        {files?.map((val, idx) => (
                          <FileListComponent
                            key={idx}
                            FileLink={val.preview.url || dummyImage}
                            imageName={val.name}
                            uploadFIleSize={val.sizeReadable}
                            handleRemoveFile={() => handleFileRemove(val.id)}
                          />
                        ))}
                      </Suspense>
                    </Box>
                  </Box>
                </Box>
                {/* END COCUMENT UPLOAD SECTION */}
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="2" sx={{ p: 1, overflow: 'hidden' }}>
            <Suspense
              fallback={<CustomBackDropWithOutState message={"Loading..."} />}
            >
              <DocuementList userType={userType} />
            </Suspense>
          </TabPanel>
        </TabContext>
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default memo(FileUpload);
