import { Box, IconButton, Tooltip, Typography } from "@mui/joy";
import React from "react";
import { memo } from "react";
import { useState } from "react";
import FileViewModal from "./FileViewModal";
import { useCallback } from "react";
import { getAllSuperUsers, getDocumentDetl } from "../../../api/commonAPI";
import { LockSlash, Lock, Presentation, Printer } from "iconoir-react";
import { useQuery } from "@tanstack/react-query";
import OtpVerificationModal from "../OTPVerification/OtpVerificationModal";

const TableContentVirtue = ({ data, credValue, printerAccess }) => {

  const [otpModal, setOtpModal] = useState(false)

  const {
    data: AllsuperUsers
  } = useQuery({
    queryKey: ["SuperUsersDtl"],
    queryFn: getAllSuperUsers
  })

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);


  const handleClickViewFile = useCallback(async (e) => {
    e.preventDefault();
    setOpen(true);
    const docID = data?.doc_id;
    const fetchBulkFile = await getDocumentDetl(docID);
    setFiles(fetchBulkFile);
  }, [data]);

  const userVal = Number(credValue);

  const printOutProcess = useCallback(() => {
    setOtpModal(true)
  }, [])

  return (
    <>
      {otpModal === true && data.isSecure === 1 ?
        <OtpVerificationModal setOtpModal={setOtpModal} otpModal={otpModal} data={data} AllsuperUsers={AllsuperUsers} /> : null
      }
      <FileViewModal open={open} setOpen={setOpen} data={data} files={files} />
      {userVal === 1 ?
        <Box>
          <td className="border-tableborder border-dashed border-t-[0.20px] h-10">
            <Box className="flex flex-1 w-16 h-full justify-center items-center">

              {data.isSecure === 0 ? (
                <Tooltip
                  title="Not Secure file"
                  placement="left"
                  sx={{ fontSize: "0.8rem" }}
                  color="success"
                >
                  <LockSlash
                    height={18}
                    width={18}
                    color="rgba(var(--icon-primary))"
                    cursor={"pointer"}
                  />
                </Tooltip>
              ) : (
                <Tooltip
                  title="Secured Locked file"
                  placement="left"
                  sx={{ fontSize: "0.8rem" }}
                  color="warning"
                >
                  <Lock
                    height={18}
                    width={18}
                    color="rgba(var(--icon-primary))"
                    cursor={"pointer"}
                  />
                </Tooltip>
              )}
            </Box>
          </td>
          <td className="border-tableborder border-dashed border-t-[0.20px]">
            <Box className="flex w-16 h-full justify-center items-center">
              <Tooltip title="View File" placement="top">
                <IconButton
                  variant="outlined"
                  size="sm"
                  onClick={handleClickViewFile}
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                      border: "0.03px solid rgba(var(--color-pink))",
                    },
                  }}
                >
                  <Presentation
                    height={18}
                    width={18}
                    color="rgba(var(--icon-primary))"
                    cursor={"pointer"}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </td>
          <td className="border-tableborder border-dashed border-t-[0.20px]">
            <Box className="flex w-16 h-full justify-center items-center">
              <Tooltip title="Print File" placement="top">
                <IconButton
                  onClick={printOutProcess}
                  variant="outlined"
                  size="sm"
                  disabled={printerAccess !== "Y" || printerAccess === null}
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                      border: "0.03px solid rgba(var(--color-pink))",
                    },
                  }}
                >
                  <Printer
                    height={18}
                    width={18}
                    color={printerAccess !== "Y" || printerAccess === null ? "grey" : "rgba(var(--icon-primary))"}
                    cursor={"pointer"}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </td>
          <td className="border-tableborder border-dashed border-t-[0.20px]">
            <Box className="flex w-[10.5rem] h-full items-center pl-2">
              <Typography
                level="title-md"
                fontSize={13.5}
                fontWeight={600}
                sx={{
                  fontSmooth: "antialiased",
                  fontFamily: "var(--font-varient)",
                  color: "rgba(var(--font-primary-white),0.7)",
                }}
              >
                {data.doc_number}
              </Typography>
            </Box>
          </td>
          <td className="border-tableborder border-dashed border-t-[0.20px]">
            <Box className="flex w-[12rem] justify-center items-center px-2">
              <Typography
                fontSize={13.5}
                textAlign={"center"}
                className="w-full"
                sx={{
                  fontSmooth: "antialiased",
                  fontFamily: "var(--font-varient)",
                  color: "rgba(var(--font-primary-white),0.7)",
                }}
              >
                {data.category_name}
              </Typography>
            </Box>
          </td>
          <td className="border-tableborder border-dashed border-t-[0.20px]">
            <Box className="flex w-[18rem] justify-center items-center px-2">
              <Typography
                level="body-md"
                fontSize={13.5}
                noWrap
                color="neutral"
                textAlign={"center"}
                className="w-full"
                sx={{
                  fontSmooth: "antialiased",
                  fontFamily: "var(--font-varient)",
                  color: "rgba(var(--font-primary-white),0.7)",
                }}
              >
                {data.doc_type_master_name}
              </Typography>
            </Box>
          </td>
          <td className="border-tableborder border-dashed border-t-[0.20px]">
            <Box className="flex w-[12rem] justify-center items-center px-2">
              <Typography
                level="body-md"
                fontSize={13.5}
                noWrap
                textAlign={"center"}
                className="w-full"
                sx={{
                  fontSmooth: "antialiased",
                  fontFamily: "var(--font-varient)",
                  color: "rgba(var(--font-primary-white),0.7)",
                }}
              >
                {data.group_name}
              </Typography>
            </Box>
          </td>
          <td className="border-tableborder border-dashed border-t-[0.20px]">
            <Box className="flex h-full w-[38rem] flex-col">
              <Typography
                fontSize={13.5}
                noWrap
                textAlign={"left"}
                sx={{
                  textTransform: "capitalize",
                  pl: 1,
                  fontFamily: "var(--font-varient)",
                  color: "rgba(var(--font-primary-white),0.7)",
                }}
              >
                {data?.doc_desc.toLocaleLowerCase()}
              </Typography>
            </Box>

          </td>
        </Box>
        :
        <Box>
          <td className="border-tableborder border-dashed border-t-[0.20px] h-10">
            <Box className="flex flex-1 w-16 h-full justify-center items-center">

              {data.isSecure === 0 ? (
                <Tooltip
                  title="Secured open file"
                  placement="left"
                  sx={{ fontSize: "0.8rem" }}
                  color="success"
                >
                  <LockSlash
                    height={18}
                    width={18}
                    color="rgba(var(--icon-primary))"
                    cursor={"pointer"}
                  />
                </Tooltip>
              ) : (
                <Tooltip
                  title="Secured Locked file"
                  placement="left"
                  sx={{ fontSize: "0.8rem" }}
                  color="warning"
                >
                  <Lock
                    height={18}
                    width={18}
                    color="rgba(var(--icon-primary))"
                    cursor={"pointer"}
                  />
                </Tooltip>
              )}
            </Box>
          </td>
          <td className="border-tableborder border-dashed border-t-[0.20px]">
            <Box className="flex w-16 h-full justify-center items-center">
              <Tooltip title="View File" placement="top">
                <IconButton
                  variant="outlined"
                  size="sm"
                  onClick={handleClickViewFile}
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                      border: "0.03px solid rgba(var(--color-pink))",
                    },
                  }}
                >
                  <Presentation
                    height={18}
                    width={18}
                    color="rgba(var(--icon-primary))"
                    cursor={"pointer"}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </td>
          <td className="border-tableborder border-dashed border-t-[0.20px]">
            <Box className="flex w-16 h-full justify-center items-center">
              <Tooltip title="Print File" placement="top">
                <IconButton
                  onClick={printOutProcess}
                  variant="outlined"
                  size="sm"
                  disabled={printerAccess !== "Y" || printerAccess === null}
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                      border: "0.03px solid rgba(var(--color-pink))",
                    },
                  }}
                >
                  <Printer
                    height={18}
                    width={18}
                    color={printerAccess !== "Y" || printerAccess === null ? "grey" : "rgba(var(--icon-primary))"}
                    cursor="pointer"
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </td>
          <td className="border-tableborder border-dashed border-t-[0.20px]">
            <Box className="flex w-[10.5rem] h-full items-center pl-2">
              <Typography
                level="title-md"
                fontSize={13.5}
                fontWeight={600}
                sx={{
                  fontSmooth: "antialiased",
                  fontFamily: "var(--font-varient)",
                  color: "rgba(var(--font-primary-white),0.7)",
                }}
              >
                {data.doc_number}
              </Typography>
            </Box>
          </td>
          <td className="border-tableborder border-dashed border-t-[0.20px]">
            <Box className="flex w-[12rem] justify-center items-center px-2">
              <Typography
                // level="body-md"
                fontSize={13.5}
                // fontWeight={600}
                textAlign={"center"}
                className="w-full"
                sx={{
                  fontSmooth: "antialiased",
                  fontFamily: "var(--font-varient)",
                  color: "rgba(var(--font-primary-white),0.7)",
                }}
              >
                {data.category_name}
              </Typography>
            </Box>
          </td>
          <td className="border-tableborder border-dashed border-t-[0.20px]">
            <Box className="flex w-[18rem] justify-center items-center px-2">
              <Typography
                level="body-md"
                fontSize={13.5}
                // fontWeight={600}
                noWrap
                color="neutral"
                textAlign={"center"}
                className="w-full"
                sx={{
                  fontSmooth: "antialiased",
                  fontFamily: "var(--font-varient)",
                  color: "rgba(var(--font-primary-white),0.7)",
                }}
              >
                {data.doc_type_master_name}
              </Typography>
            </Box>
          </td>
          <td className="border-tableborder border-dashed border-t-[0.20px]">
            <Box className="flex w-[12rem] justify-center items-center px-2">
              <Typography
                level="body-md"
                fontSize={13.5}
                // fontWeight={600}
                noWrap
                // color="neutral"
                textAlign={"center"}
                className="w-full"
                sx={{
                  fontSmooth: "antialiased",
                  fontFamily: "var(--font-varient)",
                  color: "rgba(var(--font-primary-white),0.7)",
                }}
              >
                {data.group_name}
              </Typography>
            </Box>
          </td>
          <td className="border-tableborder border-dashed border-t-[0.20px]">
            <Box className="flex h-full w-[38rem] flex-col">
              <Typography
                // level="body-md"
                fontSize={13.5}
                // fontWeight={600}
                noWrap
                // color="neutral"
                textAlign={"left"}
                sx={{
                  textTransform: "capitalize",
                  pl: 1,
                  fontFamily: "var(--font-varient)",
                  color: "rgba(var(--font-primary-white),0.7)",
                }}
              >
                {data?.doc_desc.toLocaleLowerCase()}
              </Typography>
            </Box>

          </td>
        </Box>
      }
    </>
  );
};

export default memo(TableContentVirtue);
