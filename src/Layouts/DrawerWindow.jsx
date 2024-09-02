import { Box } from '@mui/joy'
import React from 'react'
import { baseColor } from '../Constant/Constant'
import { Divider, Paper, Toolbar } from '@mui/material'
import largeLogo from '../assets/medivault04.png'
import Research from '../assets/Research.gif'

const DrawerWindow = ({ drawerWidth }) => {
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
            asdasd
        </Paper>

    )
}

export default DrawerWindow