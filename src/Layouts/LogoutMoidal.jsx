import React, { useCallback } from 'react'
import { memo } from 'react'
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import { Avatar, Box, Divider, Typography } from '@mui/joy';
import { baseColor } from '../Constant/Constant';
import person from '../assets/Individual.gif'
import settings from '../assets/setting.gif'
import exit from '../assets/exit.gif'
import { useNavigate } from 'react-router-dom';


const LogoutMoidal = () => {

    const navigate = useNavigate()
    const handleLogout = useCallback(() => {
        localStorage.removeItem('app_auth')
        navigate('/')
    }, [])

    return (
        <Dropdown >
            <MenuButton
                slots={{ root: Avatar, }}
                slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
            >
                {/* <MoreVert /> */}
                <Avatar
                    variant="solid"
                    size="md"
                    src={person}
                    alt='person'
                    sx={{ bgcolor: baseColor.primarylight, cursor: 'pointer' }}
                />
            </MenuButton>

            <Menu
                placement="bottom-start"
                sx={{
                    width: 300,
                    boxShadow: 'lg',
                    borderRadius: 'xl',
                }}
            >
                <MenuItem
                    sx={{
                        mt: 1,
                        py: 1,
                        pb: 2
                    }}
                >
                    <Box className="flex items-center gap-2"  >
                        <Avatar className="drop-shadow-lg" alt='avatar' size='lg' sx={{ bgcolor: baseColor.secondarylight, border: 1, borderColor: baseColor.backGroundFont }} src={person} />
                        <Box>
                            <Typography level='body-md' noWrap sx={{ width: 300 }} >Name Of Person</Typography>
                            <Typography level='body-xs' >Manager IT</Typography>
                        </Box>
                    </Box>
                </MenuItem>
                <Divider sx={{ mx: 1 }} />
                <MenuItem sx={{ py: 0.5 }}>
                    <ListItemDecorator  >
                        <Box component={'img'} src={settings} alt='settings' sx={{ width: 30, height: 30 }} />
                    </ListItemDecorator>
                    Settings
                </MenuItem>
                <Divider sx={{ mx: 1 }} />
                <MenuItem onClick={handleLogout}  >
                    <ListItemDecorator sx={{ color: 'inherit' }}>
                        <Box component={'img'} src={exit} alt='settings' sx={{ width: 30, height: 30 }} />
                    </ListItemDecorator>{' '}
                    Sign Out
                </MenuItem>
            </Menu>
        </Dropdown>
    )
}

export default memo(LogoutMoidal)