import * as React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import { useState } from 'react';

const DrawerWindow = ({ open, toggleDrawer }) => {
    // const [open, setOpen] = useState(true);

    // const toggleDrawer = (inOpen) => (event) => {
    //     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //         return;
    //     }
    //     setOpen(inOpen);
    // };


    return (
        <Drawer
            size="sm"
            open={open}
            onClose={toggleDrawer(false)}
        >
            {/* {list(size)} */}
            <div>sfsdfsdf</div>
        </Drawer>
    )
}

export default DrawerWindow