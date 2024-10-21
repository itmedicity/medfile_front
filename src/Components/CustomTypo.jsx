import { Typography } from '@mui/joy'
import React from 'react'
import { memo } from 'react'

const CustomTypo = ({ label, style }) => {
    return (
        <Typography
            level="body-sm"
            sx={{ fontWeight: 200, textTransform: 'capitalize', opacity: 0.9, p: 0.5, ...style }}
        >
            {label?.toLowerCase()}
        </Typography>
    )
}

export default memo(CustomTypo)