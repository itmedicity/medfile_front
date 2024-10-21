import { Box, IconButton } from "@mui/joy";
import React, { memo } from "react";
import CustomTypo from "../../../Components/CustomTypo";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoDisturbOffOutlinedIcon from "@mui/icons-material/DoDisturbOffOutlined";
import FileLink from "../../../assets/pdf.png";

const FilleListCmp = ({ data }) => {
  console.log(data);
  return (
    <Box className="p-2 border rounded-md h-24 flex gap-1 flex-1 flex-row">
      <Box className="flex w-20 border rounded-md items-center justify-center">
        <img
          alt="upload image"
          src={FileLink}
          width={60}
          height={60}
          className="p-1 rounded-md object-contain"
        />
      </Box>
      <Box className="flex flex-1 border rounded-md flex-col">
        <CustomTypo
          label={"image names"}
          style={{ fontSize: "1rem", paddingY: 0 }}
        />
        <CustomTypo
          label={"image names"}
          style={{ fontSize: "0.8rem", paddingY: 0 }}
        />
        <CustomTypo
          label={"image names"}
          style={{ fontSize: "0.8rem", paddingY: 0 }}
        />
      </Box>
      <Box className="flex w-24 justify-center items-center">
        <Box>
          <IconButton color="neutral" onClick={() => {}}>
            <DoDisturbOffOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box>
          <IconButton color="neutral" onClick={() => {}}>
            <DeleteOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(FilleListCmp);
