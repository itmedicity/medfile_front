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
import { Container } from "@mui/material";
import { Switch, switchClasses } from "@mui/joy";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import "./Style.css";

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

  const drawer = (
    <div>
      <Toolbar variant="dense" />
      <Divider />
      <List>
        {[
          { menu: "Dashboard", text: "/Home/Dashboard" },
          { menu: "FileUpload", text: "/Home/FileUpload" },
          { menu: "Advance Search", text: "/Home/AdvancedSearch" },
          { menu: "Settings", text: "/Home/Settings" },
        ].map((val, index) => (
          <ListItem key={index} disablePadding sx={{ display: "flex" }}>
            <ListItemButton
              onClick={() => navigation(val.text)}
              sx={{
                display: "flex",
                mx: 1,
                borderRadius: 2.5,
                my: 0.5,
                height: 30,
                alignItems: "center",
                transition: "transform 0.3s ease, color 0.3s ease",
                transform: "translateX(0)",
                ":hover": {
                  bgcolor: "rgba(var(--active-bg))",
                  "& .hoverClass": {
                    transform: "translateX(2px)",
                    color: "rgba(var(--font-primary-white))",
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
                  transition: "transform 0.3s ease, color 0.3s ease",
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
                  transition: "transform 0.3s ease, color 0.3s ease",
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
    <Box sx={{ display: "flex", width: "100%", bgcolor: "green" }}>
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
                className="text-fontprimarywhite"
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
