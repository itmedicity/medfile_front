import React from 'react'
import { memo } from 'react'
import { Box, IconButton, Input, Typography } from '@mui/joy'
import { baseColor, customInputHeight } from '../Constant/Constant'
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import RefreshIcon from '@mui/icons-material/Refresh';

const CustomInputWithLabel = ({
    placeholder,
    labelName,
    sx,
    type,
    values,
    handleInputChange
}) => {
    return (
        <Box className="flex flex-1 flex-col" >
            <Typography level='body-sm' sx={{ fontWeight: 600, opacity: 0.6, pl: 0.2 }} fontSize='0.7rem' >{labelName}</Typography>
            <Input
                startDecorator={<StickyNote2Icon sx={{ color: '#5b6b79', opacity: 0.6 }} />}
                endDecorator={<IconButton variant='soft' ><RefreshIcon sx={{ color: '#5b6b79', opacity: 0.6 }} /></IconButton>}
                placeholder={placeholder}
                size='sm'
                value={values}
                onChange={handleInputChange}
                variant='outlined'
                type={type}
                sx={{
                    ...customInputHeight,
                    ...sx,
                }}
            />
        </Box>
    )
}

export default memo(CustomInputWithLabel) 