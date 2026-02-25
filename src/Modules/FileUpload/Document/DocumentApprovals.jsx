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
import ApprovalDocList from "./ApprovalDocList";
import QueueIcon from '@mui/icons-material/Queue';
import { Tooltip } from "@mui/material";
import JSZip from "jszip";

const DocumentApprovals = ({ params }) => {
    const queryClient = useQueryClient();
    const { doc_slno, doc_id } = params.row; // DATA FROM TABLE ACTION || FROM THE PARAMS

    // console.log("params:", params);
    // console.log("doc_slno:", doc_slno);
    // console.log("doc_id:", doc_id);



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
        apprvl_status: 0,
        short_name: '',
        lifelong_validity: 0,
        days_torenew: 0
    });

    //    GET THE DATA USING THE DOCUMENT ID USING THE REACT QERY
    const { isLoading, data, error, refetch: refetchDocInfoByID } = useQuery({
        queryKey: ["getDocInfoByID", docmntSlno],
        queryFn: async () => await getDocInforByID(docmntSlno),
        enabled: false,
        staleTime: Infinity,
    });

    const docData = useMemo(() => data, [data]);
    // console.log("docData", docData);


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
                apprvl_status: docData?.apprvl_status,
                short_name: docData?.short_name,
                lifelong_validity: docData?.lifelong_validity === 1 ? "YES" : "NO",
                days_torenew: docData?.days_torenew,
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
        isLegalDoc, apprvl_status,
        short_name,
        lifelong_validity,
        days_torenew
    } = editDocumentState;

    // fetching files

    const [UploadedImagesall, setUploadedImagesall] = useState([])


    useEffect(() => {
        const getImage = async (doc_number) => {
            try {
                const result = await axiosApi.get(`/docMaster/getFilesall/${doc_number}`, {
                    responseType: 'blob'
                });

                const contentType = result.headers['content-type'] || '';
                if (contentType?.includes('application/json')) {
                    return;
                } else {
                    const zip = await JSZip.loadAsync(result.data);
                    // Extract image files (e.g., .jpg, .png)
                    const imageEntries = Object.entries(zip.files).filter(
                        ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
                    );
                    const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
                        // Get the original blob (no type)
                        const originalBlob = await fileObj.async('blob');
                        // Determine MIME type based on filename extension (or any other logic)
                        let mimeType = '';
                        if (filename.endsWith('.pdf')) {
                            mimeType = 'application/pdf';
                        } else if (filename.endsWith('.png')) {
                            mimeType = 'image/png';
                        } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
                            mimeType = 'image/jpeg';
                        } else {
                            mimeType = 'application/octet-stream'; // fallback
                        }
                        // Recreate blob with correct type
                        const blobWithType = new Blob([originalBlob], { type: mimeType });
                        // Create URL from new blob
                        const url = URL.createObjectURL(blobWithType);
                        return { imageName: filename, url, blob: blobWithType };
                    });
                    const images = await Promise.all(imagePromises);
                    setUploadedImagesall(images)
                }
            } catch (error) {
                console.error('Error fetching or processing images:', error);
            }
        }
        getImage(doc_number)
    }, [doc_number])






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
    // console.log("docDetlArray", docDetlArray);

    const docDetlInfpArray = useMemo(() => {
        if (!docDetlArray || !Array.isArray(docDetlArray) || docDetlArray.length === 0) {
            console.warn("docDetlArray is empty or not valid.");
            return [];
        }

        const filteredArray = (docDetlArray || []).filter(item => item?.docActiveStatus === 0);

        const groupedItems = filteredArray.reduce((acc, item) => {
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

                const enrichedItems = items.map(itm => {
                    const matchedUpload = UploadedImagesall.find(uploaded => uploaded.imageName === itm.filename);
                    return {
                        docActiveStatus: itm.docActiveStatus,
                        docCreateUser: itm.docCreateUser,
                        docCreatedDate: itm.docCreatedDate,
                        docVer: itm.docVer,
                        docVerDate: itm.docVerDate,
                        docVer_amentment: itm.docVer_amentment,
                        doc_id: itm.doc_id,
                        doc_number: itm.doc_number,
                        docd_slno: itm.docd_slno,
                        dovVer_infoAment: itm.dovVer_infoAment,
                        filename: itm.filename,
                        mimetype: itm.mimetype,
                        name: itm.name,
                        originalname: itm.originalname,
                        url: matchedUpload?.url,
                        imageName: matchedUpload?.imageName,
                        type: matchedUpload?.blob?.type

                    };
                });

                return {
                    docVer: docVer + "." + firstItem.docVer_amentment + "." + firstItem.dovVer_infoAment,
                    docVerDate: format(new Date(firstItem.docVerDate), "dd-MM-yyyy HH:mm"),
                    docVersionAment: enrichedItems,
                };
            });
    }, [docDetlArray, UploadedImagesall]);

    const handleModelOpen = async () => {
        setOpen(true);
        await refetchDocDetl();
        await refetchDocInfoByID();
    };

    const PinIcon = <Pin height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />
    const Calender = <Calendar height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />
    const Menuscale = <MenuScale height={16} width={16} color="rgba(var(--icon-primary))" style={{ opacity: 0.8 }} />

    const ApprovalSubmission = useCallback(async () => {
        const obj = {
            apprvl_status: 1,
            apprvl_user: Number(user),
            apprvl_date: format(new Date(), "yyyy-MM-dd HH:mm"),
            doc_id: Number(doc_id)
        }
        try {
            const DocumentApproval = await axiosApi.patch("/docMaster/DocApproval", obj);
            const { success } = DocumentApproval.data;
            if (success === 1) {
                succesNofity("Document Approved Successfully");
                await refetchDocInfoByID();
                await queryClient.invalidateQueries(["getDocList"]);
            }
        } catch (error) {
            errorNofity("Something went wrong".error);
        }
    }, [user, doc_id])

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

                                                    {/* <Box className="flex flex-1 flex-row gap-x-1" >
                                                   </Box> */}
                                                    <Box className="flex flex-1 flex-row gap-x-1" >
                                                        <CustomTypoPara label={short_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Short Name : </span>} startIconStyle={{ opacity: 0.8, }} />

                                                        <CustomTypoPara label={lifelong_validity} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Lifelong Validity: </span>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={days_torenew} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<span className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Days To Renew : </span>} startIconStyle={{ opacity: 0.8, }} />
                                                    </Box>

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

                                            <Box className="flex flex-1 flex-row justify-end">
                                                <IconButton
                                                    onClick={() => ApprovalSubmission()} // Your existing click handler
                                                    variant="outlined"
                                                    disabled={apprvl_status === 1} // Disable button if apprvl_status is 1
                                                    sx={{
                                                        mr: 5,
                                                        fontWeight: 400,
                                                        '&:hover': {
                                                            borderColor: 'rgba(var(--icon-primary))',
                                                            backgroundColor: 'transparent',
                                                            fontFamily: "var(--font-family)",
                                                            lineHeight: '1.4rem',
                                                            fontWeight: 600,
                                                            fontSize: "1rem",
                                                            textTransform: "capitalize",
                                                            textAlign: "justify",
                                                            color: "rgba(var(--font-primary-white))",
                                                        },
                                                        opacity: apprvl_status === 1 ? 0.5 : 1, // Optional: Add opacity for disabled state
                                                    }}
                                                >
                                                    {apprvl_status === 0 ? (
                                                        <Typography sx={{ color: "rgba(var(--font-primary-white))" }}>Document Approve</Typography>

                                                    ) : (
                                                        <Typography sx={{ color: "rgba(var(--font-primary-white))" }}>Approved</Typography>
                                                    )}
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                            </Grid>

                            {/* Document list */}
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
                                                        <ApprovalDocList key={idx} data={el} refetchDocDetl={refetchDocDetl} />
                                                    ))
                                                }
                                            </Fragment>
                                        )
                                    })
                                }

                            </Grid>

                        </Grid>

                    </Box>
                </ModalDialog>
            </Modal>
        </Box >
    );
};

export default memo(DocumentApprovals);

