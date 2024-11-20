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

const FilleListCmp = ({ data }) => {

    const { doc_id, doc_number, filename, mimetype, originalname } = data
    const NasFileLink = `${NAS_FOLDER}${doc_number}/${filename}`

    const [openFile, setOpenFile] = useState(false)

    return (
        <Box className="p-1 border-[0.5px] rounded-md h-16 flex flex-1 flex-row mb-1 bg-bgcard border-borderprimary">
            <FileDisplayModal openFile={openFile} setOpenFile={setOpenFile} fileLink={NasFileLink} />
            <Box
                className="flex  
                w-12 rounded-md items-center justify-center cursor-pointer 
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
                    className="p-[0.290rem] rounded-md object-contain"
                />
            </Box>
            <Box className="flex flex-auto rounded-md flex-col pl-2">
                <CustomTypo
                    label={filename}
                    style={{ fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)', paddingY: 0, }}
                />
                <CustomTypo
                    label={originalname}
                    style={{
                        fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)',
                        paddingY: 0,
                        fontWight: 900,
                    }}
                />
                <CustomTypo
                    label={doc_number}
                    style={{
                        fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)',
                        paddingY: 0,
                        fontWight: 900,
                    }}
                />
            </Box>
            <Box className="flex w-24 justify-center items-center gap-1">
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
