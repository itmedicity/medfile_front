import { Typography } from '@mui/joy'
import React, { memo } from 'react'

const CustomTypoHeader = ({ startIcon, label, endIcon, sx }) => {
    return (
        <Typography
            textAlign="left"
            sx={{ fontWeight: 600, color: "rgba(var(--font-primary-white))", fontFamily: "var(--font-varient)", textTransform: 'capitalize', ...sx }}
            startDecorator={startIcon || <></>}
            endDecorator={endIcon || <></>}
        >
            {label}
        </Typography>
    )
}

export default memo(CustomTypoHeader)