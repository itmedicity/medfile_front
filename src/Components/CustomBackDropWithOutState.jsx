// @ts-nocheck
import { Backdrop, CircularProgress } from '@mui/material';
import React, { memo } from 'react'
import { Typography } from '@mui/joy';

const CustomBackDropWithOutState = ({ message }) => {
    return (
        <Backdrop
            // sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1, backgroundColor: 'transparent', })}
            sx={{
                zIndex: 1
            }}
            open={true}
            invisible
        // onClick={handleClose}
        // className='flex flex-col justify-center items-center'
        >
            {/* <Typography level="body-xs" className="p-5" sx={{ color: 'rgba(216,75,154,1)' }} >{message}</Typography> */}
            <CircularProgress sx={{ color: 'rgba(216,75,154,1)' }} />
        </Backdrop>
    )
}

export default memo(CustomBackDropWithOutState)