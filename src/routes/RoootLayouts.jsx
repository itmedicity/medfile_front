import { Box } from "@mui/joy";
import React from "react";
import { Outlet } from "react-router-dom";
import { screenHeight } from "../Constant/Constant";

const RoootLayouts = () => {
  return (
    <Box className="flex flex-grow flex-grow-1 bg-green-300 flex-col">
      <Box className="flex" sx={{ height: screenHeight }}>
        Login Page
      </Box>
    </Box>
  );
};
export default RoootLayouts;
