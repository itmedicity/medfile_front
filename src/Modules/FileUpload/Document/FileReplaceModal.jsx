// @ts-nocheck
import { Modal, ModalDialog, Box, IconButton, Typography } from "@mui/joy";
import React, { Suspense, useCallback } from "react";
import { memo } from "react";
import ModalClose from "@mui/joy/ModalClose";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useState } from "react";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { screenHeight, screenWidth, warningNofity } from "../../../Constant/Constant";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Files from "react-files";
import FileListComponent from "./FileListComponent";
import CommonMenuList from "../../../Components/CommonMenuList";
import CustomDateFeild from "../../../Components/CustomDateFeild";
import CustomCheckBoxWithLabel from "../../../Components/CustomCheckBoxWithLabel";
import CustomTypoPara from "../Components/CustomTypoPara";
import { Calendar, Pin } from "iconoir-react";
import dummyImage from "../../../assets/pdf.png";
import { format, isValid } from "date-fns";
import axiosApi from "../../../Axios/Axios";
import { QueryClient } from "react-query";
import DocEditHeaderSection from "../Components/DocEditHeaderSection";


const FileReplaceModal = ({ data, editModal, setEditModal, refetchDocDetl }) => {

    // console.log("data:");

    const {
        docd_slno,// document slno
        doc_id,//document id
        doc_number,//document number
        originalname,//original file name
        mimetype,//pdf/application
        filename,//generated file name
        docVer,//version 
        docVerDate,//date of version
        docCreateUser,//user id
        name,//user name
        docCreatedDate,
        docVer_amentment,//file Amentment
        dovVer_infoAment,//details amentment

    } = data;

    const [isRequiredExp, setIsRequiredExp] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);


    const [renewDoc, setRenDoc] = useState({
        ren_doc_date: docVerDate,
        ren_isRequiredExp: isRequiredExp,
        ren_doc_exp_start: docVerDate,
        ren_doc_exp_end: docVerDate,
    })

    const handleDocumentUpdateChange = useCallback((e) => {
        setRenDoc({ ...renewDoc, [e.target.name]: e.target.value });
    }, [renewDoc]);

    const { ren_doc_date, ren_isRequiredExp, ren_doc_exp_start, ren_doc_exp_end } = renewDoc

    /********* FILE UPLOAD SECTION START ********/

    const [files, setFiles] = useState([]);

    const handlefileChange = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        // setFiles(newFiles);
    };

    // console.log("files", files);

    const PinIcon = <Pin height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />
    const Calender = <Calendar height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />

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

    // console.log("files", files);

    const handleFileRemove = (fileId) => {
        setFiles((prevFiles) =>
            prevFiles.filter((prevFile) => prevFile.id !== fileId)
        );
    };

    const handleReplaceDoc = useCallback(async () => {

        if (!ren_doc_date || !ren_doc_exp_start || !ren_doc_exp_end) {
            warningNofity('Expired Document Date, Start Date and End Date cannot be empty' || 'An error has occurred')
            return
        }

        if (!isValid(new Date(ren_doc_date))) {
            warningNofity('Invalid Expired Document Date' || 'An error has occurred')
            return
        }

        if (!isValid(new Date(ren_doc_exp_start))) {
            warningNofity('Invalid Expired Document Start Date' || 'An error has occurred')
            return
        }

        if (!isValid(new Date(ren_doc_exp_end))) {
            warningNofity('Invalid Expired Document End Date' || 'An error has occurred')
            return
        }


        const UpdateData = {
            document_slno: Number(docd_slno),
            ren_docID: Number(doc_id),
            docNumber: doc_number,
            ren_doc_date: format(new Date(renewDoc.ren_doc_date), "yyyy-MM-dd HH:mm"),
            ren_isRequiredExp: Number(renewDoc.ren_isRequiredExp),
            ren_doc_exp_start: format(new Date(renewDoc.ren_doc_exp_start), "yyyy-MM-dd HH:mm"),
            ren_doc_exp_end: format(new Date(renewDoc.ren_doc_exp_end), "yyyy-MM-dd HH:mm"),
            ren_docVersion: Number(docVer),
            ren_docVersionAment: Number(docVer_amentment) + 10,
            ren_userID: Number(docCreateUser),
            ren_docUpload: format(new Date(), "yyyy-MM-dd HH:mm"),
            ren_docVersionInfoEdit: Number(dovVer_infoAment),
            ren_docEditDate: format(new Date(), "yyyy-MM-dd HH:mm"),
            ren_doc_ver_date: format(new Date(), "yyyy-MM-dd HH:mm"),
            docActiveStatus: 0
        };

        // console.log("UpdateData", UpdateData);

        // console.log("files", files);

        const formData = new FormData();
        formData.append("postData", JSON.stringify(UpdateData));

        const uniqueFiles = new Set();

        // Append files to formData, but filter out duplicates based on file name
        files?.forEach((file) => {
            if (!uniqueFiles.has(file.name)) {
                uniqueFiles.add(file.name); // Add the file name to the Set
                formData.append("file", new Blob([file], { type: file.type }), file.name || "file");
            }
        });

        formData.append('file', files);

        // console.log("formData", formData);



        try {
            const response = await axiosApi.patch(
                "/docMaster/ReplaceDocument",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const { success, message } = response.data; // Destructure response data directly
            // console.log("success, message ", success, message);

            // Based on success code, set the message and open the modal
            setMessage(message);
            setOpen(true);
            setEditModal(false)
            if (success === 1) {
                refetchDocDetl()
                QueryClient.invalidateQueries(["getDocumentNumber", "getDocList"]);
                // resetForm() // Uncomment if needed
            }

            // Handle other success codes as necessary (0, 2, etc.)
            // You could also add any other specific behavior if required
        } catch (error) {
            console.error("An error has occurred:", error);
            setMessage("An error has occurred: " + error.message || error);
            setOpen(true);
        }


    }, [files, docVer, docVer_amentment, docd_slno, dovVer_infoAment, doc_number, doc_id, docCreateUser, renewDoc, ren_doc_date, ren_doc_exp_start, ren_doc_exp_end])


    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={editModal}
            onClose={() => setEditModal(false)}
            // sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "all 0.5s ease-in-out",
                backgroundColor: "transparent",

            }}
        >
            <ModalDialog size="lg"
                size="sm"
                sx={{
                    width: screenWidth - 500,
                    // height: screenHeight,
                    p: 1,
                    backgroundColor: "rgba(var(--modal-bg-color))",
                    transition: "all 0.5s ease-in-out",
                    border: 0.2,
                    borderColor: "rgba(var(--border-primary))",
                    // width: 700,
                    // height: 450,
                }}>
                <Box
                    sx={{
                        borderRadius: "md",
                        p: 3,
                        overflow: "scroll",
                    }}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />

                </Box>
                <Box className="flex flex-1 flex-col border-[0.5px] p-2 rounded-md gap-1" >

                    {/* <Box>Document Replace</Box> */}


                    <Box>
                        {/* Header Section - Document Information */}
                        <DocEditHeaderSection label={"Document Replace"} />
                        <Box className="flex p-1 px-5 rounded-md py-5">
                            <Box className="flex flex-1 flex-col  rounded-md pb-1 gap-1">
                                <Box className="flex flex-1 flex-row gap-2 " >
                                    <CustomTypoPara label={doc_number} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                        startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{PinIcon} Document no : </span>}
                                        startIconStyle={{ opacity: 0.8, }} />
                                    <CustomTypoPara label={format(docVerDate, 'dd-MM-yyyy')} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                        startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Calender} Document date : </span>}
                                        startIconStyle={{ opacity: 0.8, }} />
                                </Box>
                                <Box className="flex flex-1 flex-row gap-2 mt-1" >
                                    <CustomTypoPara label={docVer + '.' + docVer_amentment + '.' + dovVer_infoAment} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                        startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{PinIcon}Document Version : </span>}
                                        startIconStyle={{ opacity: 0.8, }} />
                                    {/* <CustomTypoPara label={docVerDate} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                        startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Calender}Version Date : </span>}
                                        startIconStyle={{ opacity: 0.8, }} /> */}
                                </Box>
                                <Box className="flex flex-1 items-end justify-between pb-[0.088rem] mt-2">
                                    <CustomCheckBoxWithLabel
                                        label="Is Validity Required for this Document"
                                        checkBoxValue={ren_isRequiredExp}
                                        handleCheckBoxValue={(e) => handleDocumentUpdateChange({ target: { name: "ren_isRequiredExp", value: e.target.checked } })}
                                    />
                                </Box>
                                {
                                    ren_isRequiredExp &&

                                    <Box className="flex flex-1 flex-row gap-2 mt-1">
                                        <Box className="flex flex-auto">
                                            <Box className="flex flex-col">
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
                                                    Doc Expiry From Date
                                                </Typography>
                                                <CustomDateFeild
                                                    date={ren_doc_exp_start}
                                                    setDate={(date) => handleDocumentUpdateChange({ target: { name: "ren_doc_exp_start", value: date } })}
                                                />
                                            </Box>
                                        </Box>
                                        <Box className="flex flex-auto">
                                            <Box className="flex flex-col">
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
                                                    Doc Expiry To Date
                                                </Typography>
                                                <CustomDateFeild
                                                    date={ren_doc_exp_end}
                                                    setDate={(date) => handleDocumentUpdateChange({ target: { name: "ren_doc_exp_end", value: date } })}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                }


                            </Box>
                        </Box>
                    </Box>


                    <Box className="flex flex-1 border-[0.1rem] p-2 rounded-lg flex-col "
                        sx={{ borderColor: "rgba(var(--border-primary))" }}
                    >
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
                        <Box className="flex flex-1 flex-col rounded-xl" sx={{ mt: 1 }}>
                            <Box className="flex flex-col gap-1 overflow-scroll shadow-inner rounded-md"
                                style={{}}>
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

                    <Box className="flex flex-1 flex-row justify-end ">
                        <Box>
                            <CommonMenuList
                                submitLabel={"Click here to renew Document"}
                                handleSubmitButtonFun={handleReplaceDoc}
                            />
                        </Box>

                    </Box>
                </Box>

            </ModalDialog>
        </Modal>
    );
};


export default memo(FileReplaceModal) 
