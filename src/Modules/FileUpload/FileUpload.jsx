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
import dummyImage from "../../assets/imageicon.png";
import ClearIcon from "@mui/icons-material/Clear";
import FileListComponent from "./Document/FileListComponent";

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
  };

  const handleFileRemove = (fileId) => {
    setFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.id !== fileId)
    );
  };

  const handleClearFiles = () => {
    setFiles([]);
  };
  console.log(files);

  const handleError = (error, file) => {
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
  };

  /***********
   * FILE UPLOAD SECTION END
   */

  // HANDLE SUBMIT
  const handleDocInformationSubmit = useCallback(
    async (e) => {
      e.preventDefault();

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

      if (Number(documentState.docSubType) === 0) {
        warningNofity("Document Sub Type cannot be empty");
        return;
      }

      if (
        Number(documentState.institute) === 2 &&
        Number(documentState.institute) === 0
      ) {
        warningNofity("Institute cannot be empty");
        return;
      }

      if (
        Number(documentState.institute) === 2 &&
        Number(documentState.course) === 0
      ) {
        warningNofity("Course cannot be empty");
        return;
      }

      if (Number(documentState.category) === 0) {
        warningNofity("Category cannot be empty");
        return;
      }

      if (Number(documentState.subCategory) === 0) {
        warningNofity("Sub Category cannot be empty");
        return;
      }

      if (Number(documentState.group) === 0) {
        warningNofity("Group cannot be empty");
        return;
      }

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

      const FormData = {
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

      try {
        const response = await axiosApi.post(
          "/docMaster/insertDocMaster",
          FormData
        );
        const { success, message } = await response.data;
        if (success === 0) {
          errorNofity(message);
        } else if (success === 2) {
          warningNofity(message);
        } else {
          succesNofity(message);
          queryClient.invalidateQueries(["getDocumentNumber", "getDocList"]);
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
        }
      } catch (error) {
        errorNofity("An error has occurred: " + error);
      }
    },
    [documentState, documentNumber, custDocNumber]
  );

  return (
    <Box
      className="flex flex-col border-2 m-2 rounded-xl p-1 pb-2  w-full"
      sx={{ backgroundColor: "white" }}
    >
      <ToastContainer />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1.5, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{ minHeight: 0 }}
            className="flex justify-end items-center"
          >
            <Tab
              icon={<SnippetFolderIcon fontSize="small" />}
              label="Create New Document"
              value="1"
              iconPosition="start"
              sx={{
                display: "flex",
                minHeight: 0,
                textTransform: "none",
                color: baseColor.secondaryfont,
                opacity: 0.6,
                bgcolor: "white",
                border: 0,
                borderColor: baseColor.primarylight,
                borderRadius: 2,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
            <Tab
              icon={<FeaturedPlayListIcon fontSize="small" />}
              color="secondary"
              iconPosition="start"
              label="Document List"
              value="2"
              sx={{
                display: "flex",
                minHeight: 0,
                textTransform: "none",
                color: baseColor.secondaryfont,
                opacity: 0.6,
                bgcolor: "white",
                border: 0,
                borderColor: baseColor.primarylight,
                borderRadius: 2,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1" className="overflow-scroll" sx={{ p: 1 }}>
          <Box className="">
            {/* Top Section start here */}
            <Box
              className="flex flex-col pt-5 py-6 px-5 border-[0.1rem] rounded w-full"
              sx={{ borderColor: baseColor.secondarylight }}
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
                    <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center text-xs font-extrabold">
                      Doc Nubmer
                    </Box>
                    <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center  text-xs font-semibold ">
                      {documentNumberLoading
                        ? "Loading..."
                        : docError
                        ? 0
                        : custDocNumber}
                    </Box>
                    <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center  text-xs font-extrabold ">
                      Doc Date
                    </Box>
                    <Box className="flex flex-1 border-b-[0.01rem] justify-center items-center  text-xs font-semibold ">
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
                      placeholder="Doc name here..."
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
                      placeholder="Doc Descriptions here..."
                      minRows={1}
                      value={docDes}
                      onChange={(e) =>
                        handleDocumentState({
                          target: { name: "docDes", value: e.target.value },
                        })
                      }
                      sx={{
                        fontSize: 15,
                        "&.MuiTextarea-root": {
                          "--Textarea-focusedHighlight": baseColor.primarylight,
                          "--Textarea-focusedShadow": "none",
                          "--Textarea-focusedThickness": "1.1px",
                        },
                        boxShadow: "none",
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
              textColor="neutral.900"
              sx={{ p: 0.5, opacity: 0.4 }}
            >
              Document Category Updation
            </Typography>

            <Box
              className="flex flex-col border-[0.1rem] rounded w-full p-1 sm:flex-col md:flex-col lg:flex-row xl:flex-row"
              sx={{ borderColor: baseColor.secondarylight }}
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
                  multiple={false}
                  maxFileSize={2000000}
                  minFileSize={0}
                  clickable
                >
                  <Box className="flex min-h-28 max-h-36 h-32 rounded-xl mb-1 border flex-col justify-center items-center ">
                    <CloudUploadIcon sx={{ fontSize: 50, color: "#8EADCD" }} />
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
  );
};

export default memo(FileUpload);
