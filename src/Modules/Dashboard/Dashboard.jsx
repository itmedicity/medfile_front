import { Box, Button, Divider, Input, Sheet, Typography, styled } from '@mui/joy'
import Grid from '@mui/material/Grid2';
import React, { memo, useMemo } from 'react'
import { baseColor, screenHeight } from '../../Constant/Constant'
import fileIcon1 from '../../assets/Project.gif'
import ScreenCheck from '../../Components/ScreenCheck'
import AutocompletedMainSearch from '../../Components/AutocompletedMainSearch'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import { Virtuoso } from 'react-virtuoso'
import AssuredWorkloadRoundedIcon from '@mui/icons-material/AssuredWorkloadRounded';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';

import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
// const Item = styled(Sheet)(({ theme }) => ({
//     backgroundColor: '#fff',
//     ...theme.typography['body-sm'],
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     borderRadius: 4,
//     color: theme.vars.palette.text.secondary,
//     ...theme.applyStyles('dark', {
//         backgroundColor: theme.palette.background.level1,
//     }),
// }));

const Dashboard = () => {

    const users = [
        { id: '1-2024', iconStat: true, docNo: 56859526, trstIcon: false, docHead: 'Fire ( NOC )', docCat: 'Building', docSub: 'Builing' },
        { id: '2-2024', iconStat: false, docNo: 56859525, trstIcon: true, docHead: 'Building Occupancy / Completion Certificate/Building permit of Hospital and Other Institution', docCat: 'Builing', docSub: 'Builing' },
        { id: '3-2024', iconStat: true, docNo: 56859524, trstIcon: false, docHead: 'Employee Provident Fund', docCat: 'Spirit and Petroleum products', docSub: 'Builing' },
        { id: '4-2024', iconStat: false, docNo: 56859523, trstIcon: true, docHead: 'Sanction/ License for Lifts and escalators', docCat: 'POLLUTION', docSub: 'Blood Bank' },
        { id: '5-2024', iconStat: true, docNo: 56859522, trstIcon: false, docHead: 'License to Store Compressed Gas from the Petroleum and Explosives Safety Organization (PESO', docCat: 'MEDICAL GAS', docSub: 'ORGAN TRANSPLANT' },
        { id: '6-2024', iconStat: false, docNo: 56859521, trstIcon: true, docHead: 'License for Diesel Storage', docCat: 'Blood Bank', docSub: 'RADIOLOGY ' },
        { id: '2-2024', iconStat: false, docNo: 56859525, trstIcon: true, docHead: 'Building Occupancy / Completion Certificate/Building permit of Hospital and Other Institution', docCat: 'Builing', docSub: 'Builing' },
        { id: '3-2024', iconStat: true, docNo: 56859524, trstIcon: false, docHead: 'Employee Provident Fund', docCat: 'Spirit and Petroleum products', docSub: 'Builing' },
        { id: '4-2024', iconStat: false, docNo: 56859523, trstIcon: true, docHead: 'Sanction/ License for Lifts and escalators', docCat: 'POLLUTION', docSub: 'Blood Bank' },
        { id: '6-2024', iconStat: false, docNo: 56859521, trstIcon: true, docHead: 'License for Diesel Storage', docCat: 'Blood Bank', docSub: 'RADIOLOGY ' },
        { id: '2-2024', iconStat: false, docNo: 56859525, trstIcon: true, docHead: 'Building Occupancy / Completion Certificate/Building permit of Hospital and Other Institution', docCat: 'Builing', docSub: 'Builing' },
        { id: '3-2024', iconStat: true, docNo: 56859524, trstIcon: false, docHead: 'Employee Provident Fund', docCat: 'Spirit and Petroleum products', docSub: 'Builing' },
    ]

    const a = [
        { id: 18, name: 'Quilon Medical Trust', bgColor: '#fc930a' },
        { id: 200, name: 'Royal Medical Trust', bgColor: '#de2567' },
        { id: 500, name: 'Quilon Super Speciality Hospital and Institute PVT LTD', bgColor: '#4ba64f' },
        { id: 1000, name: 'Travancore Medicity Foundation For Organ Transplantation', bgColor: '#0ab3c7' },
    ]

    return (
        <Box className="flex flex-col border-2 m-2 rounded-xl p-2 pb-5 overflow-scroll w-full" >
            <Typography level='h2' textAlign='center' sx={{ p: 1 }} >Mediwalt</Typography>
            <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                {a.map((val, idx) => (
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3, xl: 3 }}>
                        <Box
                            key={idx}
                            className="flex flex-1 border-2 rounded-md p-1 flex-col overflow-y-hidden"
                            sx={{
                                bgcolor: '#ffffff',
                                color: '#55606e',
                                height: { xs: 150, sm: 150, md: 150, lg: 120, xl: 145 },
                                width: '100%'
                            }}
                        >
                            <Box className='flex' sx={{ height: 115 }} >
                                <Box
                                    className="flex  w-[34%] items-center justify-center text-5xl rounded-3xl drop-shadow-xl"
                                    sx={{ bgcolor: val.bgColor, marginTop: '-25px', float: 'left', marginBottom: 0.5, opacity: 0.8 }} >
                                    <AssuredWorkloadRoundedIcon fontSize='large' sx={{ mt: 2, color: 'white' }} />
                                </Box>
                                <Box className="flex flex-col flex-1 justify-center text-end pr-2" >
                                    <Box className='font-extralight' >
                                        {val.name}
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ height: 35, textAlign: 'end' }} >
                                <Divider />
                                <Box className="font-normal text-xl text-opacity-100 pr-4">{val.id}</Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Box className="flex mt-12 justify-center" >
                {/* <AutocompletedMainSearch /> */}
                <Input
                    startDecorator={<SearchOutlinedIcon />}
                    endDecorator={<Button startDecorator={<ContentPasteSearchOutlinedIcon />} >Search</Button>}
                    sx={{
                        width: { xs: '90%', sm: '80%', md: '60%', lg: '50%', xl: '40%' },
                        "--Input-radius": "40px",
                        "--Input-gap": "10px",
                        "--Input-placeholderOpacity": 1,
                        "--Input-focusedThickness": "1.5px",
                        "--Input-minHeight": "53px",
                        "--Input-paddingInline": "27px",
                        "--Input-decoratorChildHeight": "42px",
                        "&.MuiInput-root": {
                            "--Input-focusedHighlight": baseColor.primarylight,
                        }
                    }}
                />
            </Box>
            <Box
                className="flex justify-center items-center rounded"
                sx={{
                    height: 700, // Set explicit height for the Box
                    width: '100%',
                    mt: 1,
                    padding: '0.1em',
                    border: '1px solid #ccc',
                }}
            >
                <Virtuoso
                    style={{ height: '100%', width: '100%' }}
                    className="border-2 rounded-md"
                    data={users}
                    itemContent={(_, user) => (
                        <Box className="flex flex-1 h-14 flex-col overflow-y-hidden " >
                            <Box className='flex flex-auto items-center'>
                                <Box className="flex w-16 h-full justify-center items-center" >
                                    {
                                        user.iconStat ? <LockOpenOutlinedIcon fontSize='large' /> : <HttpsOutlinedIcon fontSize='large' />
                                    }
                                </Box>
                                <Box className="flex w-40 justify-center items-center px-2" >
                                    <Typography level='body-xs' fontWeight={500} variant='solid' color='neutral' textAlign={'center'} className="w-full" sx={{ borderRadius: 10 }} >{user.id}</Typography>
                                </Box>
                                <Box className="flex w-40 h-full justify-center items-center">
                                    <Typography level='body-md'>{user.docNo}</Typography>
                                </Box>
                                <Box className="flex w-16 h-full justify-center items-center" >
                                    {user.trstIcon ? <AccountBalanceOutlinedIcon fontSize='large' /> : <ApartmentOutlinedIcon fontSize='large' />}
                                </Box>
                                <Box className="flex flex-1 h-full flex-col" >
                                    <Typography level='body-md' sx={{ textTransform: 'capitalize' }}>{user.docHead.toLocaleLowerCase()}</Typography>
                                    <Typography level='body-sm' sx={{ textTransform: 'capitalize' }}>{user.docCat.toLocaleLowerCase()}</Typography>
                                </Box>
                                <Box className="flex w-16 h-full justify-center items-center" >
                                    <PanoramaOutlinedIcon fontSize='large' />
                                </Box>
                                <Box className="flex w-16 h-full justify-center items-center" >
                                    <EditCalendarOutlinedIcon fontSize='large' />
                                </Box>
                                <Box className="flex w-16 h-full justify-center items-center" >
                                    <LocalPrintshopOutlinedIcon fontSize='large' />
                                </Box>
                            </Box>
                            <Divider sx={{}} />
                        </Box>
                    )}
                />
            </Box>
        </Box>
    )
}

export default memo(Dashboard)