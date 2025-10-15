import React from 'react'
import { memo } from 'react'
import { Box } from '@mui/joy'
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import GppGoodIcon from "@mui/icons-material/GppGood";

const TableHeaderVirtue = () => {
    return (
        <tr
            className="h-10 bg-tablehead/95 border-tableborder border-dashed "
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
                    className="flex justify-center w-[10.5rem] text-baseWhite/80"
                    sx={{ fontSize: { lg: "0.8rem" }, fontFamily: 'var(--font-varient)' }}
                >
                    Doc Number
                </Box>
            </th>
            <th>
                <Box
                    className="flex justify-center w-[12rem] text-baseWhite/80"
                    sx={{ fontSize: { lg: "0.8rem" }, fontFamily: 'var(--font-varient)' }}
                >
                    Category
                </Box>
            </th>
            <th>
                <Box
                    className="flex justify-center w-[18rem] text-baseWhite/80"
                    sx={{ fontSize: { lg: "0.8rem" }, fontFamily: 'var(--font-varient)' }}
                >
                    Type
                </Box>
            </th>
            <th>
                <Box
                    className="flex justify-center w-[12rem] text-baseWhite/80"
                    sx={{ fontSize: { lg: "0.8rem" }, fontFamily: 'var(--font-varient)' }}
                >
                    Group
                </Box>
            </th>
            <th>
                <Box
                    className="flex justify-start pl-2 w-[38rem] text-baseWhite/80"
                    sx={{ fontSize: { lg: "0.8rem" }, fontFamily: 'var(--font-varient)' }}
                >
                    Doc Description
                </Box>
            </th>
        </tr>
    )
}

export default memo(TableHeaderVirtue)




