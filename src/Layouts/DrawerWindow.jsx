// @ts-nocheck
import { ListSubheader } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { HomeAltSlimHoriz, NavArrowRight, PageSearch, PrivacyPolicy, Settings, ShieldUpload } from 'iconoir-react';
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserModules } from '../api/commonAPI';

const DrawerWindow = memo(({ drawerWidth, handleDrawerClose }) => {

    const navigation = useNavigate()

    const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authType)

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [arr, setarr] = useState([]);

    const handleListItemClick = useCallback((event, index, route) => {
        setSelectedIndex(index);
        navigation(route);
    }, []);

    // const id = EmpauthId();
    const { data: allmoduleitem } = useQuery({
        queryKey: ['getallmoduleitem', loggedUser],
        queryFn: () => getUserModules(loggedUser),
        enabled: !!loggedUser,
    });

    const drawerMenu = useMemo(() => {
        return [
            { module_slno: 1, menu: "Dashboard", text: "/Home/Dashboard", icon: <HomeAltSlimHoriz height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { module_slno: 2, menu: "File Upload", text: "/Home/FileUpload", icon: <ShieldUpload height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { module_slno: 3, menu: "Doc Approval", text: "/Home/FileSearch", icon: <PrivacyPolicy height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { module_slno: 4, menu: "Advance Search", text: "/Home/AdvancedSearch", icon: <PageSearch height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { module_slno: 5, menu: "Settings", text: "/Home/Settings", icon: <Settings height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
        ]
    }, [])

    const module_slno = allmoduleitem?.[0]?.module_slno;
    const allmoduleArray = module_slno
        ? Object.entries(module_slno).map(([menu, status]) => ({
            menu,
            status,
        }))
        : [];

    useEffect(() => {
        let array = drawerMenu?.filter((value) => {
            return allmoduleArray?.find((val) => {
                return value.menu === val.menu;
            })
        });
        setarr(array)
    }, [drawerMenu, allmoduleitem])

    const drawer = useMemo(() => (
        <div>
            <Toolbar variant="dense" />
            <Divider />
            <List
                subheader={
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{
                            fontFamily: "var(--font-varient)",
                            fontWeight: 600,
                            bgcolor: "rgba(var(--drawer-bg-color))",
                            color: "rgba(var(--drawer-font-color))",
                        }}
                    >
                        Menu Selections
                    </ListSubheader>
                }
            >
                {arr?.map((val, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "flex", }}
                        secondaryAction={
                            <NavArrowRight height={20} width={20} color="rgba(var(--drawer-font-color))" className={selectedIndex === index ? "bouncing-element" : ''} />
                        }
                    >
                        <ListItemButton
                            selected={selectedIndex === index ? true : false}
                            onClick={(e) => handleListItemClick(e, index, val.text)}
                            sx={{
                                display: "flex",
                                mx: 0,
                                px: 0,
                                borderRadius: 0,
                                my: 0.1,
                                height: 35,
                                alignItems: "center",
                                transition: "transform 0.3s ease, color 0.3s ease",
                                transform: "translateX(0)",
                                '&.Mui-selected': {
                                    bgcolor: "rgba(var(--drawer-btn-bg-color))",
                                    ':hover': {
                                        bgcolor: "rgba(var(--drawer-btn-bg-color))",
                                    }
                                },
                                ":hover": {
                                    bgcolor: "rgba(var(--drawer-btn-bg-color))",
                                    "& .hoverClass": {
                                        transform: "translateX(2px)",
                                        color: "rgba(var(--drawer-font-color))",
                                    },
                                    "& .marqueeSpan": {
                                        animation: "marquee 5s linear infinite", // Start the marquee animation on hover
                                    },
                                },
                            }}
                        >
                            <ListItemIcon
                                className="hoverClass"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    color: "rgba(var(--font-secondary-white))",
                                    transition: "transform 0.3s ease",
                                    transform: "translateX(0)",
                                }}
                            >
                                {val.icon}
                            </ListItemIcon>

                            <span
                                className="marqueeSpan"
                                style={{
                                    display: "inline-block",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                }}
                            >
                                <Typography
                                    noWrap
                                    className="hoverClass text-fontsecondarywhite "
                                    sx={{
                                        display: "flex",
                                        fontFamily: "var(--font-varient)",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        transition: "transform 10s ease",
                                        transform: "translateX(0)",
                                    }}
                                >
                                    {val.menu}
                                </Typography>
                            </span>


                            {val.menu.length > 16 ? <style>
                                {`
      @keyframes marquee {
        100% { transform: translateX(100%); }
        20% { transform: translateX(0%); }
      }
    `}
                            </style>
                                :

                                null
                            }
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    ), [selectedIndex, arr, handleListItemClick])

    return (
        <Box
            component="nav"
            sx={{
                width: { sm: drawerWidth },
                transition: "width 0.5s",
                // flexShrink: { sm: 0 }
            }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="permanent"
                sx={{
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        transition: "width 0.5s",
                        backgroundColor: "rgba(var(--bg-drawer))",
                    },
                }}
                onClose={handleDrawerClose}
            // open={mobileOpen}
            >
                {drawer}
            </Drawer>
        </Box>
    )
})

export default DrawerWindow