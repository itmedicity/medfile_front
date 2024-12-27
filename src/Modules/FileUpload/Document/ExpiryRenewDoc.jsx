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


const ExpiryRenewDoc = (props) => {

    const PinIcon = <Pin height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />
    const Calender = <Calendar height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />
    const Menuscale = <MenuScale height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />

    const {
        doc_number,
        doc_date,
        docVer,
        docVersionAment,
        docVersionInfoEdit,
        doc_ver_date,
        isRequiredExp,
        doc_exp_end,
        doc_exp_start
    } = props;

    const handleDocumentUpdateChange = useCallback((e) => {
    }, []);


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



    return (
        <Box sx={{ position: 'relative', top: 0, backgroundColor: 'rgba(var(--bg-card))' }} >
            {/* Header Section - Document Revision / Expired Document Revision */}
            <DocEditHeaderSection label={"Document File UPdation / Expired Document Updation"} />
            <Box className="flex p-1 px-10 flex-col">
                <Box className="flex flex-1 flex-col rounded-md pb-1 gap-1 mt-4">
                    <Box className="flex flex-1 flex-row gap-2" >
                        <CustomTypoPara label={doc_number} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                            startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{PinIcon} Document no : </span>}
                            startIconStyle={{ opacity: 0.8, }} />
                        <CustomTypoPara label={doc_date} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                            startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Calender} Document date : </span>}
                            startIconStyle={{ opacity: 0.8, }} />
                    </Box>
                    <Box className="flex flex-1 flex-row gap-2" >
                        <CustomTypoPara label={docVer + '.' + docVersionAment + '.' + docVersionInfoEdit} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                            startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{PinIcon}Document Version : </span>}
                            startIconStyle={{ opacity: 0.8, }} />
                        <CustomTypoPara label={doc_ver_date} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                            startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Calender}Version Date : </span>}
                            startIconStyle={{ opacity: 0.8, }} />
                    </Box>

                    <Box className="flex flex-1 flex-col gap-2 p-4 mt-5 justify-center rounded-md"
                        sx={{ border: 0.5, borderColor: "rgba(var(--border-primary))" }}
                    >
                        {/* Section for file expiry and updation */}
                        <Box>
                            {
                                isRequiredExp === 1 ? (
                                    <Box className="flex flex-1 flex-row gap-2" >
                                        <Box className="flex flex-1 flex-row gap-2 items-center ">
                                            <Calendar height={35} width={35} color="rgba(var(--color-pink),0.9)" />
                                            <Box className="flex flex-1 flex-row gap-2 items-center " >
                                                <Box className="flex" sx={{ fontFamily: 'var(--font-varient)', fontWeight: 500, fontSize: '0.9rem' }} >Expired on </Box>
                                                <ArrowRight height={15} width={15} className="flex" />
                                                <Box className="flex" sx={{ fontFamily: 'var(--font-varient)', fontWeight: 600, fontSize: '0.9rem', color: "rgba(var(--color-pink),0.9)" }} >{format(new Date(doc_exp_end), "do-LLLL-yyyy")}</Box>
                                            </Box>
                                        </Box>

                                        <Box className="flex flex-1 flex-col gap-2 mt-3" >
                                            {isValid(new Date(doc_exp_end)) && (new Date(doc_exp_end) < new Date()) ? (
                                                <div className="flex flex-row gap-2 justify-end">
                                                    <Button
                                                        variant="outlined"
                                                        sx={{
                                                            borderColor: "rgba(var(--color-pink),0.9)",
                                                            color: 'rgba(var(--color-pink),0.8)'
                                                        }}
                                                        size="md"
                                                        disabled={isRequiredExp === 1 ? false : true}
                                                        onClick={() => { }}
                                                    >
                                                        Renew Document
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        sx={{
                                                            borderColor: "rgba(var(--color-pink),0.9)",
                                                            color: 'rgba(var(--color-pink),0.8)'
                                                        }}
                                                        size="md"
                                                        onClick={() => { }}
                                                    >
                                                        Revise Document
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-row gap-2 justify-end">
                                                    <Button
                                                        variant="outlined"
                                                        sx={{
                                                            borderColor: "rgba(var(--color-pink),0.9)",
                                                            color: 'rgba(var(--color-pink),0.8)'
                                                        }}
                                                        size="md"
                                                        disabled={isRequiredExp === 1 ? true : false}
                                                        onClick={() => { }}
                                                    >
                                                        Renew Document
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        sx={{
                                                            borderColor: "rgba(var(--color-pink),0.9)",
                                                            color: 'rgba(var(--color-pink),0.8)'
                                                        }}
                                                        size="md"
                                                        onClick={() => { }}
                                                    >
                                                        Revise Document
                                                    </Button>
                                                </div>
                                            )
                                            }
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box className="flex flex-1 flex-row gap-2">
                                        <Box className="flex flex-1 flex-row gap-2 items-end">
                                            <CalendarXmark height={35} width={35} color="rgba(var(--color-pink),0.9)" />
                                            <Box className="flex flex-1 flex-row gap-2 items-end" >
                                                <Box className="flex" sx={{ fontFamily: 'var(--font-varient)', fontWeight: 600, fontSize: '0.9rem', color: "rgba(var(--color-pink),0.9)" }} >Document has no Expiry</Box>
                                            </Box>
                                        </Box>
                                        <Box className="flex flex-row gap-2">
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    borderColor: "rgba(var(--color-pink),0.9)",
                                                    color: 'rgba(var(--color-pink),0.8)'
                                                }}
                                                size="md"
                                                onClick={() => { }}
                                            >
                                                Revise Document
                                            </Button>
                                        </Box>
                                    </Box>
                                )
                            }
                        </Box>

                        {/* Document Expiry Updation */}

                        <Box className="flex flex-1 flex-row border-[0.5px] p-2 rounded-md" >
                            <Box className="flex  items-center justify-evenly py-[0.1rem] gap-5 flex-wrap">
                                <Box className="flex flex-auto">
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
                                            Doc Expiry From Date
                                        </Typography>
                                        <CustomDateFeild
                                            date={doc_exp_start}
                                            setDate={(date) => handleDocumentUpdateChange({ target: { name: "doc_exp_start", value: date } })}
                                        />
                                    </Box>
                                </Box>
                                <Box className="flex flex-auto">
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
                                            Doc Expiry To Date
                                        </Typography>
                                        <CustomDateFeild
                                            date={doc_exp_end}
                                            setDate={(date) => handleDocumentUpdateChange({ target: { name: "doc_exp_end", value: date } })}
                                        />
                                    </Box>
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
                            // handleSubmitButtonFun={handleUpdateDocument}
                            // handleViewButtonFun={() => setValue("2")}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ExpiryRenewDoc