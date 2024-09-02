import { Box } from "@mui/joy";
import React, { memo } from "react";
import { baseColor, screenHeight } from "../Constant/Constant";
import Footer from "../Layouts/Footer";
import Header from "../Layouts/Header";
import DrawerWindow from "../Layouts/DrawerWindow";
import { useState } from "react";

const Home = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(inOpen);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        height: screenHeight,
      }}
    >
      <DrawerWindow open={open} toggleDrawer={toggleDrawer} />
      <Header toggleDrawer={setOpen} />
      <Footer />
    </Box>
  );
};

export default memo(Home);
