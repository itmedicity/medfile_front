import { Box } from "@mui/joy";
import React from "react";
import { Outlet } from "react-router-dom";

const RoootLayouts = () => {
  return (
    <Box className="flex flex-1 bg-slate-400 justify-center items-center">
      <Box>Login Page</Box>
    </Box>
  );
};
export default RoootLayouts;
