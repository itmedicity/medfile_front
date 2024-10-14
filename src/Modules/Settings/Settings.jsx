import { Box, Divider, Typography } from '@mui/joy'
import Grid from '@mui/material/Grid2'
import React from 'react'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseColor } from '../../Constant/Constant'
import DefaultPageLayout from '../../Components/DefaultPageLayout'

const Settings = () => {

    const navigation = useNavigate()

    const menuName = [
        { menuSlno: 100, menuName: 'User Management', menuCodeName: 'UserManagement' },
        { menuSlno: 200, menuName: 'Document Type Master', menuCodeName: 'DocTypeMaster' },
        { menuSlno: 300, menuName: 'Sub Type', menuCodeName: 'SubTypeMaster' },
        { menuSlno: 400, menuName: 'Document Category', menuCodeName: 'DocCategory' },
        { menuSlno: 500, menuName: 'Document Sub Category', menuCodeName: 'DocSubCategory' },
        { menuSlno: 600, menuName: 'Document Group', menuCodeName: 'DocGroup' },
        { menuSlno: 700, menuName: 'Institute Type', menuCodeName: 'InstituteTypeMaster' },
        { menuSlno: 800, menuName: 'Institution Master', menuCodeName: 'InstitutionMaster' },
        { menuSlno: 700, menuName: 'Course Type', menuCodeName: 'CourseType' },
        { menuSlno: 800, menuName: 'Course Name Master', menuCodeName: 'CourseMaster' },
    ]

    return (
        <DefaultPageLayout label='Master Settings' >
            <Grid container spacing={1} sx={{ flexGrow: 0, px: 1 }}>
                {
                    menuName?.map((val, idx) => (
                        <Grid
                            size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 3 }}
                            key={idx} onClick={() => navigation(`/Home/${val.menuCodeName}`)} >
                            <Box className="border-b-[0.2rem] border-gray-400 p-0 cursor-pointer hover:bg-slate-200 hover: " >
                                <Typography level='body-sm' fontWeight={'md'} >
                                    {val.menuName}
                                </Typography>
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>
        </DefaultPageLayout>
    )
}

export default memo(Settings)