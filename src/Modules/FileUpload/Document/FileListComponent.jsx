import { Box, IconButton, Typography } from "@mui/joy";
import React from "react";
import { memo } from "react";
import ClearIcon from "@mui/icons-material/Clear";

const FileListComponent = ({
    FileLink,
    imageName,
    handleRemoveFile,
    uploadFIleSize,
}) => {
    return (
        <Box className="flex w-full border h-16 p-1 rounded-md">
            <img
                alt="upload image"
                src={FileLink}
                width={60}
                height={60}
                className="border p-1 rounded-md object-contain"
            />
            <Box className="flex flex-grow flex-col px-2  justify-center text-wrap capitalize">
                <Typography level="body-sm" fontWeight={900} fontSize={13}>
                    {imageName?.toLowerCase()}
                </Typography>
                <Typography level="body-xs" fontWeight={500} fontSize={10}>
                    {uploadFIleSize}
                </Typography>
            </Box>
            <Box className="flex items-center px-3">
                <IconButton color="danger" onClick={handleRemoveFile}>
                    <ClearIcon fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    );
};

export default memo(FileListComponent);
