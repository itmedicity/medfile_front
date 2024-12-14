// @ts-nocheck
import {
    Accordion,
    AccordionDetails,
    AccordionGroup,
    AccordionSummary,
    Avatar,
    Box,
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
    Typography,
} from "@mui/joy";
import React, { useCallback, useEffect, useMemo } from "react";
import { memo } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useState } from "react";
import { screenHeight, screenWidth } from "../../../Constant/Constant";
import Grid from "@mui/material/Grid2";
import CustomTypo from "../../../Components/CustomTypo";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import SelectDocTypeMaster from "../../../Components/SelectDocTypeMaster";
import SelectDocSubTypeMaster from "../../../Components/SelectDocSubTypeMaster";
import SelectInstituteMaster from "../../../Components/SelectInstituteMaster";
import SelectCourseMaster from "../../../Components/SelectCourseMaster";
import SelectCmpCategoryNameList from "../../../Components/SelectCmpCategoryNameList";
import SelectSubCategoryMater from "../../../Components/SelectSubCategoryMater";
import SelectGroupMaster from "../../../Components/SelectGroupMaster";
import CommonMenuList from "../../../Components/CommonMenuList";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import CustomDateFeild from "../../../Components/CustomDateFeild";
import CustomButtonDateFeild from "../../../Components/CustomButtonDateFeild";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoDisturbOffOutlinedIcon from "@mui/icons-material/DoDisturbOffOutlined";
import FileLink from "../../../assets/pdf.png";
import FilleListCmp from "./FilleListCmp";
import { useQuery } from "@tanstack/react-query";
import { getDocInforByID, getDocumentDetl } from "../../../api/commonAPI";
import { format, isValid } from "date-fns";
import { MultiplePages, MenuScale, MessageText, Pin, Calendar } from 'iconoir-react'
import CustomTypoHeader from "../Components/CustomTypoHeader";
import CustomTypoPara from "../Components/CustomTypoPara";

const EditDocUpload = ({ params }) => {
    const { doc_slno, doc_id } = params.row; // DATA FROM TABLE ACTION || FROM THE PARAMS

    const docmntSlno = doc_slno; // ID FOR GETTIG THE DOC DETAILS
    const docmntID = doc_id

    const [open, setOpen] = useState(false);

    //   SET STATE BASED ON THE DATA FETCH USING THE ID
    const [editDocumentState, seteditDocumentState] = useState({
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
        docDate: format(new Date(), "yyyy-MM-dd HH:mm"),
        docVersionDate: format(new Date(), "yyyy-MM-dd HH:mm"),
        docExpStart: format(new Date(), "yyyy-MM-dd HH:mm"),
        docExpEnd: format(new Date(), "yyyy-MM-dd HH:mm"),
        isRequiredExp: false,
        isSecure: false,
    });

    //    GET THE DATA USING THE DOCUMENT ID USING THE REACT QERY
    const { isLoading, data, error, refetch: refetchDocInfoByID } = useQuery({
        queryKey: ["getDocInfoByID", docmntSlno],
        queryFn: async () => await getDocInforByID(docmntSlno),
        enabled: false,
        staleTime: Infinity,
    });



    const docData = useMemo(() => data, [data]);
    console.log(docData);

    useEffect(() => {
        if (docData) {
            seteditDocumentState((prev) =>
            ({
                ...prev,
                docNumber: docData?.doc_number,
                docName: docData?.doc_name,
                docDes: docData?.doc_desc,
                docType: docData?.doc_type,
                docSubType: docData?.doc_sub_type,
                institute: docData?.institute,
                course: docData?.course,
                category: docData?.category,
                subCategory: docData?.sub_category,
                group: docData?.group_mast,
                docDate: isValid(new Date(docData?.doc_date)) && format(new Date(docData?.doc_date), "yyyy-MM-dd HH:mm"),
                docVersionDate: new Date(docData?.doc_ver_date),
                docExpStart: new Date(docData?.doc_exp_start),
                docExpEnd: isValid(new Date(docData?.doc_date)) && format(new Date(docData?.doc_exp_end), "yyyy-MM-dd"),
                isRequiredExp: docData?.isRequiredExp === 1 ? true : false,
                isSecure: docData?.isSecure === 1 ? true : false,
            }));
        }
    }, [docData]);

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
    } = editDocumentState;
    console.log(editDocumentState)

    // GET THE DOCUEMNT DETAILS

    const {
        isLoading: docDetlIsLoading,
        data: docDetlArray,
        error: docDetlError,
        refetch: refetchDocDetl
    } = useQuery({
        queryKey: ["getTheDocInfoDetl", docmntID],
        queryFn: async () => await getDocumentDetl(docmntID),
        enabled: false,
        staleTime: Infinity
    });

    const docDetlInfpArray = useMemo(() => docDetlArray, [docDetlArray]);

    const handleModelOpen = async () => {
        setOpen(true);
        await refetchDocDetl();
        await refetchDocInfoByID();
    };

    const PinIcon = <Pin height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />
    const Calender = <Calendar height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />
    const Menuscale = <MenuScale height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />
    // if (!docData) return <div>Loading Document Details...</div>;
    return (
        <Box>
            <IconButton
                variant="outlined"
                size="small"
                onClick={handleModelOpen}
            >
                <BorderColorIcon sx={{ color: 'rgba(var(--color-pink),1)', fontSize: '1.2rem', m: 0.35 }} />
            </IconButton>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "all 0.5s ease-in-out",
                    backgroundColor: "transparent",
                }}
            >
                <ModalDialog
                    size="sm"
                    sx={{
                        width: screenWidth,
                        height: screenHeight,
                        p: 1,
                        backgroundColor: "rgba(var(--modal-bg-color))",
                        transition: "all 0.5s ease-in-out",
                        border: 0.2,
                        borderColor: "rgba(var(--border-primary))",
                    }}
                >
                    <ModalClose variant="outlined" sx={{ m: 0.5 }} />
                    <Typography
                        id="modal-title"
                        textColor="inherit"
                        sx={{ fontWeight: "md", mb: 1, fontFamily: "var(--font-family)", color: "rgba(var(--font-primary-white))" }}
                    >
                        Document Information and Approval Form
                    </Typography>
                    <Box className="flex flex-1 flex-col rounded-md overflow-scroll w-full p-1" sx={{ borderColor: "rgba(var(--border-primary))" }}>
                        <Grid container spacing={0.5} flexGrow={1} flexDirection={"row"}>
                            <Grid
                                size={{ xs: 12, sm: 12, md: 7, lg: 8, xl: 8 }}
                                className="p-4 rounded-md"
                                sx={{ border: 0.5, borderColor: "rgba(var(--border-primary))" }}
                            >
                                {/* Docuemnt Header Information */}
                                <Box className="flex p-2 rounded-md">
                                    <Avatar size="lg" >
                                        <MultiplePages />
                                    </Avatar>
                                    <Box className="flex flex-col ml-2 justify-end" >
                                        <div
                                            className="flex"
                                            style={{
                                                fontFamily: "var(--font-family)", lineHeight: '1.4rem',
                                                fontWeight: 600,
                                                fontSize: "1rem",
                                                textTransform: "capitalize",
                                                textAlign: "justify",
                                                color: "rgba(var(--font-primary-white))"
                                            }} >{docName}</div>
                                        <div className="flex gap-2">
                                            <div className="flex text-xs" style={{ fontFamily: "var(--font-family)", color: "rgba(var(--font-primary-white))" }} >Document no : {docNumber} </div>
                                            <div className="flex text-xs" style={{ fontFamily: "var(--font-family)", color: "rgba(var(--font-primary-white))" }} >Document date : {docDate} </div>
                                            <div className="flex text-xs" style={{ fontFamily: "var(--font-family)", color: "rgba(var(--font-primary-white))" }} >Version : {'1.0.0'}</div>
                                        </div>
                                    </Box>
                                </Box>
                                <Box sx={{ height: "calc(100vh - 20dvh)", overflowY: 'scroll' }}>
                                    <Box className="flex flex-col mt-4 rounded-md pb-1 border-[0.1rem] mx-0"
                                        sx={{ borderColor: "rgba(var(--border-primary))", position: 'relative' }} >
                                        {/* Docuemnt Detailed Section */}
                                        <Box>
                                            <Box className="flex p-1 pl-4 rounded-md"  >
                                                {/* Header */}
                                                <Avatar size="md" >
                                                    <MultiplePages />
                                                </Avatar>
                                                <Box className="flex flex-col ml-2 justify-center" >
                                                    <div
                                                        className="flex"
                                                        style={{
                                                            fontFamily: "var(--font-family)", lineHeight: '1.4rem',
                                                            fontWeight: 500,
                                                            fontSize: "1rem",
                                                            textTransform: "capitalize",
                                                            textAlign: "justify",
                                                            color: "rgba(var(--font-primary-white))"
                                                        }} >Document Information</div>
                                                </Box>
                                            </Box>
                                            <Divider sx={{ m: 0, mb: 0.5, backgroundColor: 'rgba(var(--border-primary))' }} />
                                            <Box className="flex p-1 px-10 rounded-md">
                                                <Box className="flex flex-1 flex-col mt-1 rounded-md pb-1 gap-1">
                                                    <Box className="flex flex-1 flex-row gap-2" >
                                                        <CustomTypoPara label={docNumber} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{PinIcon} Document no : </div>}
                                                            startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={docDate} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Calender} Document date : </div>}
                                                            startIconStyle={{ opacity: 0.8, }} />
                                                    </Box>
                                                    <Box className="flex flex-1 flex-row gap-2" >
                                                        <CustomTypoPara label={'1.0.0'} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{PinIcon}Document Version : </div>}
                                                            startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={docDate} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Calender}Version Date : </div>}
                                                            startIconStyle={{ opacity: 0.8, }} />
                                                    </Box>
                                                    <Box className="flex flex-1 flex-col gap-1" >
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Description : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Type : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Sub Type : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Category : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Sub Category : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Group : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Institute Master : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Course Master : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <Box className="flex flex-1 flex-row gap-x-1" >
                                                            <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Rack Name: </div>} startIconStyle={{ opacity: 0.8, }} />
                                                            <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Custodian : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        </Box>
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Validity Period : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <Box className="flex flex-1 flex-row gap-x-1" >
                                                            <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Created User : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                            <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Created Date : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Divider sx={{ m: 0, mb: 0.5, backgroundColor: 'rgba(var(--border-primary))' }} />
                                        </Box>
                                        {/* Edit Document Section */}
                                        <Box sx={{ position: 'relative', top: 0, zIndex: 100, backgroundColor: 'rgba(var(--bg-card))' }}  >
                                            <Box>
                                                <Box className="flex p-1 pl-4 rounded-md">
                                                    {/* Header */}
                                                    <Avatar size="md" >
                                                        <MultiplePages />
                                                    </Avatar>
                                                    <Box className="flex flex-col ml-2 justify-center" >
                                                        <div
                                                            className="flex"
                                                            style={{
                                                                fontFamily: "var(--font-family)", lineHeight: '1.4rem',
                                                                fontWeight: 500,
                                                                fontSize: "1rem",
                                                                textTransform: "capitalize",
                                                                textAlign: "justify",
                                                                color: "rgba(var(--font-primary-white))"
                                                            }} >Edit / Updated the Document Information</div>
                                                    </Box>
                                                </Box>
                                                <Divider />
                                            </Box>
                                            <Box className="flex p-1 px-10 rounded-md">
                                                <Box className="flex flex-1 flex-col mt-1 rounded-md pb-1 gap-1">

                                                    <Box className="flex flex-1 flex-col gap-1" >
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Description : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Type : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Sub Type : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Category : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Sub Category : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Group : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Institute Master : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Course Master : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <Box className="flex flex-1 flex-row gap-x-1" >
                                                            <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Rack Name: </div>} startIconStyle={{ opacity: 0.8, }} />
                                                            <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Custodian : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        </Box>
                                                        <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Validity Period : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <Box className="flex flex-1 flex-row gap-x-1" >
                                                            <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Created User : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                            <CustomTypoPara label={"Docuemtn Desc "} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Created Date : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid
                                size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 4 }}
                                gap={1}
                                className="p-2 rounded-md"
                                sx={{ border: 0.5, borderColor: "rgba(var(--border-primary))" }}
                            >
                                {docDetlInfpArray?.map((el, idx) => (
                                    <FilleListCmp key={idx} data={el} />
                                ))}
                            </Grid>
                        </Grid>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box >
    );
};

export default memo(EditDocUpload);
