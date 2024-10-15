import { Box, IconButton } from '@mui/joy'
import React from 'react'
import { memo } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor';

const EditDocUpload = ({ params }) => {


    return (
        <Box>
            <IconButton
                onClick={() => console.log(params)}
            ><BorderColorIcon /></IconButton>
        </Box>
    )
}

export default memo(EditDocUpload) 