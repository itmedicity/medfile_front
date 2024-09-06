import { Box, Button, Divider, Input, Typography } from '@mui/joy'
import React, { memo, useMemo } from 'react'
import { baseColor } from '../../Constant/Constant'
import fileIcon1 from '../../assets/Project.gif'
import ScreenCheck from '../../Components/ScreenCheck'
import AutocompletedMainSearch from '../../Components/AutocompletedMainSearch'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import { Virtuoso } from 'react-virtuoso'

const Dashboard = () => {

    const users = useMemo(() => {
        return Array.from({ length: 200 }, (_, index) => ({
            name: `User ${index}`,
            bgColor: `hsl(${Math.random() * 360}, 70%, 80%)`,
            size: Math.floor(Math.random() * 40) + 100,
            description: `Description for user ${index}`
        }))
    }, [])

    const a = [
        { id: 18, name: 'Quilon Medical Trust' },
        { id: 200, name: 'Royal Medical Trust' },
        { id: 500, name: 'Quilon Super Speciality Hospital and Institute PVT LTD' },
        { id: 1000, name: 'Travancore Medicity Foundation For Organ Transplantation' },
    ]

    return (
        <Box className="flex flex-grow flex-col border-2 m-2 rounded-xl p-5 py-5 overflow-scroll"  >
            <Typography level='h1' textAlign='center' sx={{ p: 2 }} >Mediwalt</Typography>
            <Box className="flex  justify-center items-center gap-2 flex-wrap flex-col sm:flex-col xl:flex-row md:flex-col" >
                {a.map((val, idx) => (
                    <Box
                        key={idx}
                        className="flex flex-1 border-2 rounded-md p-1 flex-col overflow-y-hidden"
                        sx={{
                            // borderColor: baseColor.secondary,
                            bgcolor: '#ffffff',
                            color: '#55606e',
                            height: 150,
                            width: '100%'
                        }}
                    >
                        <Box className='flex flex-1' sx={{ height: 115 }} >
                            <Box
                                className="flex w-[30%] items-center justify-center text-5xl bg-green-400 rounded-3xl z-20 drop-shadow-xl"
                                sx={{ color: baseColor.primaryfont, marginTop: '-20px', float: 'left', marginBottom: 0.5 }} >
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
                ))}

            </Box>
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
            <Box className="flex flex-1 border-2 rounded-md mt-4 p-0 pb-4  overflow-scroll" >
                <Virtuoso
                    style={{ overflow: 'hidden' }}
                    className='flex flex-1 border-2 rounded-md m-2'
                    data={users}
                    itemContent={(_, user) => (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                                backgroundColor: 'green',
                                // padding: '0.5rem',
                                height: `${user.size}px`
                            }}
                        >
                            <p><strong>{user.name}</strong></p>
                            <div>{user.description}</div>
                        </div>
                    )}
                />
            </Box>
        </Box>
    )
}

export default memo(Dashboard)