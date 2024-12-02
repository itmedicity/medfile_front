import { Box, Typography } from "@mui/joy";
import React, { memo, useCallback } from "react";
import CustomTypo from "../../../Components/CustomTypo";
import FileLink from "../../../assets/images/pdfSvg2.svg";
import { NAS_FOLDER } from "../../../Constant/Static";
// import FileDisplayModal from "./FileDisplayModal";

const FileList = ({ data, setLink }) => {
  const { doc_number, filename, mimetype } = data;
  const NasFileLink = `${NAS_FOLDER}${doc_number}/${filename}`;

  const handleSetPdfImage = useCallback(() => {
    setLink(NasFileLink);
  }, [setLink, NasFileLink]);

  return (
    <Box className="p-1 border-[0.5px] rounded-md h-16 flex flex-1 flex-row mb-1 bg-bgcard border-borderprimary">
      {/* <FileDisplayModal openFile={openFile} setOpenFile={setOpenFile} fileLink={NasFileLink} /> */}
      <Box
        className="flex  
        w-12 rounded-md items-center justify-center cursor-pointer 
        hover:bg-baseWhite/85 
        bg-baseWhite/60
        drop-shadow-md "
        onClick={handleSetPdfImage}
      >
        <img
          alt="upload image"
          src={mimetype === "application/pdf" ? FileLink : FileLink}
          width={50}
          height={50}
          className="p-[0.290rem] rounded-md object-contain"
        />
      </Box>
      <Box className="flex flex-auto rounded-md flex-col pl-2" >
        {/* <Typography color="primary" className="line-clamp-1" >sdfsdfsdfffffffffffffffffffffffffffffffffsdasdasdasffffffffffsssssssssssssss ddddddddddddddd</Typography> */}
        <CustomTypo
          label={filename}
          style={{ fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)', paddingY: 0, }}
        />
        <CustomTypo
          label={doc_number}
          style={{
            fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)',
            paddingY: 0,
            // textTransform: "uppercase",
            fontWight: 900,
          }}
        />
      </Box>
    </Box>
  );
};

export default memo(FileList);
