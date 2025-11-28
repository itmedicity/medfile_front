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
import JSZip from "jszip";
import axiosApi from "../../../Axios/Axios";

const TableContentVirtue = ({ data, credValue, printerAccess }) => {
  console.log(data, "data");

  const [otpModal, setOtpModal] = useState(false)

  const {
    data: AllsuperUsers
  } = useQuery({
    queryKey: ["SuperUsersDtl"],
    queryFn: getAllSuperUsers
  })

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  // const [UploadedImagesall, setUploadedImagesall] = useState([])

  const handleClickViewFile = useCallback(async (e) => {
    e.preventDefault();
    setOpen(true);
    const docID = data?.doc_id;
    const doc_number = data?.doc_number;
    const fetchBulkFile = await getDocumentDetl(docID);
    // setFiles(fetchBulkFile);


    const getImage = async (doc_number) => {
      try {
        const result = await axiosApi.get(`/docMaster/getFilesall/${doc_number}`, {
          responseType: 'blob'
        });

        const contentType = result.headers['content-type'] || '';
        if (contentType?.includes('application/json')) {
          return;
        } else {
          const zip = await JSZip.loadAsync(result.data);
          // Extract image files (e.g., .jpg, .png)
          const imageEntries = Object.entries(zip.files).filter(
            ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
          );
          const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
            // Get the original blob (no type)
            const originalBlob = await fileObj.async('blob');
            // Determine MIME type based on filename extension (or any other logic)
            let mimeType = '';
            if (filename.endsWith('.pdf')) {
              mimeType = 'application/pdf';
            } else if (filename.endsWith('.png')) {
              mimeType = 'image/png';
            } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
              mimeType = 'image/jpeg';
            } else {
              mimeType = 'application/octet-stream'; // fallback
            }
            // Recreate blob with correct type
            const blobWithType = new Blob([originalBlob], { type: mimeType });
            // Create URL from new blob
            const url = URL.createObjectURL(blobWithType);
            return { imageName: filename, url, blob: blobWithType };
          });
          const images = await Promise.all(imagePromises);
          // setUploadedImagesall(images)

          // console.log("images:", images);

          // console.log("fetchBulkFile:", fetchBulkFile);

          const enrichedItems = fetchBulkFile.map(itm => {
            const matchedUpload = images.find(uploaded => uploaded.imageName === itm.filename);
            return {
              docActiveStatus: itm.docActiveStatus,
              docCreateUser: itm.docCreateUser,
              docCreatedDate: itm.docCreatedDate,
              docVer: itm.docVer,
              docVerDate: itm.docVerDate,
              docVer_amentment: itm.docVer_amentment,
              doc_id: itm.doc_id,
              doc_number: itm.doc_number,
              docd_slno: itm.docd_slno,
              dovVer_infoAment: itm.dovVer_infoAment,
              filename: itm.filename,
              mimetype: itm.mimetype,
              name: itm.name,
              originalname: itm.originalname,
              url: matchedUpload?.url,
              imageName: matchedUpload?.imageName,
              type: matchedUpload?.blob?.type

            };
          });
          setFiles(enrichedItems);
          // console.log("enrichedItems::", enrichedItems);
        }
      } catch (error) {
        console.error('Error fetching or processing images:', error);
      }
    }
    getImage(doc_number)

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
            <Box className="flex w-16 h-full justify-center items-center" >
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
