import React from 'react'
import { memo } from 'react'
import { Box, Divider, Typography } from '@mui/joy'
import Grid from '@mui/material/Grid2'
import { useNavigate } from 'react-router-dom'
import { baseColor } from '../Constant/Constant'
import AirlinesIcon from '@mui/icons-material/Airlines';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ToastContainer } from 'react-toastify'

const DefaultPageLayout = ({ label, children }) => {
    const navigate = useNavigate()
    return (
        <Box className="flex flex-col border-2 m-2 rounded-xl p-1 pb-2 overflow-scroll w-full" sx={{ backgroundColor: 'white' }} >
            <ToastContainer />
            <Box className="flex flex-row items-center" >
                <AirlinesIcon fontSize='medium' className='text-[#5b6b79]' />
                <Typography level='title-md' textAlign='left' textColor='neutral.900' sx={{ p: 0.5, opacity: 0.4, flexGrow: 1 }} >{label}</Typography>
                <Box onClick={() => navigate('/Home/Dashboard')} ><HomeIcon sx={{ mr: 1 }} className='text-[#5b6b79] cursor-pointer' /></Box>
                <Box onClick={() => navigate(-1)} ><ExitToAppIcon sx={{ rotate: '180deg', mr: 1 }} className='text-[#5b6b79] cursor-pointer' /></Box>
            </Box>
            <Divider sx={{ m: 0, mb: 0.5, backgroundColor: baseColor.primarylight }} />
            {children}
        </Box>
    )
}

export default memo(DefaultPageLayout) 