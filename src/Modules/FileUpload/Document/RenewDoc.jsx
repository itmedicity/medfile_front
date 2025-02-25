// @ts-nocheck
import React, { useState, Suspense } from 'react'
import DocEditHeaderSection from '../Components/DocEditHeaderSection'
import CustomTypoPara from '../Components/CustomTypoPara'
import { format, isValid } from "date-fns";
import {
    Accordion,
    AccordionDetails,
    AccordionGroup,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    Checkbox,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemDecorator,
    Modal,
    ModalClose,
    ModalDialog,
    Sheet,
    Textarea,
    Typography,
} from "@mui/joy";
import { MultiplePages, MenuScale, MessageText, Pin, Calendar, Lock, LockSlash, OpenBook, ArrowRight, CalendarXmark } from 'iconoir-react'
import CustomDateFeild from "../../../Components/CustomDateFeild";
import { useCallback } from 'react';
import Files from "react-files";
import { warningNofity } from '../../../Constant/Constant';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileListComponent from "./FileListComponent";
import dummyImage from "../../../assets/pdf.png";
import CommonMenuList from "../../../Components/CommonMenuList";
import CustomCheckBoxWithLabel from '../../../Components/CustomCheckBoxWithLabel';
import axiosApi from '../../../Axios/Axios';
import { useQueryClient } from "@tanstack/react-query";


const RenewDoc = (props) => {

    const PinIcon = <Pin height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />
    const Calender = <Calendar height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />
    const Menuscale = <MenuScale height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />

    const queryClient = useQueryClient();
    const userData = localStorage.getItem("app_auth");
    const user = atob(JSON.parse(userData)?.authNo);

    // console.log("jhlbhlgjhj");

    const {
        doc_number,
        doc_date,
        docVer,
        docVersionAment,
        docVersionInfoEdit,
        doc_ver_date,
        isRequiredExp,
        doc_exp_end,
        doc_exp_start,
        // user,
        doc_id
    } = props;

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const docDate = format(new Date(doc_date), "yyyy-MM-dd HH:mm:ss");

    const [renewDoc, setRenDoc] = useState({
        ren_doc_date: doc_date,
        ren_isRequiredExp: isRequiredExp,
        ren_doc_exp_start: doc_exp_start,
        ren_doc_exp_end: doc_exp_end,
    })


    const handleDocumentUpdateChange = useCallback((e) => {
        setRenDoc({ ...renewDoc, [e.target.name]: e.target.value });
    }, [renewDoc]);

    const { ren_doc_date, ren_isRequiredExp, ren_doc_exp_start, ren_doc_exp_end } = renewDoc

    // console.log(doc_date)
    // console.log(ren_doc_date)

    /********* FILE UPLOAD SECTION START ********/

    const [files, setFiles] = useState([]);
    const handlefileChange = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        // setFiles(newFiles);
    };

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

    const handleFileRemove = (fileId) => {
        setFiles((prevFiles) =>
            prevFiles.filter((prevFile) => prevFile.id !== fileId)
        );
    };

    // console.log("jhfgjghjghfjh");


    const handleSubmitREnewDoc = useCallback(async () => {

        if (!ren_doc_date || !ren_doc_exp_start || !ren_doc_exp_end) {
            warningNofity('Renew Document Date, Start Date and End Date cannot be empty' || 'An error has occurred')
            return
        }

        if (!isValid(new Date(ren_doc_date))) {
            warningNofity('Invalid Renew Document Date' || 'An error has occurred')
            return
        }

        if (!isValid(new Date(ren_doc_exp_start))) {
            warningNofity('Invalid Renew Document Start Date' || 'An error has occurred')
            return
        }

        if (!isValid(new Date(ren_doc_exp_end))) {
            warningNofity('Invalid Renew Document End Date' || 'An error has occurred')
            return
        }

        const UpdateData = {
            ren_docID: Number(doc_id),
            docNumber: doc_number,
            ren_doc_date: format(new Date(renewDoc.ren_doc_date), "yyyy-MM-dd HH:mm"),
            ren_isRequiredExp: Number(renewDoc.ren_isRequiredExp),
            ren_doc_exp_start: format(new Date(renewDoc.ren_doc_exp_start), "yyyy-MM-dd HH:mm"),
            ren_doc_exp_end: format(new Date(renewDoc.ren_doc_exp_end), "yyyy-MM-dd HH:mm"),
            ren_docVersion: Number(docVer) + 1,
            // ren_docVersionAment: Number(docVersionAment) + 10,
            ren_docVersionAment: Number(docVersionAment),
            ren_userID: Number(user),
            ren_docUpload: format(new Date(), "yyyy-MM-dd HH:mm"),
            ren_docVersionInfoEdit: Number(docVersionInfoEdit),
            ren_docEditDate: format(new Date(), "yyyy-MM-dd HH:mm"),
            // ren_doc_ver_date: format(new Date(doc_ver_date), "yyyy-MM-dd HH:mm")
            ren_doc_ver_date: format(new Date(), "yyyy-MM-dd HH:mm"),

        }

        // console.log(UpdateData);

        const formData = new FormData();

        formData.append("postData", JSON.stringify(UpdateData));
        files.forEach((file) => {
            formData.append("file", new Blob([file], { type: file.type }), file.name || "file");
        });

        formData.append('file', files);

        try {
            const response = await axiosApi.patch("/docMaster/updateRenewDocument", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const { success, message } = await response.data;
            // console.log("success, message ", success, message);

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

    }, [queryClient, doc_date, ren_doc_date, ren_doc_exp_start, ren_doc_exp_end, doc_exp_end, doc_exp_start, files, doc_number, renewDoc, resetForm, docVer, docVersionAment, user, doc_id, docVersionInfoEdit])

    const resetForm = useCallback(() => {
        setFiles([]);
    }, [setFiles])


    return (
        <Box className="flex flex-1 flex-col border-[0.5px] p-2 rounded-md gap-1" >
            {/* Document Expiry Updation */}
            <Box>Renew  Document</Box>
            <Box className="flex flex-1 flex-row border-[0.5px] p-2 rounded-md" >
                <Box className="flex flex-col flex-1 py-[0.1rem] gap-2">
                    <Box className="flex flex-row gap-6" >
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
                                Document Date
                            </Typography>
                            <CustomDateFeild
                                date={ren_doc_date}
                                setDate={(date) => handleDocumentUpdateChange({ target: { name: "ren_doc_date", value: date } })}
                            />
                        </Box>
                        <Box className="flex flex-1 items-end justify-between pb-[0.088rem]">
                            <CustomCheckBoxWithLabel
                                label="Is Validity Required for this Document"
                                checkBoxValue={ren_isRequiredExp}
                                handleCheckBoxValue={(e) => handleDocumentUpdateChange({ target: { name: "ren_isRequiredExp", value: e.target.checked } })}
                            />
                        </Box>
                    </Box>
                    {
                        ren_isRequiredExp &&

                        <Box className="flex flex-1 flex-row gap-2">
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

            <Box className="flex flex-1 flex-row justify-end">
                <CommonMenuList
                    submitLabel={"Click here to renew Document"}
                    // handleSubmitButtonFun={handleUpdateDocument}
                    // handleViewButtonFun={() => setValue("2")}
                    handleSubmitButtonFun={handleSubmitREnewDoc}
                />
            </Box>
        </Box>
    )
}

export default RenewDoc