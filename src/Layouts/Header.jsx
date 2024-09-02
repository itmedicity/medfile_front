import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { memo } from 'react';
import { baseColor } from '../Constant/Constant';
import backward from '../assets/wired.gif'
import homegif from '../assets/home.gif'
import person from '../assets/Individual.gif'
import Avatar from '@mui/joy/Avatar';

const Header = ({ toggleDrawer }) => {

    return (
        // <Box sx={{ flexGrow: 1 }}>
        <AppBar
            position="static"
            elevation={1}
            sx={{ backgroundColor: baseColor.secondarylight }}
        >
            <Toolbar
                variant='dense'
            >
                <IconButton
                    size="large"
                    edge="start"
                    // color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, p: 1, color: baseColor.backGroundFont }}
                    onClick={toggleDrawer}
                >
                    {/* <MenuIcon /> */}
                    <img src={homegif} alt="backward" height={25} width={25} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: baseColor.backGroundFont }}>
                    News
                </Typography>
                <Avatar size="md" src={person} alt='person' sx={{ bgcolor: baseColor.primarylight }} />
            </Toolbar>
        </AppBar>
        // </Box>
    )
}

export default memo(Header)