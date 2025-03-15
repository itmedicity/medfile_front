import { Box, Divider } from '@mui/joy'
import React, { Fragment, useCallback } from 'react'
import { memo } from 'react'
import AssuredWorkloadRoundedIcon from "@mui/icons-material/AssuredWorkloadRounded";
import Grid from "@mui/material/Grid2";
import axiosApi from '../../../Axios/Axios';

const DashBoadTile = ({ color, index, documentName, count, typeSlno, SetView, SetCatDetails, setDocName }) => {

    const ViewCategoryDetails = useCallback(async () => {
        SetView(1)
        setDocName(documentName)
        const response = await axiosApi.get(`/docMaster/getDocMasterByTypeId/${typeSlno}`)
        const { success, data } = response.data;
        if (success === 1) {
            SetCatDetails(data)
        }
        else {
            SetCatDetails([])
        }
    }, [typeSlno, SetCatDetails, SetView, documentName, setDocName])

    return (
        <Fragment>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3, xl: 3 }} sx={{ position: 'relative' }}  >
                <Box
                    className="flex flex-1 border-[1px] rounded-md mt-2 p-1 flex-col overflow-y-hidden"
                    sx={{
                        bgcolor: "rgba(var(--bg-card))",
                        color: "#55606e",
                        borderColor: "rgba(var(--border-primary))",
                        height: { xs: 150, sm: 150, md: 150, lg: 120, xl: 135 },
                        width: "100%",
                    }}
                >
                    <Box className="flex flex-row" sx={{ height: 115, cursor: 'pointer' }} onClick={ViewCategoryDetails}>
                        <Box
                            className="flex flex-col"
                            sx={{
                                width: "calc(100% - 66%)",
                            }}
                        >
                            <Box
                                className="flex items-center justify-center text-5xl rounded-b-xl z-10 rounded-t-md "
                                sx={{
                                    bgcolor: color[index],
                                    // marginTop: "-25px",
                                    width: "calc(100% - 66%)",
                                    marginBottom: 0.5,
                                    height: { xs: 105, sm: 105, md: 105, lg: 90, xl: 105 },
                                    opacity: 1,
                                    top: 0,
                                    position: 'absolute',
                                    transition: 'all 0.3s ease-in-out',
                                    ':hover': {
                                        bgcolor: color[index],
                                        borderRadius: '0 0 10px 10px',
                                        marginTop: "-2px",
                                        opacity: 1,
                                        transform: 'translateY(10px)',
                                    }
                                }}
                            >
                                <AssuredWorkloadRoundedIcon
                                    fontSize="large"
                                    sx={{ mt: 0, color: "white" }}
                                />
                            </Box>
                        </Box>
                        <Box
                            className="flex flex-col text-end pr-1 text-fontprimarywhite"
                            sx={{
                                width: "calc(100% - 34%)",
                            }}
                        >
                            <Box
                                className="line-clamp-3"
                                sx={{
                                    fontFamily: 'var(--font-varient)',
                                    fontSize: 'clamp(0.75rem, 0.9vw, 0.8rem)',
                                }}
                            >{documentName}</Box>
                        </Box>
                    </Box>
                    <Box sx={{ height: 35, textAlign: "end" }}>
                        <Divider sx={{ color: 'rgba(var(--border-primary))' }} />
                        <Box className="font-normal text-xl text-opacity-100 pr-4 text-fontLight">
                            {count}
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Fragment>
    )
}

export default memo(DashBoadTile) 