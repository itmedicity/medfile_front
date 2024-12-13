import { Typography } from '@mui/joy'
import React, { memo } from 'react'

const CustomTypoHeader = ({ startIcon, label, endIcon }) => {
    return (
        <Typography
            level="title-lg"
            textAlign="left"
            sx={{ fontWeight: 500, color: "rgba(var(--font-primary-white))", fontFamily: "var(--font-varient)", textTransform: 'capitalize' }}
            startDecorator={startIcon || <></>}
            endDecorator={endIcon || <></>}
        >
            {label}
        </Typography>
    )
}

export default memo(CustomTypoHeader)