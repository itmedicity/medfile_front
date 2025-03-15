import React from 'react'
import { memo } from 'react'
import { Box, Divider, Typography } from '@mui/joy'
import { ToastContainer } from 'react-toastify'
import { HomeSimple, LogOut, ReportColumns } from 'iconoir-react'

const CategoryBasedDashboard = ({ label, children, SetView }) => {
    return (
        <Box className="m-1 h-dvh overscroll-none" sx={{ backgroundColor: 'rgba(var(--bg-common))', borderColor: 'rgba(var(--border-primary))' }} >
            <Box className="flex flex-col m-0 rounded-xl p-1 pb-2 overflow-scroll w-full"
                sx={{ backgroundColor: 'rgba(var(--bg-card))', border: 1, borderColor: 'rgba(var(--border-primary))' }} >
                <ToastContainer />
                <Box className="flex flex-row items-center" >
                    <ReportColumns fontSize='medium' className='text-iconprimary ml-2' />
                    <Typography level='title-md' textAlign='left'
                        sx={{ p: 0.5, flexGrow: 1, color: 'rgba(var(--font-primary-white))', fontFamily: 'var(--font-varient)' }} >{label}</Typography>
                    <Box onClick={() => SetView(0)} >
                        <HomeSimple className='text-iconprimary cursor-pointer mr-1' /></Box>
                    <Box onClick={() => SetView(0)} >
                        <LogOut className='text-iconprimary cursor-pointer mr-3' /></Box>
                </Box>
                <Divider sx={{ m: 0, mb: 0.5, backgroundColor: 'rgba(var(--border-primary))' }} />
                {children}
            </Box>
        </Box>
    )
}

export default memo(CategoryBasedDashboard) 
