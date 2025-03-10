import { Box, Typography } from '@mui/joy'
import Grid from '@mui/material/Grid2'
import React from 'react'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import DefaultPageLayout from '../../Components/DefaultPageLayout'
import { userWiseSettingsRights } from '../../api/commonAPI'
import { useQuery } from '@tanstack/react-query'

const Settings = () => {

    const navigation = useNavigate()

    const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authType)

    const { data: userSettings } = useQuery({
        queryKey: ['getuserSettings', loggedUser],
        queryFn: () => userWiseSettingsRights(loggedUser),
        enabled: !!loggedUser,
    });

    const menuName = [
        { menuSlno: 1, menuName: 'User Management', menuCodeName: 'UserManagement' },
        { menuSlno: 2, menuName: 'Document Type Master', menuCodeName: 'DocTypeMaster' },
        { menuSlno: 3, menuName: 'Sub Type', menuCodeName: 'SubTypeMaster' },
        { menuSlno: 4, menuName: 'Document Category', menuCodeName: 'DocCategory' },
        { menuSlno: 5, menuName: 'Document Sub Category', menuCodeName: 'DocSubCategory' },
        { menuSlno: 6, menuName: 'Document Group', menuCodeName: 'DocGroup' },
        { menuSlno: 7, menuName: 'Institute Type', menuCodeName: 'InstituteTypeMaster' },
        { menuSlno: 8, menuName: 'Institution Master', menuCodeName: 'InstitutionMaster' },
        { menuSlno: 7, menuName: 'Course Type', menuCodeName: 'CourseType' },
        { menuSlno: 8, menuName: 'Course Name Master', menuCodeName: 'CourseMaster' },
        { menuSlno: 9, menuName: 'Rack Master', menuCodeName: 'RackMaster' },
        { menuSlno: 10, menuName: 'Location Master', menuCodeName: 'LocationMaster' },
        { menuSlno: 11, menuName: 'Custodian Master', menuCodeName: 'CustodianMaster' },
        { menuSlno: 13, menuName: 'Custodian Department', menuCodeName: 'CustodianDepartment' },
        { menuSlno: 12, menuName: 'user Type Master', menuCodeName: 'UserTypeMaster' },
        { menuSlno: 16, menuName: 'Module Name Master', menuCodeName: 'ModuleNameMaster' },
        { menuSlno: 14, menuName: 'Module Group Master', menuCodeName: 'ModuleGroupMaster' },
        { menuSlno: 15, menuName: 'Menu Name Master', menuCodeName: 'MenuNameMaster' },
        { menuSlno: 18, menuName: 'User Group Rights', menuCodeName: 'UserGroupRights' },
    ]

    const employeemenu = menuName?.filter(menu =>
        userSettings?.some(item => item.menu_slno === menu.menuSlno)
    );
    return (
        <DefaultPageLayout label='Master Settings' >
            <Grid container spacing={1} sx={{ flexGrow: 0, px: 1 }}>
                {
                    employeemenu?.map((val, idx) => (
                        <Grid
                            size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 3 }}
                            key={idx} onClick={() => navigation(`/Home/${val.menuCodeName}`)} >
                            <Box
                                className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer hover:bg-slate-200" >
                                <Typography level='body-sm' fontWeight={'md'} sx={{ fontFamily: 'var(--font-varient)', color: 'rgba(var(--font-primary-white))' }} >
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