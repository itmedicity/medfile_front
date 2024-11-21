// @ts-nocheck
import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import ScreenCheck from "../Components/ScreenCheck";
import { Container, ListSubheader } from "@mui/material";
import { Switch, switchClasses } from "@mui/joy";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import "./Style.css";
import { NavArrowRight, MouseButtonLeft } from 'iconoir-react'

function Home(props) {
  const navigation = useNavigate();
  const [drawerWidth, setDrawerWidth] = useState(240);
  const [dark, setDark] = useState(false);
  // const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleChangeDarkMode = () => {
    setDark(!dark);
    if (dark === true) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    setDrawerWidth(drawerWidth === 0 ? 240 : 0);
    setMobileOpen(drawerWidth === 0 ? true : false);
    if (!isClosing) {
    }
  };


  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (event, index, route) => {
    setSelectedIndex(index);
    navigation(route);
  };

  const drawer = (
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
        {[
          { menu: "Dashboard", text: "/Home/Dashboard" },
          { menu: "FileUpload", text: "/Home/FileUpload" },
          { menu: "Advance Search", text: "/Home/AdvancedSearch" },
          { menu: "Settings", text: "/Home/Settings" },
        ].map((val, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: "flex", }}
            secondaryAction={
              <NavArrowRight height={20} width={20} color="rgba(var(--drawer-font-color))" className={selectedIndex === index && "bouncing-element"} />
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
                <HomeOutlinedIcon
                  className="hoverClass"
                  sx={{ fontSize: "1.3rem", lineHeight: "1.4rem" }}
                />
              </ListItemIcon>
              <Typography
                noWrap
                className="hoverClass text-fontsecondarywhite "
                sx={{
                  display: "flex",
                  fontFamily: "var(--font-varient)",
                  fontSize: "14px",
                  fontWeight: 600,
                  transition: "transform 0.3s ease",
                  transform: "translateX(0)",
                }}
              >
                {val.menu}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: "flex", width: "100%", overscrollBehavior: "none" }}>
      <CssBaseline />

      {/* TOP APPLICATION BAR START HERE  */}

      <AppBar
        position="fixed"
        style={{
          backgroundColor: "rgba(var(--bg-nav))",
        }}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Box >
          <Toolbar variant="dense" className="flex flex-row justify-between">
            <Box className="flex flex-row items-center">
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  display: { sm: "flex" },
                  color: "rgba(var(--color-white))",
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                className="text-navheadercolor"
              >
                Travancore Medicity
              </Typography>
              <ScreenCheck />
            </Box>
            <Box className="flex flex-row items-center">
              <Switch
                checked={dark}
                // onChange={() => setDark(!dark)}
                onChange={handleChangeDarkMode}
                slotProps={{
                  track: {
                    children: (
                      <>
                        <BedtimeOutlinedIcon
                          sx={{ ml: "8px" }}
                          fontSize="small"
                        />
                        <WbSunnyOutlinedIcon
                          sx={{ mr: "7px" }}
                          fontSize="small"
                        />
                      </>
                    ),
                  },
                }}
                sx={{
                  border: '0.005rem solid rgba(var(--border-primary))',
                  borderRadius: '16px',
                  "--Switch-thumbSize": "27px",
                  "--Switch-trackWidth": "64px",
                  "--Switch-trackHeight": "31px",
                  "--Switch-thumbWidth": "32px",
                  "--Switch-thumbBackground": "rgb(216,75,154)",
                  "--Switch-trackBackground": "rgba(15,18,20,0.5)",
                  "&:hover": {
                    "--Switch-trackBackground": "rgba(15,18,20,0.5)",
                  },
                  [`&.${switchClasses.checked}`]: {
                    "--Switch-trackBackground": "rgba(15,18,20,0.5)",
                    "--Switch-thumbBackground": "rgb(216,75,154)",
                    "&:hover": {
                      "--Switch-trackBackground": "rgba(15,18,20,0.5)",
                    },
                  },
                }}
              />
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      {/* TOP APPLICATION BAR END HERE  */}
      {/* NAVIGATION BAR LEFT SIDE */}
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
              // backgroundColor: "rgba(var(--color-blue))",
            },
          }}
          onClose={handleDrawerClose}
        // open={mobileOpen}
        >
          {drawer}
        </Drawer>
      </Box>
      {/* NAVIGATION BAR LEFT SIDE --- END HERE*/}

      {/* MAIN CONTENT START  */}
      <Box
        component="main"
        className="bg-bgcommon"
        sx={{
          flexGrow: 1,
          p: "0.15rem",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: "100%",
          overscrollBehavior: "none",
        }}
      >
        <Toolbar variant="dense" />
        <Outlet />
      </Box>
      {/* MAIN CONTENT END  */}
    </Box>
  );
}

export default memo(Home);
