import { Box, Typography } from '@mui/joy'
import Grid from '@mui/material/Grid2'
import React from 'react'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import DefaultPageLayout from '../../Components/DefaultPageLayout'
import { userWiseSettingsRights } from '../../api/commonAPI'
import { useQuery } from '@tanstack/react-query'

const AuditReportMain = () => {

    const navigation = useNavigate()

    const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authType)

    const { data: userSettings } = useQuery({
        queryKey: ['getuserSettings', loggedUser],
        queryFn: () => userWiseSettingsRights(loggedUser),
        enabled: !!loggedUser,
    });

    const menuName = [
        { menuSlno: 26, menuName: 'Doc Master Audit Report', menuCodeName: 'DocMastAuditReport' },
        { menuSlno: 27, menuName: 'Doc Detail Audit Report', menuCodeName: 'DocDetlAuditReport' },
        { menuSlno: 28, menuName: 'User Audit Report', menuCodeName: 'UserAuditReport' },
        { menuSlno: 29, menuName: 'Doc Type Audit Report', menuCodeName: 'DocTypeAuditReport' },
        //     { menuSlno: 30, menuName: 'Doc Sub Type Audit Report', menuCodeName: 'DocSubTypeReport' },
        //     { menuSlno: 31, menuName: 'Doc Category Audit Report', menuCodeName: 'DocCategoryReport' },
        //     { menuSlno: 32, menuName: 'Doc Sub Category  Report', menuCodeName: 'DocSubCategoryReport' },
        //     { menuSlno: 33, menuName: 'Doc Nested Category Report', menuCodeName: 'DocNestedCategoryReport' },
    ]
    const employeemenu = menuName?.filter(menu =>
        userSettings?.some(item => item.menu_slno === menu.menuSlno)
    );

    return (
        <DefaultPageLayout label='Audit Reports' >
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

export default memo(AuditReportMain)



