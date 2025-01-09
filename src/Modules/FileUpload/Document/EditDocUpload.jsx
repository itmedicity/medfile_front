// @ts-nocheck
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
import React, { Fragment, Suspense, useCallback, useEffect, useMemo } from "react";
import { memo } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useState } from "react";
import { errorNofity, sanitizeInput, screenHeight, screenWidth, succesNofity, warningNofity } from "../../../Constant/Constant";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDocInforByID, getDocumentDetl } from "../../../api/commonAPI";
import { format, isValid } from "date-fns";
import { MultiplePages, MenuScale, MessageText, Pin, Calendar, Lock, LockSlash, OpenBook, ArrowRight, CalendarXmark } from 'iconoir-react'
import CustomTypoHeader from "../Components/CustomTypoHeader";
import CustomTypoPara from "../Components/CustomTypoPara";
import SelectCmpRackMaster from "../../../Components/SelectCmpRackMaster";
import SelectCmpCustodianMaster from "../../../Components/SelectCmpCustodianMaster";
import CustomCheckBoxWithLabel from "../../../Components/CustomCheckBoxWithLabel";
import CustomInput from "../../../Components/CustomInput";
import axiosApi from "../../../Axios/Axios";
import DocEditHeaderSection from "../Components/DocEditHeaderSection";
import Files from "react-files";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileListComponent from "./FileListComponent";
import dummyImage from "../../../assets/pdf.png";
import ExpiryRenewDoc from "./ExpiryRenewDoc";
import CustomBackDropWithOutState from "../../../Components/CustomBackDropWithOutState";
import RenewDoc from "./RenewDoc";

const EditDocUpload = ({ params }) => {
    const queryClient = useQueryClient();
    const { doc_slno, doc_id } = params.row; // DATA FROM TABLE ACTION || FROM THE PARAMS

    const docmntSlno = doc_slno; // ID FOR GETTIG THE DOC DETAILS
    const docmntID = doc_id

    const userData = localStorage.getItem("app_auth");
    const user = atob(JSON.parse(userData)?.authNo);

    const [open, setOpen] = useState(false);

    //   SET STATE BASED ON THE DATA FETCH USING THE ID
    const [editDocumentState, seteditDocumentState] = useState({
        doc_number: 0,
        doc_name: "",
        doc_desc: "",
        doc_type: 0,
        main_type_name: "",
        doc_sub_type: 0,
        doc_sub_type_name: "",
        institute: 0,
        institution_name: "",
        course: 0,
        course_name: "",
        category: 0,
        category_name: "",
        sub_category: 0,
        subcat_name: "",
        group_mast: 0,
        group_name: "",
        docVer: 0,
        docVersionAment: 0,
        docVersionInfoEdit: 0,
        doc_date: format(new Date(), "yyyy-MM-dd HH:mm"),
        doc_ver_date: format(new Date(), "yyyy-MM-dd HH:mm"),
        doc_exp_start: format(new Date(), "yyyy-MM-dd HH:mm"),
        doc_exp_end: format(new Date(), "yyyy-MM-dd HH:mm"),
        isRequiredExp: false,
        isSecure: false,
        docRack: "",
        rac_desc: "",
        loc_name: "",
        rack: "",
        docCustodian: "",
        cust_name: "",
        uploadUser: "",
        uploadUserName: "",
        uploadDate: "",
        isLegalDoc: false,
    });

    //    GET THE DATA USING THE DOCUMENT ID USING THE REACT QERY
    const { isLoading, data, error, refetch: refetchDocInfoByID } = useQuery({
        queryKey: ["getDocInfoByID", docmntSlno],
        queryFn: async () => await getDocInforByID(docmntSlno),
        enabled: false,
        staleTime: Infinity,
    });

    const docData = useMemo(() => data, [data]);

    useEffect(() => {
        if (docData) {
            seteditDocumentState((prev) =>
            ({
                ...prev,
                doc_number: docData?.doc_number,
                doc_name: docData?.doc_name,
                doc_desc: docData?.doc_desc,
                doc_type: docData?.doc_type,
                main_type_name: docData?.main_type_name,
                doc_sub_type: docData?.doc_sub_type,
                doc_sub_type_name: docData?.doc_sub_type_name,
                institute: docData?.institute || 0,
                institution_name: docData?.institution_name || "",
                course: docData?.course || 0,
                course_name: docData?.course_name || "",
                category: docData?.category,
                category_name: docData?.category_name,
                sub_category: docData?.sub_category,
                subcat_name: docData?.subcat_name,
                group_mast: docData?.group_mast,
                group_name: docData?.group_name,
                docVer: docData?.docVer,
                docVersionAment: docData?.docVer_amentment,
                docVersionInfoEdit: docData?.dovVer_infoAment,
                doc_date: isValid(new Date(docData?.doc_date)) && format(new Date(docData?.doc_date), "dd-MM-yyyy HH:mm") || "",
                doc_ver_date: isValid(new Date(docData?.doc_ver_date)) && format(new Date(docData?.doc_ver_date), "dd-MM-yyyy HH:mm") || "",
                doc_exp_start: isValid(new Date(docData?.doc_exp_start)) && format(new Date(docData?.doc_exp_start), "yyyy-MM-dd HH:mm") || "",
                doc_exp_end: isValid(new Date(docData?.doc_exp_end)) && format(new Date(docData?.doc_exp_end), "yyyy-MM-dd HH:mm") || "",
                isRequiredExp: docData?.isRequiredExp,
                isSecure: docData?.isSecure === 1 ? true : false,
                docRack: docData?.docRack,
                rac_desc: docData?.rac_desc,
                loc_name: docData?.loc_name,
                rack: docData?.rack,
                docCustodian: docData?.docCustodian,
                cust_name: docData?.cust_name,
                uploadUser: docData?.uploadUser,
                uploadDate: docData?.uploadDate && isValid(new Date(docData?.uploadDate)) && format(new Date(docData?.uploadDate), "dd-MM-yyyy HH:mm") || "",
                uploadUserName: docData?.name,
                isLegalDoc: docData?.isLegalDoc === 1 ? true : false,

                // docNumber: docData?.doc_number,
                // docName: docData?.doc_name,
                // docDes: docData?.doc_desc,
                // docType: docData?.doc_type,
                // docSubType: docData?.doc_sub_type,
                // institute: docData?.institute,
                // course: docData?.course,
                // category: docData?.category,
                // subCategory: docData?.sub_category,
                // group: docData?.group_mast,
                // docDate: isValid(new Date(docData?.doc_date)) && format(new Date(docData?.doc_date), "yyyy-MM-dd HH:mm"),
                // docVersionDate: new Date(docData?.doc_ver_date),
                // docExpStart: new Date(docData?.doc_exp_start),
                // docExpEnd: isValid(new Date(docData?.doc_date)) && format(new Date(docData?.doc_exp_end), "yyyy-MM-dd"),
                // isRequiredExp: docData?.isRequiredExp === 1 ? true : false,
                // isSecure: docData?.isSecure === 1 ? true : false,
            }));
        }
    }, [docData]);

    const {
        doc_number,
        doc_name,
        doc_desc,
        doc_type,
        main_type_name,
        doc_sub_type,
        doc_sub_type_name,
        institute,
        institution_name,
        course,
        course_name,
        category,
        category_name,
        sub_category,
        subcat_name,
        group_mast,
        group_name,
        docVer,
        docVersionAment,
        docVersionInfoEdit,
        doc_date,
        doc_ver_date,
        doc_exp_start,
        doc_exp_end,
        isRequiredExp,
        isSecure,
        docRack,
        rac_desc,
        loc_name,
        rack,
        docCustodian,
        cust_name,
        uploadUser,
        uploadDate,
        uploadUserName,
        isLegalDoc
    } = editDocumentState;

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

    const docDetlInfpArray = useMemo(() => {
        if (!docDetlArray || !Array.isArray(docDetlArray) || docDetlArray.length === 0) {
            console.warn("docDetlArray is empty or not valid.");
            return [];
        }

        const groupedItems = docDetlArray.reduce((acc, item) => {
            if (item?.docVer) {
                acc[item.docVer] = acc[item.docVer] || [];
                acc[item.docVer].push(item);
            }
            return acc;
        }, {});


        return Object.entries(groupedItems)
            .sort(([verA], [verB]) => verB.localeCompare(verA)) // Descending order
            .map(([docVer, items]) => {
                const firstItem = items[0];
                return {
                    docVer: docVer + "." + firstItem.docVer_amentment + "." + firstItem.dovVer_infoAment,
                    docVerDate: format(new Date(firstItem.docVerDate), "dd-MM-yyyy HH:mm"),
                    docVersionAment: items,
                };
            });

        // return [...new Set(docDetlArray?.map((item) => item.docVer))].map((items) => {
        //     return {
        //         docVer: items,
        //         docAment: docDetlArray?.filter((item) => item.docVer === items)[0].docVer_amentment,
        //         docInfo: docDetlArray?.filter((item) => item.docVer === items)[0].dovVer_infoAment,
        //         docVerDate: format(new Date(docDetlArray?.filter((item) => item.docVer === items)[0].docVerDate), "dd-MM-yyyy HH:mm"),
        //         docVersionAment: docDetlArray?.filter((item) => item.docVer === items),
        //     }
        // })
    }, [docDetlArray]);

    const handleModelOpen = async () => {
        setOpen(true);
        await refetchDocDetl();
        await refetchDocInfoByID();
    };

    const PinIcon = <Pin height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />
    const Calender = <Calendar height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />
    const Menuscale = <MenuScale height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />
    // if (!docData) return <div>Loading Document Details...</div>;

    // HANDLE CHANGE FUNTIONS FOR UPDATING THE DOCUMENT DETAILS

    const handleDocumentUpdateChange = useCallback((e) => {
        seteditDocumentState({ ...editDocumentState, [e.target.name]: sanitizeInput(e.target.value) });
    }, [editDocumentState]);


    useEffect(() => {
        isLegalDoc === "true" ? seteditDocumentState({ ...editDocumentState, isSecure: true }) : seteditDocumentState({ ...editDocumentState, isSecure: false })
    }, [isLegalDoc])

    // console.log(isLegalDoc, isSecure)

    const handleUpdateDocument = useCallback(async (e) => {

        e.preventDefault();

        if (editDocumentState.doc_name === "") {
            warningNofity("Document Name cannot be empty");
            return;
        }

        if (editDocumentState.doc_desc === "") {
            warningNofity("Document Description cannot be empty");
            return;
        }

        if (Number(editDocumentState.doc_type) === 0) {
            warningNofity("Document Type cannot be empty");
            return;
        }

        if (Number(editDocumentState.doc_sub_type) === 0) {
            warningNofity("Document Sub Type cannot be empty");
            return;
        }

        if (Number(editDocumentState.institute) === 2 && Number(editDocumentState.institute) === 0) {
            warningNofity("Institute cannot be empty");
            return;
        }

        if (Number(editDocumentState.institute) === 2 && Number(editDocumentState.course) === 0) {
            warningNofity("Course cannot be empty");
            return;
        }

        if (Number(editDocumentState.category) === 0) {
            warningNofity("Category cannot be empty");
            return;
        }

        if (Number(editDocumentState.sub_category) === 0) {
            warningNofity("Sub Category cannot be empty");
            return;
        }

        if (Number(editDocumentState.group_mast) === 0) {
            warningNofity("Group cannot be empty");
            return;
        }

        // if (isValid(new Date(editDocumentState.doc_date)) === false) {
        //     warningNofity("Document Date cannot be empty");
        //     return;
        // }

        // if (isValid(new Date(editDocumentState.doc_ver_date)) === false) {
        //     warningNofity("Document Version Date cannot be empty");
        //     return;
        // }

        if (Boolean(editDocumentState.isRequiredExp) === true && isValid(new Date(editDocumentState.doc_exp_start)) === false) {
            warningNofity(
                "Document Expiry Start Date cannot be empty || Valid Date is required"
            );
            return;
        }

        if (
            Boolean(editDocumentState.isRequiredExp) === true &&
            isValid(new Date(editDocumentState.doc_exp_end)) === false
        ) {
            warningNofity(
                "Document Expiry End Date cannot be empty || Valid Date is required"
            );
            return;
        }

        if (
            Boolean(editDocumentState.isRequiredExp) === true &&
            new Date(editDocumentState.doc_exp_start) > new Date(editDocumentState.doc_exp_end)
        ) {
            warningNofity(
                "Document Expiry Start Date cannot be greater than Expiry End Date"
            );
            return;
        }



        const FormPostData = {
            docID: doc_id,
            docName: editDocumentState.doc_name.trim(),
            docDes: editDocumentState.doc_desc.trim(),
            docType: Number(editDocumentState.doc_type),
            docSubType: Number(editDocumentState.doc_sub_type),
            institute: Number(editDocumentState.institute),
            course: Number(editDocumentState.course),
            category: Number(editDocumentState.category),
            subCategory: Number(editDocumentState.sub_category),
            group: Number(editDocumentState.group_mast),
            docVersion: 1,
            docVersionAment: 0,
            docVersionInfoEdit: Number(docVersionInfoEdit) + 10,
            docVersionDate: format(new Date(), "yyyy-MM-dd HH:mm"),
            docExpStart: format(new Date(editDocumentState.doc_exp_start), "yyyy-MM-dd"),
            docExpEnd: format(new Date(editDocumentState.doc_exp_end), "yyyy-MM-dd"),
            isRequiredExp: Boolean(editDocumentState.isRequiredExp) === true ? 1 : 0,
            isSecure: Boolean(editDocumentState.isSecure) === true ? 1 : 0,
            isLegalDoc: Boolean(editDocumentState.isLegalDoc) === true ? 1 : 0,
            docRack: Number(editDocumentState.docRack),
            docCustodian: Number(editDocumentState.docCustodian),
            docEditDate: format(new Date(), "yyyy-MM-dd HH:mm"),
            userID: user
        };

        try {
            const updateRes = await axiosApi.patch("/docMaster/updateDocMaster", FormPostData);
            const { success } = updateRes.data;
            if (success === 1) {
                succesNofity("Document Updated Successfully");
                await refetchDocInfoByID();
                await queryClient.invalidateQueries(["getDocList"]);
            }
            console.log(updateRes)
        } catch (error) {
            console.log(error)
            errorNofity("Something went wrong".error);
        }

    }, [editDocumentState, docVersionInfoEdit, docmntSlno])

    const docUpdationState = useMemo(() => {
        return {
            doc_number,
            doc_date: docData?.doc_date,
            docVer,
            docVersionAment,
            docVersionInfoEdit,
            doc_ver_date,
            isRequiredExp,
            doc_exp_end,
            doc_exp_start
        }
    }, [
        doc_number,
        docData?.doc_date,
        docVer,
        docVersionAment,
        docVersionInfoEdit,
        doc_ver_date,
        isRequiredExp,
        doc_exp_end,
        doc_exp_start
    ])


    const [renDoc, setRenDoc] = useState(null)

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
                                <Box className="flex p-2 rounded-md justify-between">
                                    <Box className="flex flex-row">
                                        <Avatar size="lg" >
                                            <MultiplePages color="rgba(var(--icon-primary))" />
                                        </Avatar>
                                        <Box className="flex flex-col ml-2 justify-end" >
                                            <div
                                                className="flex"
                                                style={{
                                                    fontFamily: "var(--font-family)",
                                                    lineHeight: '1.4rem',
                                                    fontWeight: 600,
                                                    fontSize: "1rem",
                                                    textTransform: "capitalize",
                                                    textAlign: "justify",
                                                    color: "rgba(var(--font-primary-white))"
                                                }} >{doc_name}</div>
                                            <div className="flex gap-2">
                                                <div className="flex text-xs" style={{ fontFamily: "var(--font-family)", color: "rgba(var(--font-primary-white))" }} >Document no : {doc_number} </div>
                                                <div className="flex text-xs" style={{ fontFamily: "var(--font-family)", color: "rgba(var(--font-primary-white))" }} >Document date : {doc_date} </div>
                                                <div className="flex text-xs" style={{ fontFamily: "var(--font-family)", color: "rgba(var(--font-primary-white))" }} >Version : {'1.0.0'}</div>
                                            </div>
                                        </Box>
                                    </Box>
                                    <Box className="flex flex-row min-w-32 items-end ">
                                        {
                                            isSecure === true ?
                                                <Box className="flex flex-row items-end gap-3" >
                                                    <Box sx={{
                                                        fontFamily: "var(--font-family)",
                                                        fontWeight: 500,
                                                        fontSize: "1rem",
                                                        color: "rgba(var(--font-primary-white))"
                                                    }} >Secure Doc</Box>
                                                    <Lock height={35} width={35} color="rgba(var(--icon-primary))" />
                                                </Box>
                                                : <Box className="flex flex-row items-end gap-3">
                                                    <Box sx={{
                                                        fontFamily: "var(--font-family)",
                                                        fontWeight: 500,
                                                        fontSize: "1rem",
                                                        color: "rgba(var(--font-primary-white))"
                                                    }}>Normal Doc</Box>
                                                    <OpenBook height={35} width={35} color="rgba(var(--icon-primary))" />
                                                </Box>
                                        }
                                    </Box>
                                </Box>
                                <Divider sx={{ mb: 1, backgroundColor: "rgba(var(--border-primary))" }} />
                                <Box sx={{ height: "calc(100vh - 27dvh)", overflowY: 'scroll' }}>
                                    <Box className="flex flex-col mt-4 rounded-md pb-1 border-[0.1rem] mx-0"
                                        sx={{ borderColor: "rgba(var(--border-primary))", position: 'relative' }} >
                                        {/* Docuemnt Detailed Section */}
                                        <Box>
                                            {/* Header Section - Document Information */}
                                            <DocEditHeaderSection label={"Document Information"} />
                                            <Box className="flex p-1 px-10 rounded-md py-5">
                                                <Box className="flex flex-1 flex-col mt-1 rounded-md pb-1 gap-1">
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
                                                    <Box className="flex flex-1 flex-col gap-1" >
                                                        <CustomTypoPara label={doc_desc} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Description : </span>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={main_type_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Type : </span>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={doc_sub_type_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Sub Type : </span>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={category_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Category : </span>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={subcat_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Sub Category : </span>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={group_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Group : </span>} startIconStyle={{ opacity: 0.8, }} />
                                                        {
                                                            institute !== 0 &&
                                                            <CustomTypoPara label={institution_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Institute Master : </span>} startIconStyle={{ opacity: 0.8, }} />
                                                        }
                                                        {
                                                            course !== 0 &&
                                                            <CustomTypoPara label={course_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Course Master : </span>} startIconStyle={{ opacity: 0.8, }} />
                                                        }
                                                        <Box className="flex flex-1 flex-row gap-x-1" >
                                                            <CustomTypoPara label={rack} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Rack & Location: </span>} startIconStyle={{ opacity: 0.8, }} />
                                                            <CustomTypoPara label={cust_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Custodian Name : </span>} startIconStyle={{ opacity: 0.8, }} />
                                                        </Box>
                                                        {
                                                            isRequiredExp === 1 &&
                                                            <CustomTypoPara label={`${format(new Date(doc_exp_start), "do-LLLL-yyyy")}  to  ${format(new Date(doc_exp_end), "do-LLLL-yyyy")}`} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Validity Period : </span>} startIconStyle={{ opacity: 0.8, }} />
                                                        }
                                                        <Box className="flex flex-1 flex-row gap-x-1" >
                                                            <CustomTypoPara label={uploadUserName} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Created User : </span>} startIconStyle={{ opacity: 0.8, }} />
                                                            <CustomTypoPara label={uploadDate} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Created Date : </span>} startIconStyle={{ opacity: 0.8, }} />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>


                                        {/* Edit Document Section */}
                                        <Box sx={{ position: 'relative', top: 0, backgroundColor: 'rgba(var(--bg-card))' }}  >
                                            {/* Header Section - Edit / Updated the Document Information */}
                                            <DocEditHeaderSection label={"Edit / Update the Document Information"} />
                                            <Box className="flex flex-col p-1 px-10 py-5">
                                                <Box className="flex flex-1 flex-col mt-1 rounded-md pb-1 gap-1">
                                                    <Box className="flex flex-1 flex-col gap-1" >
                                                        <Box className="flex flex-1 items-center justify-between py-[0.199rem] px-2">
                                                            <CustomCheckBoxWithLabel
                                                                label="Is Legal Document"
                                                                checkBoxValue={isLegalDoc}
                                                                handleCheckBoxValue={(e) => handleDocumentUpdateChange({ target: { name: "isLegalDoc", value: e.target.checked } })}
                                                            />
                                                        </Box>
                                                        {/* Document Description */}
                                                        <Box>
                                                            <Typography level='body-sm'
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    fontFamily: "var(--font-varient)",
                                                                    opacity: 0.8,
                                                                    paddingY: "0.10rem",
                                                                    paddingLeft: "0.16rem",
                                                                    lineHeight: "1.0rem",
                                                                    fontSize: "0.81rem",
                                                                    color: 'rgba(var(--font-primary-white))'
                                                                }}
                                                                fontSize='0.7rem'
                                                            >Document Name</Typography>
                                                            <CustomInput
                                                                placeholder="Document Name Type here..."
                                                                value={doc_name}
                                                                onChange={(e) => handleDocumentUpdateChange({ target: { name: "doc_name", value: e.target.value } })}
                                                            />
                                                        </Box>
                                                        <Box>
                                                            <Typography level='body-sm'
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    fontFamily: "var(--font-varient)",
                                                                    opacity: 0.8,
                                                                    paddingY: "0.26rem",
                                                                    paddingLeft: "0.16rem",
                                                                    lineHeight: "1.0rem",
                                                                    fontSize: "0.81rem",
                                                                    color: 'rgba(var(--font-primary-white))'
                                                                }}
                                                                fontSize='0.7rem'
                                                            >Document Description</Typography>
                                                            <Textarea
                                                                placeholder="Doccument Descriptions Type here..."
                                                                minRows={2}
                                                                value={doc_desc}
                                                                onChange={(e) => handleDocumentUpdateChange({ target: { name: "doc_desc", value: e.target.value } })}
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
                                                        </Box>
                                                        {/* Document Type */}
                                                        <Box className="flex flex-1 flex-col">
                                                            <SelectDocTypeMaster
                                                                label={"Document Type Master"}
                                                                handleChange={(e, element) => handleDocumentUpdateChange({ target: { name: "doc_type", value: element } })}
                                                                value={doc_type}
                                                            />
                                                        </Box>
                                                        {/* Document Sub type */}
                                                        <Box className="flex flex-1 flex-col">
                                                            <SelectDocSubTypeMaster
                                                                label={"Document Sub Type Master"}
                                                                handleChange={(e, element) => handleDocumentUpdateChange({ target: { name: "doc_sub_type", value: element } })}
                                                                value={doc_sub_type}
                                                            />
                                                        </Box>
                                                        {/* category */}
                                                        <Box className="flex flex-1 flex-col">
                                                            <SelectCmpCategoryNameList
                                                                label={"Category Name List"}
                                                                handleChange={(e, element) => handleDocumentUpdateChange({ target: { name: "category", value: element }, })}
                                                                value={category}
                                                            />
                                                        </Box>
                                                        {/* sub category */}
                                                        <Box className="flex flex-1 flex-col">
                                                            <SelectSubCategoryMater
                                                                label={"Sub Category Master"}
                                                                catSlno={Number(category) ?? 0}
                                                                handleChange={(e, element) => handleDocumentUpdateChange({ target: { name: "sub_category", value: element } })}
                                                                value={sub_category}
                                                            />
                                                        </Box>
                                                        {/* Group */}
                                                        <Box className="flex flex-1 flex-col">
                                                            <SelectGroupMaster
                                                                label={"Group Master"}
                                                                handleChange={(e, element) => handleDocumentUpdateChange({ target: { name: "group_mast", value: element } })}
                                                                value={group_mast}
                                                            />
                                                        </Box>
                                                        {doc_sub_type === "2" ? (
                                                            <>
                                                                <Box className="flex flex-1 flex-col">
                                                                    {/* Institute */}
                                                                    <SelectInstituteMaster
                                                                        label={"Institute Master"}
                                                                        handleChange={(e, element) => handleDocumentUpdateChange({ target: { name: "institute", value: element } })}
                                                                        value={institute}
                                                                    />
                                                                </Box>
                                                                {/* course */}
                                                                <Box className="flex flex-1 flex-col">
                                                                    <SelectCourseMaster
                                                                        label={"Course Master"}
                                                                        handleChange={(e, element) => handleDocumentUpdateChange({ target: { name: "course", value: element } })}
                                                                        value={course}
                                                                    />
                                                                </Box>
                                                            </>
                                                        ) : null}
                                                        <Box className="flex flex-1 py-[0.4rem] gap-5" >
                                                            {/* rack  name */}
                                                            <SelectCmpRackMaster
                                                                label={"Rack Name"}
                                                                handleChange={(e, element) => handleDocumentUpdateChange({ target: { name: "docRack", value: element } })}
                                                                value={docRack}
                                                            />
                                                            {/* custodian name */}
                                                            <SelectCmpCustodianMaster
                                                                label={"Custodian Name"}
                                                                handleChange={(e, element) => handleDocumentUpdateChange({ target: { name: "docCustodian", value: element } })}
                                                                value={docCustodian}
                                                            />
                                                        </Box>
                                                        {/* Document Validity Period */}
                                                        <Box className="flex flex-1 items-center justify-between py-[0.1rem] px-2">
                                                            <CustomCheckBoxWithLabel
                                                                label="Is a Secure Document"
                                                                checkBoxValue={isSecure}
                                                                handleCheckBoxValue={(e) => handleDocumentUpdateChange({ target: { name: "isSecure", value: e.target.checked } })}
                                                                disabled={Boolean(isLegalDoc)}
                                                            />
                                                        </Box>
                                                        <Box className="flex flex-1 items-center justify-between py-[0.1rem] px-2">
                                                            <CustomCheckBoxWithLabel
                                                                label="Is Validity Required for this Document"
                                                                checkBoxValue={isRequiredExp}
                                                                handleCheckBoxValue={(e) => handleDocumentUpdateChange({ target: { name: "isRequiredExp", value: e.target.checked } })}
                                                            />
                                                        </Box>
                                                        {Boolean(isRequiredExp) === true && (
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
                                                        )}
                                                    </Box>

                                                </Box>
                                                <Box className="flex flex-1 flex-row mt-4 justify-end">
                                                    <CommonMenuList
                                                        handleSubmitButtonFun={handleUpdateDocument}
                                                    // handleViewButtonFun={() => setValue("2")}
                                                    />
                                                </Box>
                                            </Box>
                                            {/* <Divider sx={{ m: 0, mt: 2, backgroundColor: 'rgba(var(--border-primary))' }} /> */}
                                        </Box>



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
                                                                                        onClick={() => setRenDoc(false)}
                                                                                    >
                                                                                        Renew Expired Document
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
                                                                                        onClick={() => setRenDoc(true)}
                                                                                    >
                                                                                        Revise Existing Document
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
                                                                                onClick={() => setRenDoc(true)}
                                                                            >
                                                                                Revise Existing Document
                                                                            </Button>
                                                                        </Box>
                                                                    </Box>
                                                                )
                                                            }
                                                        </Box>

                                                        {/* doc expiry renew   */}
                                                        <Suspense fallback={<CustomBackDropWithOutState message="Loading..." />} >
                                                            {renDoc === true && <RenewDoc {...docUpdationState} />}
                                                            {renDoc === false && <ExpiryRenewDoc {...docUpdationState} />}
                                                        </Suspense>

                                                        {/* doc version revision   */}


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
                                {
                                    docDetlInfpArray?.map((el, idx) => {
                                        return (
                                            <Fragment key={idx}>
                                                <Box
                                                    className="flex flex-1 flex-row rounded-md justify-between p-3 my-3"
                                                    sx={{ border: 0.5, borderColor: "rgba(var(--border-primary))" }}
                                                >
                                                    <div
                                                        className="text-xs font-semibold"
                                                        style={{
                                                            color: 'rgba(var(--font-primary-white))',
                                                            fontFamily: "var(--font-family)",
                                                        }}
                                                    >Version : {el.docVer}</div>
                                                    <div className="text-xs font-semibold"
                                                        style={{
                                                            color: 'rgba(var(--font-primary-white))',
                                                            fontFamily: "var(--font-family)",
                                                        }}
                                                    >Version Date : {el.docVerDate}</div>
                                                </Box>
                                                {
                                                    el.docVersionAment?.map((el, idx) => (
                                                        <FilleListCmp key={idx} data={el} />
                                                    ))
                                                }
                                            </Fragment>
                                        )
                                    })
                                }
                                {/* {docDetlInfpArray?.map((el, idx) => (
                                    <FilleListCmp key={idx} data={el} />
                                ))} */}
                            </Grid>
                        </Grid>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box >
    );
};

export default memo(EditDocUpload);