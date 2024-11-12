import { Box } from "@mui/joy";
import React, { memo, useCallback } from "react";
import CustomTypo from "../../../Components/CustomTypo";
import FileLink from "../../../assets/pdf.png";
import { NAS_FOLDER } from "../../../Constant/Static";
// import FileDisplayModal from "./FileDisplayModal";

const FileList = ({ data, setLink }) => {

    const { doc_number, filename, mimetype } = data
    const NasFileLink = `${NAS_FOLDER}${doc_number}/${filename}`

    const handleSetPdfImage = useCallback(() => {
        setLink(NasFileLink)
    }, [setLink, NasFileLink])


    return (
        <Box className="p-1 border rounded-md h-24 flex gap-1 flex-1 flex-row mb-1 bg-green-50">
            {/* <FileDisplayModal openFile={openFile} setOpenFile={setOpenFile} fileLink={NasFileLink} /> */}
            <Box
                className="flex w-20 border rounded-md items-center justify-center cursor-pointer hover:bg-slate-100 drop-shadow-md transition-all"
                onClick={handleSetPdfImage}
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
                {/* <CustomTypo
                    label={originalname}
                    style={{ fontSize: "0.8rem", paddingY: 0, overFlow: 'hidden' }}
                /> */}
                <CustomTypo
                    label={doc_number}
                    style={{ fontSize: "0.8rem", paddingY: 0, textTransform: 'uppercase', fontWight: 900 }}
                />
            </Box>
        </Box>
    )
}

export default memo(FileList) 