import { Box, Tooltip, Typography } from '@mui/joy'
import React from 'react'
import { baseColor } from '../Constant/Constant'
import { Divider, Paper, Toolbar } from '@mui/material'
import largeLogo from '../assets/medivault04.png'
import Research from '../assets/Research.gif'

import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Home from '@mui/icons-material/Home';
import Apps from '@mui/icons-material/Apps';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DashboardCustomizeSharpIcon from '@mui/icons-material/DashboardCustomizeSharp';
import FindInPageSharpIcon from '@mui/icons-material/FindInPageSharp';
import UploadFileSharpIcon from '@mui/icons-material/UploadFileSharp';
import SettingsSuggestSharpIcon from '@mui/icons-material/SettingsSuggestSharp';
import { useNavigate } from 'react-router-dom'

const DrawerWindow = ({ drawerWidth }) => {

    const navigation = useNavigate()

    return (
        <Paper
            square
            sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: baseColor.secondary,
                flexBasis: drawerWidth,
                boxShadow: 5,
                outlineColor: baseColor.primarylight,
                position: 'relative',
                height: '100%',
                // overflow: 'auto',
                transition: 'all 0.2s ease-in-out',
            }}
        >
            <Toolbar variant='dense' sx={{ bgcolor: baseColor.secondary, }} >
                {
                    drawerWidth === 60 ?
                        null :
                        <Box sx={{ transition: 'all 0.2s ease-in-out', height: 70 }} component={'img'} src={largeLogo} alt='MediVault' />
                }
            </Toolbar>
            <Divider sx={{ bgcolor: baseColor.primarylight }} />
            {/* List Start */}
            <List>

                <ListItem>
                    <ListItemButton
                        sx={{
                            display: 'flex',
                            '&.MuiListItemButton-root': {
                                bgcolor: 'transparent',
                                color: baseColor.primaryfont,
                                '&:hover': {
                                    bgcolor: baseColor.primarylight,
                                    color: baseColor.primaryfont
                                }
                            },
                        }}
                        onClick={() => navigation('/Home/Dashboard')}
                    >
                        <ListItemDecorator >
                            <Tooltip placement='right-end'
                                title={drawerWidth === 60 ? 'Dashboard' : null} color='success' size="lg"
                                sx={{ bgcolor: baseColor.primarylight, px: 6 }} >
                                <DashboardCustomizeSharpIcon sx={{ color: 'white', transition: 'all 0.5s ease-in-out' }} fontSize={drawerWidth === 60 ? 'large' : 'small'} />
                            </Tooltip>
                        </ListItemDecorator>
                        <Typography
                            sx={{
                                display: drawerWidth === 60 ? 'none' : 'flex',
                                px: drawerWidth === 60 ? 1 : 0, color: 'white'
                            }}
                            noWrap
                            level={drawerWidth === 60 ? 'inherit' : 'body-md'}
                        >Dashboard</Typography>
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton
                        sx={{
                            display: 'flex',
                            '&.MuiListItemButton-root': {
                                bgcolor: 'transparent',
                                color: baseColor.primaryfont,
                                '&:hover': {
                                    bgcolor: baseColor.primarylight,
                                    color: baseColor.primaryfont
                                }
                            },
                            // alignItems: 'end',
                        }}
                        onClick={() => navigation('/Home/FileUpload')}
                    >
                        <ListItemDecorator >
                            <Tooltip placement='right'
                                title={drawerWidth === 60 ? ' File Upload' : null} color='success' size="lg"
                                sx={{ bgcolor: baseColor.primarylight, px: 6 }} >
                                <UploadFileSharpIcon sx={{ color: 'white', transition: 'all 0.5s ease-in-out' }} fontSize={drawerWidth === 60 ? 'large' : 'small'} />
                            </Tooltip>
                        </ListItemDecorator>
                        <Typography
                            sx={{
                                display: drawerWidth === 60 ? 'none' : 'flex',
                                px: drawerWidth === 60 ? 1 : 0, color: 'white',
                            }}
                            noWrap
                            level={drawerWidth === 60 ? 'inherit' : 'body-md'}
                        >File Upload</Typography>
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton
                        sx={{
                            display: 'flex',
                            '&.MuiListItemButton-root': {
                                bgcolor: 'transparent',
                                color: baseColor.primaryfont,
                                '&:hover': {
                                    bgcolor: baseColor.primarylight,
                                    color: baseColor.primaryfont
                                }
                            },
                        }}
                        onClick={() => navigation('/Home/AdvancedSearch')}
                    >
                        <ListItemDecorator >
                            <Tooltip placement='right'
                                title={drawerWidth === 60 ? ' Search' : null} color='success' size="lg"
                                sx={{ bgcolor: baseColor.primarylight, px: 6 }} >
                                <FindInPageSharpIcon sx={{ color: 'white', transition: 'all 0.5s ease-in-out' }} fontSize={drawerWidth === 60 ? 'large' : 'small'} />
                            </Tooltip>
                        </ListItemDecorator>
                        <Typography
                            sx={{
                                display: drawerWidth === 60 ? 'none' : 'flex',
                                px: drawerWidth === 60 ? 1 : 0, color: 'white'
                            }}
                            noWrap
                            level={drawerWidth === 60 ? 'inherit' : 'body-md'}
                        >Search</Typography>
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton
                        sx={{
                            display: 'flex',
                            '&.MuiListItemButton-root': {
                                bgcolor: 'transparent',
                                color: baseColor.primaryfont,
                                '&:hover': {
                                    bgcolor: baseColor.primarylight,
                                    color: baseColor.primaryfont
                                }
                            },
                        }}
                        onClick={() => navigation('/Home/Settings')}
                    >
                        <ListItemDecorator >
                            <Tooltip placement='right'
                                title={drawerWidth === 60 ? 'Settings' : null} color='success' size="lg"
                                sx={{ bgcolor: baseColor.primarylight, px: 6 }} >
                                <SettingsSuggestSharpIcon sx={{ color: 'white', transition: 'all 0.5s ease-in-out' }} fontSize={drawerWidth === 60 ? 'large' : 'small'} />
                            </Tooltip>
                        </ListItemDecorator>
                        <Typography
                            sx={{
                                display: drawerWidth === 60 ? 'none' : 'flex',
                                px: drawerWidth === 60 ? 1 : 0, color: 'white'
                            }}
                            noWrap
                            level={drawerWidth === 60 ? 'inherit' : 'body-md'}
                        >Settings</Typography>
                    </ListItemButton>
                </ListItem>

            </List>
        </Paper>

    )
}

export default DrawerWindow