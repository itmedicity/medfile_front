import { Box, IconButton } from "@mui/joy";
import React, { memo } from "react";
import CustomTypo from "../../../Components/CustomTypo";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoDisturbOffOutlinedIcon from "@mui/icons-material/DoDisturbOffOutlined";
import FileLink from "../../../assets/images/pdfSvg2.svg";
import { NAS_FOLDER } from "../../../Constant/Static";
import { useState } from "react";
import FileDisplayModal from "./FileDisplayModal";
import { BinMinusIn, PageEdit } from 'iconoir-react'
import { format } from "date-fns";

const FilleListCmp = ({ data }) => {

    const {
        doc_id,
        doc_number,
        originalname,
        mimetype,
        filename,
        docVer,
        docVerDate,
        docCreateUser,
        name,
        docCreatedDate,
    } = data
    const NasFileLink = `${NAS_FOLDER}${doc_number}/${filename}`

    const [openFile, setOpenFile] = useState(false)

    return (
        <Box className="p-1 border-[0.5px] rounded-md h-16 flex flex-1 flex-row mb-1 bg-bgcard border-borderprimary justify-between gap-1">
            {
                openFile &&
                <FileDisplayModal openFile={openFile} setOpenFile={setOpenFile} fileLink={NasFileLink} />
            }
            <Box
                className="flex   
                rounded-md items-center justify-center cursor-pointer 
                hover:bg-baseWhite/85 
                bg-baseWhite/60
                drop-shadow-md"
                onClick={() => setOpenFile(true)}
            >
                <img
                    alt="upload image"
                    src={mimetype === "application/pdf" ? FileLink : NasFileLink}
                    width={50}
                    height={50}
                    className="p-[0.300rem] rounded-md object-contain "
                />
            </Box>
            <Box className="flex rounded-md flex-col pl-2 p-0 overflow-hidden flex-1">
                <div className="flex text-[0.690rem]" style={{ fontFamily: "var(--font-family)", color: "rgba(var(--font-primary-white))", fontWeight: "bold", lineHeight: "0.890rem" }} >{doc_number} </div>
                <div className="flex text-[0.6rem]" style={{ fontFamily: "var(--font-family)", color: "rgba(var(--font-primary-white))", lineHeight: "0.790rem" }} >
                    <p className="truncate w-[90%]">{originalname}</p>
                </div>
                <div className="flex text-[0.6rem] justify-between" style={{ fontFamily: "var(--font-family)", color: "rgba(var(--font-primary-white))", lineHeight: "0.790rem" }} >
                    <p>version date : {format(docVerDate, 'dd-MM-yyyy hh:mm a')}</p>
                    <p>version : {docVer}</p>
                </div>
                <div className="flex text-[0.6rem] justify-between" style={{ fontFamily: "var(--font-family)", color: "rgba(var(--font-primary-white))", lineHeight: "0.790rem" }} >
                    <p>created user : {name}</p>
                    <p>Date : {format(docCreatedDate, 'dd-MM-yyyy hh:mm a')}</p>
                </div>
            </Box>
            <Box className="flex w-20 justify-center items-center gap-1">
                <Box>
                    <IconButton onClick={() => { }} variant="outlined" size="sm"
                        sx={{
                            ':hover ': {
                                bgcolor: 'transparent',
                            }
                        }}
                    >
                        <PageEdit fontSize="small" color="rgba(var(--icon-primary))" />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => { }} variant="outlined" size="sm"
                        sx={{
                            ':hover ': {
                                bgcolor: 'transparent',
                            }
                        }}
                    >
                        <BinMinusIn fontSize="small" color="rgba(var(--icon-primary))" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(FilleListCmp);
