import { Box, IconButton, Typography } from '@mui/joy'
import React from 'react'
import { memo } from 'react'
import ClearIcon from '@mui/icons-material/Clear';

const FileListComponent = ({ FileLink, imageName, handleRemoveFile }) => {
    return (
        <Box className="flex w-full border h-auto p-1 rounded-md">
            <img
                alt="upload image"
                src={FileLink}
                width={60}
                height={"auto"}
                className="border p-1 rounded-md"
            />
            <Box className="flex flex-grow items-center px-2">
                <Typography>{imageName}</Typography>
            </Box>
            <Box className="flex items-center px-3">
                <IconButton color="danger" onClick={handleRemoveFile} >
                    <ClearIcon fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    )
}

export default memo(FileListComponent)