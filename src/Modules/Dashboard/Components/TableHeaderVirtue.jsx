import React from 'react'
import { memo } from 'react'
import { baseColor } from '../../../Constant/Constant'
import { Box } from '@mui/joy'
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import GppGoodIcon from "@mui/icons-material/GppGood";

const TableHeaderVirtue = () => {
    return (
        <tr
            style={{ backgroundColor: baseColor.primarylight }}
            className="border border-1 border-[#80AF81] rounded-md -m-4"
        >
            <th>
                <Box className="flex justify-center w-16">
                    <GppGoodIcon
                        sx={{ fontSize: { sm: "1.1rem", lg: "1.1rem" } }}
                        color="success"
                    />
                </Box>
            </th>
            <th>
                <Box className="flex justify-center w-16">
                    <PanoramaOutlinedIcon
                        sx={{ fontSize: { sm: "1.1rem", lg: "1.1rem" } }}
                        color="success"
                    />
                </Box>
            </th>
            <th>
                <Box className="flex justify-center w-16">
                    <LocalPrintshopOutlinedIcon
                        sx={{ fontSize: { sm: "1.1rem", lg: "1.1rem" } }}
                        color="success"
                    />
                </Box>
            </th>
            <th>
                <Box
                    className="flex justify-center w-[10.5rem]"
                    sx={{ fontSize: { lg: "0.8rem" }, color: baseColor.primary }}
                >
                    Doc Number
                </Box>
            </th>
            <th>
                <Box
                    className="flex justify-center w-[12rem]"
                    sx={{ fontSize: { lg: "0.8rem" }, color: baseColor.primary }}
                >
                    Category
                </Box>
            </th>
            <th>
                <Box
                    className="flex justify-center w-[18rem]"
                    sx={{ fontSize: { lg: "0.8rem" }, color: baseColor.primary }}
                >
                    Type
                </Box>
            </th>
            <th>
                <Box
                    className="flex justify-center w-[12rem]"
                    sx={{ fontSize: { lg: "0.8rem" }, color: baseColor.primary }}
                >
                    Group
                </Box>
            </th>
            <th>
                <Box
                    className="flex justify-start pl-2 w-[38rem]"
                    sx={{ fontSize: { lg: "0.8rem" }, color: baseColor.primary }}
                >
                    Doc Description
                </Box>
            </th>
        </tr>
    )
}

export default memo(TableHeaderVirtue) 