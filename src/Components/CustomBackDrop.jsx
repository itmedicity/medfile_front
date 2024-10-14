// @ts-nocheck
import { Backdrop, CircularProgress } from '@mui/material';
import React, { memo } from 'react'
import { baseColor } from '../Constant/Constant';

const CustomBackDrop = ({ setOpen, open }) => {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Backdrop
            sx={(theme) => ({ color: baseColor.ultralight, zIndex: theme.zIndex.drawer + 1, backgroundColor: 'transparent' })}
            open={open}
            // onClick={handleClose}
            className='flex flex-col justify-center items-center'
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default memo(CustomBackDrop) 