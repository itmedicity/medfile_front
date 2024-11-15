import React, { memo } from "react";
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

function Home(props) {
  const navigation = useNavigate();
  const [drawerWidth, setDrawerWidth] = useState(240);
  // const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
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
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigation(val.text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              {/* <ListItemText primary={val.menu} sx={{}} /> */}
              <Typography noWrap>{val.menu}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />

      {/* TOP APPLICATION BAR START HERE  */}

      <AppBar
        position="fixed"
        style={{
          backgroundColor: "rgba(var(--color-blue))",
        }}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          // backgroundColor: "greenyellow",
        }}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "flex" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
          <ScreenCheck />
        </Toolbar>
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
              backgroundColor: "rgba(var(--color-blue))",
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
        sx={{
          flexGrow: 1,
          p: "0.15rem",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
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
