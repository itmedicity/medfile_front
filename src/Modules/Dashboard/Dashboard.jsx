import {
  Box,
  Button,
  Divider,
  Input,
  Sheet,
  Skeleton,
  Tooltip,
  Typography,
  styled,
} from "@mui/joy";
import Grid from "@mui/material/Grid2";
import React, { memo, useMemo } from "react";
import { baseColor, screenHeight, screenWidth } from "../../Constant/Constant";
import fileIcon1 from "../../assets/Project.gif";
import ScreenCheck from "../../Components/ScreenCheck";
import AutocompletedMainSearch from "../../Components/AutocompletedMainSearch";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import { TableVirtuoso, Virtuoso } from "react-virtuoso";
import AssuredWorkloadRoundedIcon from "@mui/icons-material/AssuredWorkloadRounded";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";

import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { useQuery } from "@tanstack/react-query";
import { getDocTypeCount } from "../../api/commonAPI";

const Dashboard = () => {
  const {
    isLoading: docTypeLoding,
    data: docTypeData,
    error: docTypeError,
  } = useQuery({
    queryKey: ["getDocTypeCount"],
    queryFn: getDocTypeCount,
  });

  console.log(docTypeData);

  const users = [
    {
      id: "1-2024",
      iconStat: true,
      docNo: 56859526,
      trstIcon: false,
      docHead: "Fire ( NOC )",
      docCat: "Building",
      docSub: "Builing",
    },
    {
      id: "2-2024",
      iconStat: false,
      docNo: 56859525,
      trstIcon: true,
      docHead:
        "Building Occupancy / Completion Certificate/Building permit of Hospital and Other Institution",
      docCat: "Builing",
      docSub: "Builing",
    },
    {
      id: "3-2024",
      iconStat: true,
      docNo: 56859524,
      trstIcon: false,
      docHead: "Employee Provident Fund",
      docCat: "Spirit and Petroleum products",
      docSub: "Builing",
    },
    {
      id: "4-2024",
      iconStat: false,
      docNo: 56859523,
      trstIcon: true,
      docHead: "Sanction/ License for Lifts and escalators",
      docCat: "POLLUTION",
      docSub: "Blood Bank",
    },
    {
      id: "5-2024",
      iconStat: true,
      docNo: 56859522,
      trstIcon: false,
      docHead:
        "License to Store Compressed Gas from the Petroleum and Explosives Safety Organization (PESO",
      docCat: "MEDICAL GAS",
      docSub: "ORGAN TRANSPLANT",
    },
    {
      id: "6-2024",
      iconStat: false,
      docNo: 56859521,
      trstIcon: true,
      docHead: "License for Diesel Storage",
      docCat: "Blood Bank",
      docSub: "RADIOLOGY ",
    },
    {
      id: "2-2024",
      iconStat: false,
      docNo: 56859525,
      trstIcon: true,
      docHead:
        "Building Occupancy / Completion Certificate/Building permit of Hospital and Other Institution",
      docCat: "Builing",
      docSub: "Builing",
    },
    {
      id: "3-2024",
      iconStat: true,
      docNo: 56859524,
      trstIcon: false,
      docHead: "Employee Provident Fund",
      docCat: "Spirit and Petroleum products",
      docSub: "Builing",
    },
    {
      id: "4-2024",
      iconStat: false,
      docNo: 56859523,
      trstIcon: true,
      docHead: "Sanction/ License for Lifts and escalators",
      docCat: "POLLUTION",
      docSub: "Blood Bank",
    },
    {
      id: "6-2024",
      iconStat: false,
      docNo: 56859521,
      trstIcon: true,
      docHead: "License for Diesel Storage",
      docCat: "Blood Bank",
      docSub: "RADIOLOGY ",
    },
    {
      id: "2-2024",
      iconStat: false,
      docNo: 56859525,
      trstIcon: true,
      docHead:
        "Building Occupancy / Completion Certificate/Building permit of Hospital and Other Institution",
      docCat: "Builing",
      docSub: "Builing",
    },
    {
      id: "3-2024",
      iconStat: true,
      docNo: 56859524,
      trstIcon: false,
      docHead: "Employee Provident Fund",
      docCat: "Spirit and Petroleum products",
      docSub: "Builing",
    },
  ];

  const a = [
    { id: 18, name: "Quilon Medical Trust", bgColor: "#fc930a" },
    { id: 200, name: "Royal Medical Trust", bgColor: "#de2567" },
    {
      id: 500,
      name: "Quilon Super Speciality Hospital and Institute PVT LTD",
      bgColor: "#4ba64f",
    },
    {
      id: 1000,
      name: "Travancore Medicity Foundation For Organ Transplantation",
      bgColor: "#0ab3c7",
    },
  ];

  return (
    <Box className="flex flex-col border-2 m-2 rounded-xl p-2 pb-2 overflow-scroll w-full">
      {/* <Typography level='h2' textAlign='center' sx={{ p: 0.5 }} >Mediwalt</Typography> */}
      <Grid container spacing={1} sx={{ flexGrow: 1 }}>
        {/* Dash board container start */}
        {docTypeLoding === false ? (
          <Skeleton sx={{ width: 150 }} />
        ) : (
          docTypeData?.map((val, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3, xl: 3 }}>
              <Box
                key={idx}
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
                      bgcolor: val.bgColor,
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
                    <Box className="font-extralight">{val.name}</Box>
                  </Box>
                </Box>
                <Box sx={{ height: 35, textAlign: "end" }}>
                  <Divider />
                  <Box className="font-normal text-xl text-opacity-100 pr-4">
                    {val.id}
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))
        )}
        {/* Dash board container end here */}
      </Grid>

      <Box className="flex mt-6 justify-center">
        {/* <AutocompletedMainSearch /> */}
        <Input
          startDecorator={<SearchOutlinedIcon />}
          endDecorator={
            <Button startDecorator={<ContentPasteSearchOutlinedIcon />}>
              Search
            </Button>
          }
          sx={{
            width: { xs: "90%", sm: "80%", md: "60%", lg: "50%", xl: "40%" },
            "--Input-radius": "40px",
            "--Input-gap": "10px",
            "--Input-placeholderOpacity": 1,
            "--Input-focusedThickness": "1.5px",
            "--Input-minHeight": "53px",
            "--Input-paddingInline": "27px",
            "--Input-decoratorChildHeight": "42px",
            "&.MuiInput-root": {
              "--Input-focusedHighlight": baseColor.primarylight,
            },
          }}
        />
      </Box>
      <Box
        className="flex  justify-center items-center rounded"
        sx={{
          height: 700, // Set explicit height for the Box
          width: "100%",
          mt: 0.5,
          padding: "0.1em",
          border: "1px solid #ccc",
        }}
      >
        <TableVirtuoso
          style={{ height: "100%", width: "100%", border: "1px solid #ccc" }}
          className="flex flex-1 rounded-md"
          data={users}
          fixedHeaderContent={() => (
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
                  <EditCalendarOutlinedIcon
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
                  className="flex justify-center w-28"
                  sx={{ fontSize: { lg: "0.8rem" }, color: baseColor.primary }}
                >
                  Version
                </Box>
              </th>
              <th>
                <Box
                  className="flex justify-center w-40"
                  sx={{ fontSize: { lg: "0.8rem" }, color: baseColor.primary }}
                >
                  Doc number
                </Box>
              </th>
              <th>
                <Box
                  className="flex justify-center w-16"
                  sx={{ fontSize: { lg: "0.8rem" }, color: baseColor.primary }}
                >
                  Type
                </Box>
              </th>
              <th>
                <Box
                  className="flex justify-start flex-1"
                  sx={{ fontSize: { lg: "0.8rem" }, color: baseColor.primary }}
                >
                  Document Name
                </Box>
              </th>
            </tr>
          )}
          itemContent={(index, user) => (
            <>
              <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex flex-1 w-16 h-full justify-center items-center">
                  {user.iconStat ? (
                    <Tooltip
                      title="Secured open file"
                      placement="left"
                      sx={{ fontSize: "0.8rem" }}
                      color="success"
                    >
                      <LockOpenOutlinedIcon
                        sx={{
                          color: "#6fb872",
                          fontSize: {
                            xs: "2rem",
                            sm: "2rem",
                            md: "2rem",
                            lg: "1.7rem",
                            xl: "2rem",
                          },
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Secured Locked file"
                      placement="left"
                      sx={{ fontSize: "0.8rem" }}
                      color="warning"
                    >
                      <HttpsOutlinedIcon
                        sx={{
                          color: "#e55185",
                          fontSize: {
                            xs: "2rem",
                            sm: "2rem",
                            md: "2rem",
                            lg: "1.7rem",
                            xl: "2rem",
                          },
                          cursor: "wait",
                        }}
                      />
                    </Tooltip>
                  )}
                </Box>
              </td>
              <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex w-16 h-full justify-center items-center">
                  <Tooltip title="View File" placement="top">
                    <PanoramaOutlinedIcon
                      sx={{
                        color: baseColor.primary,
                        fontSize: {
                          xs: "2rem",
                          sm: "2rem",
                          md: "2rem",
                          lg: "1.7rem",
                          xl: "2rem",
                        },
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </Box>
              </td>
              <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex w-16 h-full justify-center items-center">
                  <Tooltip title="Update File" placement="top">
                    <EditCalendarOutlinedIcon
                      sx={{
                        color: baseColor.primary,
                        fontSize: {
                          xs: "2rem",
                          sm: "2rem",
                          md: "2rem",
                          lg: "1.7rem",
                          xl: "2rem",
                        },
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </Box>
              </td>
              <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex w-16 h-full justify-center items-center">
                  <Tooltip title="Print File" placement="top">
                    <LocalPrintshopOutlinedIcon
                      sx={{
                        color: baseColor.primary,
                        fontSize: {
                          xs: "2rem",
                          sm: "2rem",
                          md: "2rem",
                          lg: "1.7rem",
                          xl: "2rem",
                        },
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </Box>
              </td>
              <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex w-28 justify-center items-center px-2">
                  <Typography
                    level="body-xs"
                    fontWeight={500}
                    variant="outlined"
                    color="neutral"
                    textAlign={"center"}
                    className="w-full"
                    sx={{ borderRadius: 10 }}
                  >
                    {user.id}
                  </Typography>
                </Box>
              </td>
              <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex w-40 h-full justify-center items-center">
                  <Typography level="body-md">{user.docNo}</Typography>
                </Box>
              </td>
              <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex w-16 h-full justify-center items-center">
                  {user.trstIcon ? (
                    <AccountBalanceOutlinedIcon
                      sx={{
                        color: "#0655A3",
                        fontSize: {
                          xs: "2rem",
                          sm: "2rem",
                          md: "2rem",
                          lg: "1.7rem",
                          xl: "2rem",
                        },
                        // cursor: 'pointer'
                      }}
                    />
                  ) : (
                    <ApartmentOutlinedIcon
                      sx={{
                        color: "#823F45",
                        fontSize: {
                          xs: "2rem",
                          sm: "2rem",
                          md: "2rem",
                          lg: "1.7rem",
                          xl: "2rem",
                        },
                        // cursor: 'pointer'
                      }}
                    />
                  )}
                </Box>
              </td>
              <td className="border border-1 border-[#CFD5D1]">
                <Box className="flex h-full flex-col">
                  <Typography
                    level="body-md"
                    sx={{
                      textTransform: "capitalize",
                      width: (screenWidth * 80) / 100,
                    }}
                    noWrap
                  >
                    {user.docHead.toLocaleLowerCase()}
                  </Typography>
                  <Typography
                    level="body-sm"
                    textColor="primary.700"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {user.docCat.toLocaleLowerCase()}
                  </Typography>
                </Box>
              </td>
            </>
          )}
        />
      </Box>
    </Box>
  );
};

export default memo(Dashboard);
