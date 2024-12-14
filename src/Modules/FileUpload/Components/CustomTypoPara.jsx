import React, { memo } from 'react'
import { Typography } from '@mui/joy'

const CustomTypoPara = ({ label, startIcon, endIcon, className, startIconStyle, endIconStyle }) => {
    return (
        <Typography
            sx={{
                fontWeight: 600,
                color: "rgba(var(--font-primary-white))",
                fontFamily: "var(--font-varient)",
                textTransform: 'capitalize',
                fontSize: '0.88rem',
                lineHeight: '1.2rem',
                borderColor: 'rgba(var(--border-primary))'
            }}
            className={className}
            startDecorator={<div style={{ ...startIconStyle }} >{startIcon}</div> || <></>}
            endDecorator={<div style={{ ...endIconStyle }}>{endIcon}</div> || <></>}
        >
            {label}
        </Typography>
    )
}

export default memo(CustomTypoPara)