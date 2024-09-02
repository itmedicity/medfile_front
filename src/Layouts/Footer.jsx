import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { memo } from "react";
import { baseColor } from "../Constant/Constant";

const Footer = () => {
  return (
    <AppBar
      position="fixed"
      // color="primary"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: baseColor.primarylight,
        // maxHeight: 35,
      }}
    >
      <Toolbar variant="dense">
        {/* <IconButton color="inherit" aria-label="open drawer">
                    <MenuIcon />
                </IconButton> */}
        <Box sx={{ flexGrow: 1 }} />
        {/* <IconButton color="inherit">
          <SearchIcon />
        </IconButton> */}
        {/* <IconButton color="inherit"> */}
        {/* <MoreIcon /> */}
        {/* </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default memo(Footer);
