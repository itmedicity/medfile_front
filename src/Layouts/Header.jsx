import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { memo } from 'react';
import { baseColor } from '../Constant/Constant';
import LogoutMoidal from './LogoutMoidal';
import forward from '../assets/Forward.gif'
import backward from '../assets/Back.gif'
import ScreenCheck from '../Components/ScreenCheck';

const Header = ({ toggleDrawer, drawerWidth }) => {

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
                    {
                        drawerWidth !== 60 ? <img src={backward} alt="backward" height={30} width={32} /> : <img src={forward} alt="backward" height={25} width={25} />
                    }
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: baseColor.backGroundFont }}>
                    <ScreenCheck />
                </Typography>

                {/* <Avatar
                    variant="solid"
                    size="md"
                    src={person}
                    alt='person'
                    sx={{ bgcolor: baseColor.primarylight, cursor: 'pointer' }}
                    onClick={() => alert('hai')}
                /> */}
                <LogoutMoidal />
            </Toolbar>
        </AppBar>
        // </Box>
    )
}

export default memo(Header)