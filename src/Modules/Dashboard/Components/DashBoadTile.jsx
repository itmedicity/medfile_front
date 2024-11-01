import { Box, Divider } from '@mui/joy'
import React from 'react'
import { memo } from 'react'
import AssuredWorkloadRoundedIcon from "@mui/icons-material/AssuredWorkloadRounded";
import Grid from "@mui/material/Grid2";

const DashBoadTile = ({ color, index, documentName, count }) => {
    return (
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3, xl: 3 }}  >
            <Box
                className="flex flex-1 border-2 rounded-md p-1 flex-col overflow-y-hidden"
                sx={{
                    bgcolor: "#ffffff",
                    color: "#55606e",
                    height: { xs: 150, sm: 150, md: 150, lg: 120, xl: 145 },
                    width: "100%",
                }}
            >
                <Box className="flex" sx={{ height: 115 }}>
                    <Box
                        className="flex  w-[34%] items-center justify-center text-5xl rounded-3xl drop-shadow-xl"
                        sx={{
                            bgcolor: color[index],
                            marginTop: "-25px",
                            float: "left",
                            marginBottom: 0.5,
                            opacity: 0.8,
                        }}
                    >
                        <AssuredWorkloadRoundedIcon
                            fontSize="large"
                            sx={{ mt: 2, color: "white" }}
                        />
                    </Box>
                    <Box className="flex flex-col flex-1 justify-center text-end pr-2">
                        <Box className="font-extralight">{documentName}</Box>
                    </Box>
                </Box>
                <Box sx={{ height: 35, textAlign: "end" }}>
                    <Divider />
                    <Box className="font-normal text-xl text-opacity-100 pr-4">
                        {count}
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}

export default memo(DashBoadTile) 