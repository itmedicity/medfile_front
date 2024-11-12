import { Box, IconButton, Tooltip, Typography } from '@mui/joy'
import React from 'react'
import { memo } from 'react'
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import { useState } from 'react';
import FileViewModal from './FileViewModal';
import { useCallback } from 'react';
import { getDocumentDetl } from '../../../api/commonAPI';

const TableContentVirtue = ({ data }) => {
    const [open, setOpen] = useState(false)
    const [files, setFiles] = useState([])
    const handleClickViewFile = useCallback(async (e) => {
        e.preventDefault()
        setOpen(true)
        const docID = data?.doc_id
        const fetchBulkFile = await getDocumentDetl(docID)
        setFiles(fetchBulkFile)
    }, [data])

    // console.log(data)
    return (
        <>
            <FileViewModal
                open={open}
                setOpen={setOpen}
                data={data}
                files={files}
            />
            <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex flex-1 w-16 h-full justify-center items-center">
                    {data.isSecure === 0 ? (
                        <Tooltip
                            title="Secured open file"
                            placement="left"
                            sx={{ fontSize: "0.8rem" }}
                            color="success"
                        >
                            <LockOpenOutlinedIcon
                                sx={{
                                    color: "#6fb872",
                                    cursor: "pointer",
                                }}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip
                            title="Secured Locked file"
                            placement="left"
                            sx={{ fontSize: "0.8rem" }}
                            color="warning"
                        >
                            <HttpsOutlinedIcon
                                sx={{
                                    color: "#e55185",
                                    cursor: "wait",
                                }}
                            />
                        </Tooltip>
                    )}
                </Box>
            </td>
            <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex w-16 h-full justify-center items-center">
                    <Tooltip title="View File" placement="top">
                        <IconButton
                            variant='outlined'
                            size='sm'
                            color='warning'
                            onClick={handleClickViewFile}
                        >
                            <PanoramaOutlinedIcon
                                sx={{
                                    cursor: "pointer",
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </Box>
            </td>
            <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex w-16 h-full justify-center items-center">
                    <Tooltip title="Print File" placement="top">
                        <IconButton
                            variant='outlined'
                            color='primary'
                            size='sm'
                            disabled={data.isSecure === 1 ? true : false}
                        >
                            <LocalPrintshopOutlinedIcon
                                sx={{
                                    cursor: "pointer",
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </Box>
            </td>
            <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex w-[10.5rem] h-full items-center pl-2">
                    <Typography level="title-md" fontSize={13.5} fontWeight={600} sx={{ opacity: 0.6, fontSmooth: 'antialiased' }}  >{data.doc_number}</Typography>
                </Box>
            </td>
            <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex w-[12rem] justify-center items-center px-2">
                    <Typography
                        level="body-md"
                        fontSize={13.5}
                        fontWeight={600}
                        color="neutral"
                        textAlign={"center"}
                        className="w-full"
                        sx={{ fontSmooth: 'antialiased' }}
                    >
                        {data.category_name}
                    </Typography>
                </Box>
            </td>
            <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex w-[18rem] justify-center items-center px-2">
                    <Typography
                        level="body-md"
                        fontSize={13.5}
                        fontWeight={600}
                        noWrap
                        color="neutral"
                        textAlign={"center"}
                        className="w-full"
                        sx={{ fontSmooth: 'antialiased' }}
                    >
                        {data.doc_type_master_name}
                    </Typography>
                </Box>
            </td>
            <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex w-[12rem] justify-center items-center px-2">
                    <Typography
                        level="body-md"
                        fontSize={13.5}
                        fontWeight={600}
                        noWrap
                        color="neutral"
                        textAlign={"center"}
                        className="w-full"
                        sx={{ fontSmooth: 'antialiased' }}
                    >
                        {data.group_name}
                    </Typography>
                </Box>
            </td>
            <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex h-full w-[38rem] flex-col">
                    <Typography
                        level="body-md"
                        fontSize={13.5}
                        fontWeight={600}
                        noWrap
                        color="neutral"
                        textAlign={"left"}
                        sx={{
                            textTransform: "capitalize",
                            pl: 1
                        }}
                    >
                        {data?.doc_desc.toLocaleLowerCase()}
                    </Typography>
                </Box>
            </td>
        </>
    )
}

export default memo(TableContentVirtue) 