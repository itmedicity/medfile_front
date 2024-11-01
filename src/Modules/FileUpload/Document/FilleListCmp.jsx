import { Box, IconButton } from "@mui/joy";
import React, { memo } from "react";
import CustomTypo from "../../../Components/CustomTypo";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoDisturbOffOutlinedIcon from "@mui/icons-material/DoDisturbOffOutlined";
import FileLink from "../../../assets/pdf.png";
import { NAS_FOLDER } from "../../../Constant/Static";
import { useState } from "react";
import FileDisplayModal from "./FileDisplayModal";

const FilleListCmp = ({ data }) => {

    const { doc_id, doc_number, filename, mimetype, originalname } = data
    const NasFileLink = `${NAS_FOLDER}${doc_number}/${filename}`

    const [openFile, setOpenFile] = useState(false)

    return (
        <Box className="p-2 border rounded-md h-24 flex gap-1 flex-1 flex-row">
            <FileDisplayModal openFile={openFile} setOpenFile={setOpenFile} fileLink={NasFileLink} />
            <Box
                className="flex w-20 border rounded-md items-center justify-center cursor-pointer hover:bg-slate-100 drop-shadow-md transition-all"
                onClick={() => setOpenFile(true)}
            >
                <img
                    alt="upload image"
                    src={mimetype === "application/pdf" ? FileLink : NasFileLink}
                    width={60}
                    height={60}
                    className="p-1 rounded-md object-contain"
                />
            </Box>
            <Box className="flex flex-1 border rounded-md flex-col items-center justify-center">
                <CustomTypo
                    label={filename}
                    style={{ fontSize: "1rem", paddingY: 0, textTransform: 'uppercase' }}
                />
                <CustomTypo
                    label={originalname}
                    style={{ fontSize: "0.8rem", paddingY: 0, }}
                />
                <CustomTypo
                    label={doc_number}
                    style={{ fontSize: "0.8rem", paddingY: 0, textTransform: 'uppercase', fontWight: 900 }}
                />
            </Box>
            <Box className="flex w-24 justify-center items-center">
                <Box>
                    <IconButton color="neutral" onClick={() => { }}>
                        <DoDisturbOffOutlinedIcon fontSize="large" />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton color="neutral" onClick={() => { }}>
                        <DeleteOutlinedIcon fontSize="large" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(FilleListCmp);
