// @ts-nocheck
import { Backdrop, CircularProgress } from '@mui/material';
import React, { memo } from 'react'
import { baseColor } from '../Constant/Constant';
import { Typography } from '@mui/joy';

const CustomBackDropWithOutState = ({ message }) => {
    return (
        <Backdrop
            sx={(theme) => ({ color: baseColor.ultralight, zIndex: theme.zIndex.drawer + 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: -0.8 })}
            open={true}
            // onClick={handleClose}
            className='flex flex-col justify-center items-center'
        >
            <Typography level="body-xs" className="p-5 text-[#001C30]" >{message}</Typography>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default memo(CustomBackDropWithOutState)