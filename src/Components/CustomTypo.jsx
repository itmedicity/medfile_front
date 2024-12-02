import { Typography } from '@mui/joy'
import React from 'react'
import { memo } from 'react'

const CustomTypo = ({ label, style }) => {
    return (
        <Typography
            level="body-sm"
            // className="line-clamp-1"
            sx={{
                display: 'flex',
                fontWeight: 200,
                textTransform: 'capitalize',
                p: 0.5,
                ...style,
                fontFamily: 'var(--font-varient)',
                color: 'rgba(var(--font-primary-white),0.8)',

            }}
        >
            {label?.toLowerCase()}
        </Typography>
    )
}

export default memo(CustomTypo)