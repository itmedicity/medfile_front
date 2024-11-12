import React, { memo, useState } from 'react'
import { Box, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { screenHeight, screenWidth } from '../../../Constant/Constant'
import Grid from "@mui/material/Grid2";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import CustomTypo from '../../../Components/CustomTypo';
import FileList from './FileList';
import PdfViewComponent from './PdfViewComponent';

const FileViewModal = ({ open, setOpen, data, files }) => {
    const [link, setLink] = useState('')
    const isRequiredExp = true
    return (
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
                backgroundColor: "#FFFFFF00",
            }}
        >
            <ModalDialog
                size="sm"
                sx={{
                    width: screenWidth,
                    height: screenHeight,
                    p: 1,
                    backgroundColor: "#F8FFF9",
                    transition: "all 0.5s ease-in-out",
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

                <Box className="flex flex-1 flex-col border rounded-md overflow-scroll w-full p-1">
                    <Grid container spacing={0.5} flexGrow={1} flexDirection={"row"}>
                        <Grid
                            size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}
                            className="p-2 border rounded-md"
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
                                        {data?.doc_name?.toUpperCase()}
                                    </Typography>

                                    <SecurityOutlinedIcon
                                        color={data?.isSecure === 1 ? "error" : "success"}
                                    />
                                </Box>
                                <Box className="flex justify-between">
                                    <Typography
                                        level="body-sm"
                                        sx={{ fontWeight: 200, opacity: 0.9 }}
                                    >
                                        {data?.doc_number}
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
                                        {/* {isRequiredExp === true ? docExpEnd?.toString() : "Document has no expiry"} */}
                                        {isRequiredExp === true ? '2024-14-05' : "Document has no expiry"}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className="p-3">
                                <Typography
                                    level="body-sm"
                                    sx={{
                                        fontWeight: 600,
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
                                    <CustomTypo label={data?.doc_desc} style={{}} />
                                </Box>
                            </Box>
                            {/* *************************************START************************************ */}

                            <Box className="flex flex-1 flex-col px-4">
                                <Box className="flex flex-1 flex-col">
                                    <Typography sx={{ fontSize: '0.755rem', fontWeight: 600, fontSmooth: 'antialiased' }} >DOCUMENT TYPE</Typography>
                                    <CustomTypo label={data?.doc_type_master_name} style={{ p: 0.3 }} />
                                </Box>
                                <Box className="flex flex-1 flex-col">
                                    <Typography sx={{ fontSize: '0.755rem', fontWeight: 600, fontSmooth: 'antialiased' }} >DOCUMENT SUB TYPE</Typography>
                                    <CustomTypo label={data?.doc_sub_type_name} style={{ p: 0.3 }} />
                                </Box>
                                <Box className="flex flex-1 flex-col">
                                    <Typography sx={{ fontSize: '0.755rem', fontWeight: 600, fontSmooth: 'antialiased' }} >CATEGORY NAME</Typography>
                                    <CustomTypo label={data?.category_name} style={{ p: 0.3 }} />
                                </Box>
                                <Box className="flex flex-1 flex-col">
                                    <Typography sx={{ fontSize: '0.755rem', fontWeight: 600, fontSmooth: 'antialiased' }} >SUB CATEGORY</Typography>
                                    <CustomTypo label={data?.subcat_name} style={{ p: 0.3 }} />
                                </Box>
                                <Box className="flex flex-1 flex-col">
                                    <Typography sx={{ fontSize: '0.755rem', fontWeight: 600, fontSmooth: 'antialiased' }} >DOC GROUP</Typography>
                                    <CustomTypo label={data?.group_name} style={{ p: 0.3 }} />
                                </Box>
                            </Box>
                            <Box
                                className="flex rounded-md border flex-col"
                                sx={{
                                    height: 'calc(50vh - 25px)',
                                }}
                            >
                                <Box sx={{ m: 1, overflow: 'scroll' }}>
                                    {files?.map((el, idx) => (
                                        <FileList key={idx} data={el} setLink={setLink} />
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                        <Grid
                            size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }}
                            gap={1}
                            className="p-2 border rounded-md"
                        >
                            <PdfViewComponent fileLink={link} />
                        </Grid>
                    </Grid>
                </Box>
            </ModalDialog>
        </Modal>
    )
}

export default memo(FileViewModal) 