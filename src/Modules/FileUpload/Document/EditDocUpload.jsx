// @ts-nocheck
import {
    Box,
    Checkbox,
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
import React, { useEffect, useMemo } from "react";
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

const EditDocUpload = ({ params }) => {
    const { doc_slno, doc_id } = params.row; // DATA FROM TABLE ACTION || FROM THE PARAMS

    const docmntSlno = doc_slno; // ID FOR GETTIG THE DOC DETAILS
    const docmntID = doc_id

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
        docDate: new Date(),
        docVersionDate: new Date(),
        docExpStart: new Date(),
        docExpEnd: new Date(),
        isRequiredExp: false,
        isSecure: false,
    });

    //    GET THE DATA USING THE DOCUMENT ID USING THE REACT QERY
    const { isLoading, data, error } = useQuery({
        queryKey: ["getDocInfoByID", docmntSlno],
        queryFn: () => getDocInforByID(docmntSlno),
        enabled: !!docmntSlno,
    });
    const docData = useMemo(() => data, [data]);
    //   console.log(docData);

    useEffect(() => {
        seteditDocumentState({
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
            docDate:
                isValid(docData?.doc_date) &&
                format(new Date(docData?.doc_date), "yyyy-MM-dd"),
            docVersionDate: new Date(docData?.doc_ver_date),
            docExpStart: new Date(docData?.doc_exp_start),
            docExpEnd:
                isValid(new Date(docData?.doc_date)) &&
                format(new Date(docData?.doc_exp_end), "yyyy-MM-dd"),
            isRequiredExp: docData?.isRequiredExp === 1 ? true : false,
            isSecure: docData?.isSecure === 1 ? true : false,
        });
    }, [docData]);

    const [open, setOpen] = useState(false);

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

    // GET THE DOCUEMNT DETAILS

    const {
        isLoading: docDetlIsLoading,
        data: docDetlArray,
        error: docDetlError,
    } = useQuery({
        queryKey: ["getTheDocInfoDetl", docmntID],
        queryFn: () => getDocumentDetl(docmntID),
        enabled: !!docmntID,
    });

    const docDetlInfpArray = useMemo(() => docDetlArray, [docDetlArray]);

    return (
        <Box>
            <IconButton
                variant="outlined"
                size="small"
                onClick={() => {
                    setOpen(true);
                }}
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
                        level="body-md"
                        textColor="inherit"
                        sx={{ fontWeight: "lg", mb: 1 }}
                    >
                        Document Info
                    </Typography>
                    <Box className="flex flex-1 flex-col rounded-md overflow-scroll w-full p-1">
                        <Grid container spacing={0.5} flexGrow={1} flexDirection={"row"}>
                            <Grid
                                size={{ xs: 12, sm: 12, md: 7, lg: 6, xl: 6 }}
                                className="p-2 rounded-md"
                                sx={{ border: 0.5, borderColor: "rgba(var(--border-primary))" }}
                            >
                                <Box className="p-3">
                                    <Box className="flex justify-between">
                                        <Typography
                                            level="title-lg"
                                            textAlign="left"
                                            textColor="neutral.700"
                                            color="neutral"
                                            endDecorator={<AssignmentOutlinedIcon />}
                                        >
                                            {docName?.toUpperCase()}
                                        </Typography>
                                        <SecurityOutlinedIcon
                                            color={isSecure === 1 ? "error" : "success"}
                                        />
                                    </Box>
                                    <Box className="flex justify-between">
                                        <Typography
                                            level="body-sm"
                                            sx={{ fontWeight: 200, opacity: 0.9 }}
                                        >
                                            {docNumber}
                                        </Typography>
                                        <Typography
                                            startDecorator={
                                                <span
                                                    className="font-semibold text-red-500"
                                                    style={{
                                                        display: isRequiredExp === true ? "flex" : "none"
                                                    }}
                                                >
                                                    expired on
                                                </span>
                                            }
                                            sx={{ color: isRequiredExp === true ? "red" : "green" }}
                                            level="body-sm"
                                            className=" font-semibold"
                                        >
                                            {isRequiredExp === true ? docExpEnd?.toString() : "Document has no expiry"}
                                        </Typography>
                                    </Box>
                                    {/* <CustomTypo label={"DOC-2024-10-000218"} />
                                    <CustomTypo label={"19/10/2024 12:58:11 PM"} /> */}
                                </Box>
                                <Box className="p-3">
                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            fontWeight: 200,
                                            fontSize: "0.8rem",
                                            textTransform: "uppercase",
                                            opacity: 0.9,
                                        }}
                                        endDecorator={
                                            <PriorityHighOutlinedIcon
                                                sx={{ fontSize: "0.8rem", color: "red" }}
                                            />
                                        }
                                    >
                                        Description
                                    </Typography>
                                    <Box className="border h-12 ml-1 mt-1">
                                        <CustomTypo label={"asdasd asda sdas dasd asd"} />
                                    </Box>
                                </Box>
                                {/* *************************************START************************************ */}

                                <Box className="flex flex-1 flex-col px-4">
                                    <Box className="flex flex-1 flex-col">
                                        <SelectDocTypeMaster
                                            label={"Document Type Master"}
                                            // handleChange={(e, element) =>
                                            //     handleDocumentState({
                                            //         target: { name: "docType", value: element },
                                            //     })
                                            // }
                                            value={docType}
                                        />
                                    </Box>
                                    <Box className="flex flex-1 flex-col">
                                        <SelectDocSubTypeMaster
                                            label={"Document Sub Type Master"}
                                            // handleChange={(e, element) =>
                                            //     handleDocumentState({
                                            //         target: { name: "docSubType", value: element },
                                            //     })
                                            // }
                                            value={docSubType}
                                        />
                                    </Box>
                                    {docSubType === "2" ? (
                                        <>
                                            <Box className="flex flex-1 flex-col">
                                                <SelectInstituteMaster
                                                    label={"Institute Master"}
                                                    // handleChange={(e, element) =>
                                                    //     handleDocumentState({
                                                    //         target: { name: "institute", value: element },
                                                    //     })
                                                    // }
                                                    value={institute}
                                                />
                                            </Box>
                                            <Box className="flex flex-1 flex-col">
                                                <SelectCourseMaster
                                                    label={"Course Master"}
                                                    // handleChange={(e, element) =>
                                                    //     handleDocumentState({
                                                    //         target: { name: "course", value: element },
                                                    //     })
                                                    // }
                                                    value={course}
                                                />
                                            </Box>
                                        </>
                                    ) : null}
                                    <Box className="flex flex-1 flex-col">
                                        <SelectCmpCategoryNameList
                                            label={"Category Name List"}
                                            // handleChange={(e, element) =>
                                            //     handleDocumentState({
                                            //         target: { name: "category", value: element },
                                            //     })
                                            // }
                                            value={category}
                                        />
                                    </Box>
                                    <Box className="flex flex-1 flex-col">
                                        <SelectSubCategoryMater
                                            label={"Sub Category Master"}
                                            catSlno={Number(category) ?? 0}
                                            // handleChange={(e, element) =>
                                            //     handleDocumentState({
                                            //         target: { name: "subCategory", value: element },
                                            //     })
                                            // }
                                            value={subCategory}
                                        />
                                    </Box>
                                    <Box className="flex flex-1 flex-col">
                                        <SelectGroupMaster
                                            label={"Group Master"}
                                            // handleChange={(e, element) =>
                                            //     handleDocumentState({
                                            //         target: { name: "group", value: element },
                                            //     })
                                            // }
                                            value={group}
                                        />
                                    </Box>
                                    <Box className="flex flex-1 flex-col pt-1">
                                        <Box className="flex flex-1 items-center justify-between py-[0.1rem] px-2">
                                            <Checkbox
                                                label="Is a Secure Document"
                                                variant="outlined"
                                                color="warning"
                                                checked={Boolean(isSecure)}
                                                // onChange={(e) =>
                                                //     handleDocumentState({
                                                //         target: {
                                                //             name: "isSecure",
                                                //             value: e.target.checked,
                                                //         },
                                                //     })
                                                // }
                                                sx={{ opacity: 0.9, fontSize: "0.9rem" }}
                                            />
                                        </Box>
                                        <Box className="flex flex-1 items-center justify-between py-[0.1rem] px-2">
                                            <Checkbox
                                                label="Is Validity Required for this Document"
                                                variant="outlined"
                                                color="danger"
                                                checked={Boolean(isRequiredExp)}
                                                // onChange={(e) =>
                                                //     handleDocumentState({
                                                //         target: {
                                                //             name: "isRequiredExp",
                                                //             value: e.target.checked,
                                                //         },
                                                //     })
                                                // }
                                                sx={{ opacity: 0.9, fontSize: "0.9rem" }}
                                            />
                                        </Box>
                                        {Boolean(isRequiredExp) === true && (
                                            <Box className="flex flex-1 items-center py-[0.1rem]">
                                                <Box className="flex flex-1">
                                                    <CustomButtonDateFeild
                                                        date={docExpStart}
                                                    // setDate={(date) =>
                                                    //     handleDocumentState({
                                                    //         target: { name: "docExpStart", value: date },
                                                    //     })
                                                    // }
                                                    />
                                                </Box>
                                                <Box className="flex flex-1">
                                                    <CustomButtonDateFeild
                                                        date={docExpEnd}
                                                    // setDate={(date) =>
                                                    //     handleDocumentState({
                                                    //         target: { name: "docExpEnd", value: date },
                                                    //     })
                                                    // }
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                    {/* SUBMIT BUTTON SECTION */}
                                    <Box className="flex flex-1 flex-row py-2 justify-end">
                                        <CommonMenuList
                                            handleSubmitButtonFun={() => { }}
                                            handleViewButtonFun={() => { }}
                                        />
                                    </Box>
                                    {/* END SUBMIT BUTTON SECTION */}
                                </Box>
                                {/* END */}
                            </Grid>
                            <Grid
                                size={{ xs: 12, sm: 12, md: 7, lg: 6, xl: 6 }}
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
        </Box>
    );
};

export default memo(EditDocUpload);
