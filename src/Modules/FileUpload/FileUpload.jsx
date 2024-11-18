// @ts-nocheck
import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Input,
  Textarea,
  Typography,
  colors,
} from "@mui/joy";
import Grid from "@mui/material/Grid2";
import "./Document/Style.css";
import React, { memo, useState } from "react";
import {
  baseColor,
  customFontSize,
  customInputHeight,
  errorNofity,
  sanitizeInput,
  succesNofity,
  warningNofity,
} from "../../Constant/Constant";
import CustomInput from "../../Components/CustomInput";
import Clock from "react-live-clock";
import { getDocNumber } from "../../api/commonAPI";
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
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import CommonMenuList from "../../Components/CommonMenuList";
import { useCallback } from "react";
import { ToastContainer } from "react-toastify";
import axiosApi from "../../Axios/Axios";
import { lazy } from "react";
import { Suspense } from "react";
import Files from "react-files";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import dummyImage from "../../assets/pdf.png";
import ClearIcon from "@mui/icons-material/Clear";
import FileListComponent from "./Document/FileListComponent";
import Snackbar from "@mui/joy/Snackbar";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import { PageStar, TaskList, PageEdit } from 'iconoir-react'

const DocuementList = lazy(() => import("./Document/DocuementList"));

const FileUpload = () => {
  // const [docType, setDocType] = useState(0)
  const queryClient = useQueryClient();

  // GET UNIQUE DOCUMENT NUMBER
  const {
    isLoading: documentNumberLoading,
    data: documentNumber,
    error: docError,
  } = useQuery({
    queryKey: ["getDocumentNumber"],
    queryFn: getDocNumber,
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // TAB HANDLER STATE
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => setValue(newValue);

  // CUSTOM DOC NUMBER
  const custDocNumber = customDocNumber(documentNumber);

  const [date, setDate] = useState(new Date());

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
    docVersionDate: new Date(),
    docExpStart: new Date(),
    docExpEnd: new Date(),
    isRequiredExp: false,
    isSecure: false,
  });

  const {
    docNumber,
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
  } = documentState;

  const handleDocumentState = (e) => {
    setDocumentState({
      ...documentState,
      [e.target.name]: sanitizeInput(e.target.value),
    });
  };

  /******************
   * FILE UPLOAD SECTION START
   */

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

  const handleClearFiles = () => {
    setFiles([]);
  };
  // console.log(files);

  // const handleError = (error, file) => {
  //   const { code } = error;
  //   if (code === 1) {
  //     warningNofity("Upload failed. Invalid file type");
  //   } else if (code === 2) {
  //     warningNofity("Upload failed. File too large");
  //   } else if (code === 3) {
  //     warningNofity("Upload failed. File too small");
  //   } else {
  //     warningNofity("Upload failed. Maximum file count reached");
  //   }
  // };

  const handleError = (error, file) => {
    const errorMessages = {
      1: () => `Upload failed. Invalid file type: ${file?.name || "unknown file"}`,
      2: () => `Upload failed. File too large: ${file?.size || "unknown size"} bytes`,
      3: () => `Upload failed. File too small: ${file?.size || "unknown size"} bytes`,
      default: () => "Upload failed. Maximum file count reached",
    };

    const message = (errorMessages[error.code] || errorMessages.default)();
    warningNofity(message);
  };


  /***********
   * FILE UPLOAD SECTION END
   */

  // HANDLE SUBMIT
  const handleDocInformationSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // if (documentState.docName === "") {
      //   warningNofity("Document Name cannot be empty");
      //   return;
      // }

      // if (documentState.docDes === "") {
      //   warningNofity("Document Description cannot be empty");
      //   return;
      // }

      // if (Number(documentState.docType) === 0) {
      //   warningNofity("Document Type cannot be empty");
      //   return;
      // }

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

      // if (isValid(new Date(documentState.docDate)) === false) {
      //   warningNofity("Document Date cannot be empty");
      //   return;
      // }

      // if (isValid(new Date(documentState.docVersionDate)) === false) {
      //   warningNofity("Document Version Date cannot be empty");
      //   return;
      // }

      // if (
      //   Boolean(documentState.isRequiredExp) === true &&
      //   isValid(new Date(documentState.docExpStart)) === false
      // ) {
      //   warningNofity(
      //     "Document Expiry Start Date cannot be empty || Valid Date is required"
      //   );
      //   return;
      // }

      // if (
      //   Boolean(documentState.isRequiredExp) === true &&
      //   isValid(new Date(documentState.docExpEnd)) === false
      // ) {
      //   warningNofity(
      //     "Document Expiry End Date cannot be empty || Valid Date is required"
      //   );
      //   return;
      // }

      // if (
      //   Boolean(documentState.isRequiredExp) === true &&
      //   new Date(documentState.docExpStart) > new Date(documentState.docExpEnd)
      // ) {
      //   warningNofity(
      //     "Document Expiry Start Date cannot be greater than Expiry End Date"
      //   );
      //   return;
      // }


      const validations = [
        { condition: !documentState.docName.trim(), message: "Document Name cannot be empty" },
        { condition: !documentState.docDes.trim(), message: "Document Description cannot be empty" },
        { condition: Number(documentState.docType) === 0, message: "Document Type cannot be empty" },
        { condition: Number(documentState.docSubType) === 0, message: "Document Sub Type cannot be empty" },
        { condition: Number(documentState.institute) === 0, message: "Institute cannot be empty" },
        { condition: Number(documentState.institute) === 2 && Number(documentState.course) === 0, message: "Course cannot be empty" },
        { condition: Number(documentState.category) === 0, message: "Category cannot be empty" },
        { condition: Number(documentState.subCategory) === 0, message: "Sub Category cannot be empty" },
        { condition: Number(documentState.group) === 0, message: "Group cannot be empty" },
        { condition: !isValid(new Date(documentState.docDate)), message: "Document Date cannot be empty" },
        { condition: !isValid(new Date(documentState.docVersionDate)), message: "Document Version Date cannot be empty" },
        {
          condition: Boolean(documentState.isRequiredExp) && !isValid(new Date(documentState.docExpStart)),
          message: "Document Expiry Start Date cannot be empty || Valid Date is required",
        },
        {
          condition: Boolean(documentState.isRequiredExp) && !isValid(new Date(documentState.docExpEnd)),
          message: "Document Expiry End Date cannot be empty || Valid Date is required",
        },
        {
          condition:
            Boolean(documentState.isRequiredExp) &&
            new Date(documentState.docExpStart) > new Date(documentState.docExpEnd),
          message: "Document Expiry Start Date cannot be greater than Expiry End Date",
        },
      ];

      // Run validations
      for (const { condition, message } of validations) {
        if (condition) {
          warningNofity(message);
          return;
        }
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
        group: Number(documentState.group),
        docDate: format(new Date(documentState.docDate), "yyyy-MM-dd HH:mm"),
        docVersionDate: format(
          new Date(documentState.docVersionDate),
          "yyyy-MM-dd HH:mm"
        ),
        docExpStart: format(new Date(documentState.docExpStart), "yyyy-MM-dd"),
        docExpEnd: format(new Date(documentState.docExpEnd), "yyyy-MM-dd"),
        isRequiredExp: Boolean(documentState.isRequiredExp) === true ? 1 : 0,
        isSecure: Boolean(documentState.isSecure) === true ? 1 : 0,
      };

      const formData = new FormData();

      formData.append("postData", JSON.stringify(FormPostData));
      files.forEach((file) => {
        formData.append(
          "file",
          new Blob([file], { type: file.type }),
          file.name || "file"
        );
      });
      // console.log(files)
      // formData.append('file', files);
      // console.log(FormPostData)

      try {
        const response = await axiosApi.post(
          "/docMaster/insertDocMaster",
          formData,
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
        // errorNofity("An error has occurred: " + error);
        // setFiles([]);
      }
    },
    [documentState, documentNumber, custDocNumber, files, warningNofity, setMessage, setOpen, queryClient]
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
    });
    setFiles([]);
  };

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
          <Box sx={{ borderBottom: 1.5, borderColor: "divider", borderWidth: 2 }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{ minHeight: 0 }}
              className="flex justify-end items-center"
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
                  bgcolor: "rgba(var(--logo-dark-blue),0.8)",
                  borderRadius: 1,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  minWidth: '15%',
                  '&.Mui-selected': {
                    color: 'rgba(var(--color-white))',
                    bgcolor: 'rgba(var(--logo-dark-blue))',
                  },
                }}
              />
              <Tab
                icon={<TaskList color='rgba(var(--color-white))' />}
                color="secondary"
                iconPosition="start"
                label="Document List"
                value="2"
                sx={{
                  display: "flex",
                  minHeight: 0,
                  textTransform: "none",
                  color: 'rgba(var(--color-white),0.9)',
                  bgcolor: "rgba(var(--logo-dark-blue),0.8)",
                  border: 0,
                  borderRadius: 1,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  minWidth: '15%',
                  '&.Mui-selected': {
                    color: 'rgba(var(--color-white))',
                    bgcolor: 'rgba(var(--logo-dark-blue))',
                  },
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" className="overflow-scroll" sx={{ p: 1 }}>
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
                      <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center text-xs font-semibold text-white"
                        sx={{ fontFamily: 'var(--font-varient)' }}
                      >
                        Doc Nubmer
                      </Box>
                      <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center text-xs font-semibold text-white "
                        sx={{ fontFamily: 'var(--font-varient)' }}
                      >
                        {documentNumberLoading
                          ? "Loading..."
                          : docError
                            ? 0
                            : custDocNumber}
                      </Box>
                      <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center  text-xs font-extrabold text-white"
                        sx={{ fontFamily: 'var(--font-varient)' }}
                      >
                        Doc Date
                      </Box>
                      <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center  text-xs font-semibold  text-white"
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
                        minRows={1}
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
                          borderRadius: "0px",
                          backgroundColor: 'rgba(var(--border-primary))',
                          borderColor: 'rgba(var(--border-secondary))',
                          color: 'rgba(var(--font-light))',
                          boxShadow: "none",
                          ':hover': {
                            backgroundColor: 'rgba(var(--bg-offwhite))',
                            borderColor: 'rgba(var(--logo-dark-blue))',
                            color: 'rgba(var(--font-black))',
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
                className="flex flex-col border-[0.1rem] rounded w-full py-1 sm:flex-col md:flex-col lg:flex-row xl:flex-row"
                sx={{ borderColor: "rgba(var(--border-primary))" }}
              >
                <Box className="flex flex-1 flex-col px-4">
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
                  <Box className="flex flex-1 flex-col">
                    <SelectDocSubTypeMaster
                      label={"Document Sub Type Master"}
                      handleChange={(e, element) =>
                        handleDocumentState({
                          target: { name: "docSubType", value: element },
                        })
                      }
                      value={docSubType}
                    />
                  </Box>
                  {docSubType === "2" ? (
                    <>
                      <Box className="flex flex-1 flex-col">
                        <SelectInstituteMaster
                          label={"Institute Master"}
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
                          label={"Course Master"}
                          handleChange={(e, element) =>
                            handleDocumentState({
                              target: { name: "course", value: element },
                            })
                          }
                          value={course}
                        />
                      </Box>
                    </>
                  ) : null}
                  <Box className="flex flex-1 flex-col">
                    <SelectCmpCategoryNameList
                      label={"Category Name List"}
                      handleChange={(e, element) =>
                        handleDocumentState({
                          target: { name: "category", value: element },
                        })
                      }
                      value={category}
                    />
                  </Box>
                  <Box className="flex flex-1 flex-col">
                    <SelectSubCategoryMater
                      label={"Sub Category Master"}
                      catSlno={Number(category) ?? 0}
                      handleChange={(e, element) =>
                        handleDocumentState({
                          target: { name: "subCategory", value: element },
                        })
                      }
                      value={subCategory}
                    />
                  </Box>
                  <Box className="flex flex-1 flex-col">
                    <SelectGroupMaster
                      label={"Group Master"}
                      handleChange={(e, element) =>
                        handleDocumentState({
                          target: { name: "group", value: element },
                        })
                      }
                      value={group}
                    />
                  </Box>
                  <Box className="flex flex-1 flex-col pt-1">
                    <Box className="flex flex-1 items-center justify-between py-[0.1rem]">
                      <Box className="flex flex-1 items-center justify-between py-[0.1rem]">
                        <Typography
                          level="body-sm"
                          sx={{ fontWeight: 200, opacity: 0.9, pl: 0.2 }}
                        >
                          Document Date
                        </Typography>
                      </Box>
                      <Box className="flex flex-1 justify-end">
                        <CustomDateFeild
                          date={docDate}
                          setDate={(date) =>
                            handleDocumentState({
                              target: { name: "docDate", value: date },
                            })
                          }
                        />
                      </Box>
                    </Box>
                    <Box className="flex flex-1 items-center justify-between py-[0.1rem]">
                      <Box className="flex flex-1 items-center justify-between py-[0.1rem]">
                        <Typography
                          level="body-sm"
                          sx={{ fontWeight: 200, opacity: 0.9, pl: 0.2 }}
                        >
                          Document Version Date
                        </Typography>
                      </Box>
                      <Box className="flex flex-1 justify-end ">
                        <CustomDateFeild
                          date={docVersionDate}
                          setDate={(date) =>
                            handleDocumentState({
                              target: { name: "docVersionDate", value: date },
                            })
                          }
                        />
                      </Box>
                    </Box>
                    <Box className="flex flex-1 items-center justify-between py-[0.1rem] px-2">
                      <Checkbox
                        label="Is a Secure Document"
                        variant="outlined"
                        color="warning"
                        checked={Boolean(isSecure)}
                        onChange={(e) =>
                          handleDocumentState({
                            target: {
                              name: "isSecure",
                              value: e.target.checked,
                            },
                          })
                        }
                        sx={{ opacity: 0.9, fontSize: "0.9rem" }}
                      />
                    </Box>
                    <Box className="flex flex-1 items-center justify-between py-[0.1rem] px-2">
                      <Checkbox
                        label="Is Validity Required for this Document"
                        variant="outlined"
                        color="danger"
                        checked={Boolean(isRequiredExp)}
                        onChange={(e) =>
                          handleDocumentState({
                            target: {
                              name: "isRequiredExp",
                              value: e.target.checked,
                            },
                          })
                        }
                        sx={{ opacity: 0.9, fontSize: "0.9rem" }}
                      />
                    </Box>
                    {Boolean(isRequiredExp) === true && (
                      <Box className="flex flex-1 items-center py-[0.1rem]">
                        <Box className="flex flex-1">
                          <CustomButtonDateFeild
                            date={docExpStart}
                            setDate={(date) =>
                              handleDocumentState({
                                target: { name: "docExpStart", value: date },
                              })
                            }
                          />
                        </Box>
                        <Box className="flex flex-1">
                          <CustomButtonDateFeild
                            date={docExpEnd}
                            setDate={(date) =>
                              handleDocumentState({
                                target: { name: "docExpEnd", value: date },
                              })
                            }
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>
                  {/* SUBMIT BUTTON SECTION */}
                  <Box className="flex flex-1 flex-row py-2 justify-end">
                    <CommonMenuList
                      handleSubmitButtonFun={handleDocInformationSubmit}
                      handleViewButtonFun={() => setValue("2")}
                    />
                  </Box>
                  {/* END SUBMIT BUTTON SECTION */}
                </Box>

                {/* COCUMENT UPLOAD SECTION */}
                <Box className="flex flex-1 border p-1 border-[#8EADCD] rounded-lg flex-col">
                  <Files
                    className="files-dropzone"
                    onChange={handlefileChange}
                    onError={handleError}
                    accepts={["image/png", ".pdf", "image/jpeg", "image/jpg"]}
                    multiple
                    maxFiles={10}
                    maxFileSize={10000000}
                    minFileSize={0}
                    clickable
                  >
                    <Box className="flex min-h-28 max-h-36 h-32 rounded-xl mb-1 border flex-col justify-center items-center ">
                      <CloudUploadIcon
                        sx={{ fontSize: 50, color: "#8EADCD" }}
                      />
                      <Typography
                        color="neutral"
                        level="body-xs"
                        noWrap
                        sx={{ textAlign: "center", color: "#8EADCD" }}
                      >
                        Drag and Drop or Browse the file
                      </Typography>
                    </Box>
                  </Files>
                  <Box className="flex h-72 flex-col rounded-xl border p-2">
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
          <TabPanel value="2" sx={{ p: 1 }}>
            <Suspense
              fallback={<CustomBackDropWithOutState message={"Loading..."} />}
            >
              <DocuementList />
            </Suspense>
          </TabPanel>
        </TabContext>
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default memo(FileUpload);
