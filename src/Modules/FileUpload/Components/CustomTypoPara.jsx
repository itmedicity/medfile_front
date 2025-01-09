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
            startDecorator={<span style={{ ...startIconStyle }} >{startIcon}</span> || <></>}
            endDecorator={<span style={{ ...endIconStyle }}>{endIcon}</span> || <></>}
        >
            {label}
        </Typography>
    )
}

export default memo(CustomTypoPara)