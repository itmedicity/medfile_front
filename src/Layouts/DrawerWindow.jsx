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

const DrawerWindow = ({ drawerWidth }) => {

    const listComp = ({ icon, title }) => {
        return (
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
                >
                    <ListItemDecorator >
                        <Tooltip placement='right'
                            title={drawerWidth === 60 ? 'Dashboard' : null} color='success' size="lg" arrow
                            sx={{ bgcolor: baseColor.primarylight, px: 5 }} >
                            <DashboardIcon sx={{ color: 'white' }} fontSize={drawerWidth === 60 ? 'large' : 'small'} />
                        </Tooltip>
                    </ListItemDecorator>
                    <Typography
                        sx={{ px: drawerWidth === 60 ? 1 : 0 }}
                        level={drawerWidth === 60 ? 'inherit' : 'body-md'}
                    >Dashboard</Typography>
                </ListItemButton>
            </ListItem>
        )
    }



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
                overflow: 'auto',
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
                            // alignItems: 'end'
                        }}
                    >
                        <ListItemDecorator >
                            <Tooltip placement='right'
                                title={drawerWidth === 60 ? 'Dashboard' : null} color='success' size="lg" arrow
                                sx={{ bgcolor: baseColor.primarylight, px: 5 }} >
                                <DashboardIcon sx={{ color: baseColor.primaryfont }} fontSize={drawerWidth === 60 ? 'large' : 'small'} />
                            </Tooltip>
                        </ListItemDecorator>
                        <Typography
                            sx={{ px: drawerWidth === 60 ? 1 : 0 }}
                            level={drawerWidth === 60 ? 'inherit' : 'body-md'}
                        >Dashboard</Typography>
                    </ListItemButton>
                </ListItem>


            </List>
        </Paper>

    )
}

export default DrawerWindow