// @ts-nocheck
import {
  Box,
  Button,
  Input,
  Skeleton,
} from "@mui/joy";
import Grid from "@mui/material/Grid2";
import React, { memo, useCallback, useEffect, useState } from "react";
import { baseColor, sanitizeInput, warningNofity } from "../../Constant/Constant";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import { TableVirtuoso } from "react-virtuoso";
import { useQuery } from "@tanstack/react-query";
import { getDocAll, getDocMasterLikeName, getDocMasterLikeNameNonSecureOnly, getDocTypeCount, getnonSecureDoconly } from "../../api/commonAPI";
import DashBoadTile from "./Components/DashBoadTile";
import TableHeaderVirtue from "./Components/TableHeaderVirtue";
import TableContentVirtue from "./Components/TableContentVirtue";
import { ToastContainer } from "react-toastify";
import RefreshIcon from '@mui/icons-material/Refresh';

const localData = localStorage.getItem('app_auth')
const credValue = atob(JSON.parse(localData)?.authType)

const Dashboard = () => {
  const color = ['#fc930a', '#de2567', '#4ba64f', '#0ab3c7', '#4ba64f', '#de2567', '#fc930a', '#de2567', '#0ab3c7', '#0ab3c7', '#4ba64f',]
  const [tableData, setTableData] = useState([])
  const [searchParm, setSearchParm] = useState('')

  //GET THE DASH BOARD COUNT
  const {
    isLoading: docTypeLoding,
    data: docTypeData,
    error: docTypeError,
  } = useQuery({
    queryKey: ["getDocTypeCount"],
    queryFn: getDocTypeCount,
    staleTime: Infinity
  });

  // GET DOC ALL

  const { isLoading: allDocLoading, data: allDocData, error: allDocError } = useQuery({
    queryKey: ["getAllDoc"],
    queryFn: credValue === 1 ? getDocAll : getnonSecureDoconly,
    staleTime: Infinity
  })

  const { isLoading: docNameLoading, data: docNameData, refetch, error: docNameError } = useQuery({
    queryKey: ["getDocNameSearch",],
    queryFn: () => credValue === 1 ? getDocMasterLikeNameNonSecureOnly(searchParm) : getDocMasterLikeName(searchParm),
    enabled: !!searchParm,
    staleTime: Infinity
  })

  const handleSearchFun = useCallback(() => {
    let searchContent = sanitizeInput(searchParm?.trim());
    let stringLength = searchContent?.length
    if (stringLength < 5) {
      warningNofity('Search parameter must be greater than 5 letter')
      return
    }
    if (searchContent !== undefined || searchContent !== null || searchContent !== '' || stringLength > 5) {
      refetch()
    }
  }, [searchParm, refetch])


  useEffect(() => {
    if (allDocData) {
      setTableData(allDocData)
    }
  }, [allDocData])

  useEffect(() => { if (docNameData) { setTableData(docNameData) } }, [docNameData])

  const handleClearTable = () => {
    setTableData(allDocData)
    setSearchParm("")
  }

  // console.log(allDocData)

  return (
    <Box className="flex flex-col border-2 m-2 rounded-xl p-2 pb-2 overflow-scroll w-full">
      <ToastContainer />
      <Grid container spacing={1} sx={{ flexGrow: 1 }}>
        {/* Dash board container start */}
        {docTypeLoding === true || docTypeError ? (
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}  >
            <Skeleton variant="rectangular" sx={{ height: '100%' }} animation="wave" />
          </Grid>
        ) : (
          docTypeData?.map((val, idx) => (
            <DashBoadTile
              key={idx}
              index={idx}
              color={color}
              documentName={val.doc_type_master_name}
              count={val.COUNT}
            />
          ))
        )}
        {/* Dash board container end here */}
      </Grid>

      {/* SEARCH ENGINE HERE */}
      <Box className="flex mt-6 justify-center">
        {/* <AutocompletedMainSearch /> */}
        <Input
          startDecorator={<SearchOutlinedIcon />}
          onChange={(e) => setSearchParm(e.target.value)}
          endDecorator={
            <Button
              startDecorator={<ContentPasteSearchOutlinedIcon />}
              onClick={handleSearchFun}
            >
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ml: 2,
            "--Button-radius": "40px"
          }}
        >
          <Button
            startDecorator={<RefreshIcon />}
            onClick={handleClearTable}
            sx={{
              height: '45px'
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>

      <Box
        className="flex  justify-center items-center rounded-md"
        sx={{
          height: 700,
          width: "100%",
          mt: 0.5,
          padding: "0.1em",
          border: "1px solid #ccc",
        }}
      >
        <TableVirtuoso
          style={{ height: "100%", width: "100%", border: "1px solid #ccc" }}
          className="flex flex-1 rounded-md"
          data={tableData}
          fixedHeaderContent={() => (<TableHeaderVirtue />)}
          itemContent={(index, data) => (<TableContentVirtue data={data} />)}
        />
      </Box>
    </Box>
  );
};

export default memo(Dashboard);
