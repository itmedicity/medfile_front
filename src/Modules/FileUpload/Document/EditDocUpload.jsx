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
import { MultiplePages, MenuScale, MessageText, Pin, Calendar, Lock, LockSlash, OpenBook } from 'iconoir-react'
import CustomTypoHeader from "../Components/CustomTypoHeader";
import CustomTypoPara from "../Components/CustomTypoPara";

const EditDocUpload = ({ params }) => {
    const { doc_slno, doc_id } = params.row; // DATA FROM TABLE ACTION || FROM THE PARAMS

    const docmntSlno = doc_slno; // ID FOR GETTIG THE DOC DETAILS
    const docmntID = doc_id

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
        docVer: "",
        doc_date: format(new Date(), "yyyy-MM-dd HH:mm"),
        doc_ver_date: format(new Date(), "yyyy-MM-dd HH:mm"),
        doc_exp_start: format(new Date(), "yyyy-MM-dd"),
        doc_exp_end: format(new Date(), "yyyy-MM-dd"),
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
        uploadDate: ""
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
                doc_date: docData?.doc_date && isValid(new Date(docData?.doc_date)) && format(new Date(docData?.doc_date), "dd-MM-yyyy HH:mm") || "",
                doc_ver_date: docData?.doc_ver_date && isValid(new Date(docData?.doc_ver_date)) && format(new Date(docData?.doc_ver_date), "dd-MM-yyyy HH:mm") || "",
                doc_exp_start: docData?.doc_exp_start && isValid(new Date(docData?.doc_exp_start)) && format(new Date(docData?.doc_exp_start), "dd-MM-yyyy") || "", //format(new Date(docData?.doc_exp_start), " yyyy-MM-dd") || "",
                doc_exp_end: docData?.doc_exp_end && isValid(new Date(docData?.doc_exp_end)) && format(new Date(docData?.doc_exp_end), "dd-MM-yyyy") || "",
                isRequiredExp: docData?.isRequiredExp,
                isSecure: docData?.isSecure,
                docRack: docData?.docRack,
                rac_desc: docData?.rac_desc,
                loc_name: docData?.loc_name,
                rack: docData?.rack,
                docCustodian: docData?.docCustodian,
                cust_name: docData?.cust_name,
                uploadUser: docData?.uploadUser,
                uploadDate: docData?.uploadDate && isValid(new Date(docData?.uploadDate)) && format(new Date(docData?.uploadDate), "dd-MM-yyyy HH:mm") || "",
                uploadUserName: docData?.name

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
        uploadUserName
    } = editDocumentState;
    // console.log(editDocumentState)

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
                                        <MultiplePages color="rgba(var(--icon-primary))" />
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
                                            }} >{doc_name}</div>
                                        <div className="flex gap-2">
                                            <div className="flex text-xs" style={{ fontFamily: "var(--font-family)", color: "rgba(var(--font-primary-white))" }} >Document no : {doc_number} </div>
                                            <div className="flex text-xs" style={{ fontFamily: "var(--font-family)", color: "rgba(var(--font-primary-white))" }} >Document date : {doc_date} </div>
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
                                                <Box className="flex flex-1" >
                                                    {/* Header */}
                                                    <Avatar size="md" >
                                                        <MultiplePages color="rgba(var(--icon-primary))" />
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
                                                <Box className="flex flex-row items-center min-w-32">
                                                    {
                                                        isSecure === 1 ?
                                                            <Box className="flex flex-row items-end gap-3" >
                                                                <Box sx={{
                                                                    fontFamily: "var(--font-family)",
                                                                    fontWeight: 500,
                                                                    fontSize: "1rem",
                                                                    color: "rgba(var(--font-primary-white))"
                                                                }} >Secure File</Box>
                                                                <Lock height={35} width={35} color="rgba(var(--icon-primary))" />
                                                            </Box>
                                                            : <Box className="flex flex-row items-end gap-3">
                                                                <Box sx={{
                                                                    fontFamily: "var(--font-family)",
                                                                    fontWeight: 500,
                                                                    fontSize: "1rem",
                                                                    color: "rgba(var(--font-primary-white))"
                                                                }}>Open File</Box>
                                                                <OpenBook height={35} width={35} color="rgba(var(--icon-primary))" />
                                                            </Box>
                                                    }
                                                </Box>
                                            </Box>
                                            <Divider sx={{ m: 0, mb: 0.5, backgroundColor: 'rgba(var(--border-primary))' }} />
                                            <Box className="flex p-1 px-10 rounded-md">
                                                <Box className="flex flex-1 flex-col mt-1 rounded-md pb-1 gap-1">
                                                    <Box className="flex flex-1 flex-row gap-2" >
                                                        <CustomTypoPara label={doc_number} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{PinIcon} Document no : </div>}
                                                            startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={doc_date} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Calender} Document date : </div>}
                                                            startIconStyle={{ opacity: 0.8, }} />
                                                    </Box>
                                                    <Box className="flex flex-1 flex-row gap-2" >
                                                        <CustomTypoPara label={'1.0.0'} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{PinIcon}Document Version : </div>}
                                                            startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={doc_ver_date} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Calender}Version Date : </div>}
                                                            startIconStyle={{ opacity: 0.8, }} />
                                                    </Box>
                                                    <Box className="flex flex-1 flex-col gap-1" >
                                                        <CustomTypoPara label={doc_desc} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Description : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={main_type_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Type : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={doc_sub_type_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Sub Type : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={category_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Category : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={subcat_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Sub Category : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        <CustomTypoPara label={group_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                            startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Group : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        {
                                                            institute !== 0 &&
                                                            <CustomTypoPara label={institution_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Institute Master : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        }
                                                        {
                                                            course !== 0 &&
                                                            <CustomTypoPara label={course_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Course Master : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        }
                                                        <Box className="flex flex-1 flex-row gap-x-1" >
                                                            <CustomTypoPara label={rack} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Rack & Location: </div>} startIconStyle={{ opacity: 0.8, }} />
                                                            <CustomTypoPara label={cust_name} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Custodian Name : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        </Box>
                                                        {
                                                            isRequiredExp === 1 &&
                                                            <CustomTypoPara label={`${doc_exp_start}  -  ${doc_exp_end}`} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Document Validity Period : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                        }
                                                        <Box className="flex flex-1 flex-row gap-x-1" >
                                                            <CustomTypoPara label={uploadUserName} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Created User : </div>} startIconStyle={{ opacity: 0.8, }} />
                                                            <CustomTypoPara label={uploadDate} className="flex flex-1 border-[0.1rem] p-1 rounded-md"
                                                                startIcon={<div className="flex justify-between items-center gap-2" style={{ fontWeight: 500 }} >{Menuscale}Created Date : </div>} startIconStyle={{ opacity: 0.8, }} />
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
                                                        <MultiplePages color="rgba(var(--icon-primary))" />
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
                                                        {/* Document Description */}
                                                        {/* Document Type */}
                                                        {/* Document Sub type */}
                                                        {/* category */}
                                                        {/* sub category */}
                                                        {/* Group */}
                                                        {/* Institute */}
                                                        {/* course */}
                                                        {/* Custodian */}
                                                        {/* rack and location */}
                                                        {/* Document Validity Period */}
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