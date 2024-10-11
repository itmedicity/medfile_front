import { IconButton, Input } from '@mui/joy'
import React, { memo } from 'react'
import { baseColor, customInputHeight } from '../Constant/Constant'
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import RefreshIcon from '@mui/icons-material/Refresh';

const CustomInput = ({
    placeholder,
    sx
}) => {
    return (
        <Input
            startDecorator={<StickyNote2Icon sx={{ color: baseColor.primarylight, }} />}
            endDecorator={<IconButton variant='soft' ><RefreshIcon sx={{ color: baseColor.primarylight, }} /></IconButton>}
            placeholder={placeholder}
            size='sm'
            variant='outlined'
            sx={{
                ...customInputHeight,
                ...sx,
            }}
        />
    )
}

export default memo(CustomInput)