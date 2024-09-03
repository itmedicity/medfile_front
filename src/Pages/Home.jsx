import { Box } from "@mui/joy";
import React, { memo } from "react";
import { baseColor, screenHeight } from "../Constant/Constant";
import Header from "../Layouts/Header";
import DrawerWindow from "../Layouts/DrawerWindow";
import { useState } from "react";

const Home = () => {
  const [drawerWidth, setdrawerWidth] = useState(240)

  const toggleDrawer = () => {
    setdrawerWidth(drawerWidth === 240 ? 60 : 240);
    // setOpen(display);
  };

  return (
    <Box
      sx={{
        backgroundColor: baseColor.backGroundColor,
        display: "flex",
        flexDirection: "row",
        height: screenHeight,
      }}
    >
      {/* Drawer Start */}
      <DrawerWindow drawerWidth={drawerWidth} />
      {/* Drawer End */}

      {/* Content Start */}
      <Box sx={{ display: 'flex', bgcolor: baseColor.backGroundColor, flexGrow: 1, flexDirection: "column" }}>
        <Box sx={{ display: 'flex' }} >
          <Header toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} />
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1, }} >
          sdfds
        </Box>
        <Box>
          {/* <Footer /> */}
        </Box>
      </Box>
      {/* Content End */}
    </Box>
  );
};

export default memo(Home);
