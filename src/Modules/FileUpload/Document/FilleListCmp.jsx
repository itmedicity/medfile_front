import { Box, IconButton, Tooltip } from "@mui/joy";
import React, { Fragment, memo, useCallback } from "react";
import FileLink from "../../../assets/images/pdfSvg2.svg";
import { NAS_FOLDER } from "../../../Constant/Static";
import { useState } from "react";
import FileDisplayModal from "./FileDisplayModal";
import { BinMinusIn, PageEdit } from 'iconoir-react'
import { format } from "date-fns";
import FileReplaceModal from "./FileReplaceModal";
import FileDelete from "./FileDelete";

const FilleListCmp = ({ data, refetchDocDetl }) => {

    const {
        // docd_slno,
        // doc_id,
        doc_number,
        originalname,
        mimetype,
        filename,
        docVer,
        docVerDate,
        // docCreateUser,
        name,
        docCreatedDate,
        docActiveStatus,
        // docVer_amentment,
        // dovVer_infoAment,
    } = data
    const NasFileLink = `${NAS_FOLDER}${doc_number}/${filename}`
    // console.log("docActiveStatus,doc_number", docActiveStatus, doc_number);


    const [openFile, setOpenFile] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const docEditButton = useCallback((e) => {
        setEditModal(true)
    }, [setEditModal])

    // console.log("editModal", editModal);

    const docDeleteButton = useCallback(() => {
        setDeleteModal(true)

    }, [])

    return (
        <Fragment>
            {deleteModal === true ? (
                <FileDelete refetchDocDetl={refetchDocDetl} data={data} deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
            ) : editModal === true ? (
                <FileReplaceModal refetchDocDetl={refetchDocDetl} data={data} editModal={editModal} setEditModal={setEditModal} />
            ) : (
                <Box className="p-1 border-[0.5px] rounded-md h-16 flex flex-1 flex-row mb-1 bg-bgcard border-borderprimary justify-between gap-1">
                    {openFile && (
                        <FileDisplayModal openFile={openFile} setOpenFile={setOpenFile} fileLink={NasFileLink} />
                    )}
                    <Box
                        className="flex rounded-md items-center justify-center cursor-pointer hover:bg-baseWhite/85 bg-baseWhite/60 drop-shadow-md"
                        onClick={() => setOpenFile(true)}
                    >
                        <img
                            alt="upload image"
                            src={mimetype === "application/pdf" ? FileLink : NasFileLink}
                            width={50}
                            height={50}
                            className="p-[0.300rem] rounded-md object-contain"
                        />

                    </Box>
                    <Box className="flex rounded-md flex-col pl-2 p-0 overflow-hidden flex-1">
                        <div
                            className="flex text-[0.690rem]"
                            style={{
                                fontFamily: "var(--font-family)",
                                color: "rgba(var(--font-primary-white))",
                                fontWeight: "bold",
                                lineHeight: "0.890rem",
                                textDecoration: docActiveStatus === 2 ? "line-through" : "none",
                            }}
                        >
                            {doc_number}
                        </div>
                        <div
                            className="flex text-[0.6rem]"
                            style={{
                                fontFamily: "var(--font-family)",
                                color: "rgba(var(--font-primary-white))",
                                lineHeight: "0.790rem",
                            }}
                        >
                            <p className="truncate w-[90%]">{originalname}</p>
                        </div>
                        <div
                            className="flex text-[0.6rem] justify-between"
                            style={{
                                fontFamily: "var(--font-family)",
                                color: "rgba(var(--font-primary-white))",
                                lineHeight: "0.790rem",
                            }}
                        >
                            <p>version date : {format(docVerDate, "dd-MM-yyyy hh:mm a")}</p>
                            <p>version : {docVer}</p>
                        </div>
                        <div
                            className="flex text-[0.6rem] justify-between"
                            style={{
                                fontFamily: "var(--font-family)",
                                color: "rgba(var(--font-primary-white))",
                                lineHeight: "0.790rem",
                            }}
                        >
                            <p>created user : {name}</p>
                            <p>Date : {format(docCreatedDate, "dd-MM-yyyy hh:mm a")}</p>
                        </div>
                    </Box>

                    <Box className="flex w-20 justify-center items-center gap-1">
                        {/* Edit Button */}
                        <Box>
                            <IconButton
                                onClick={(e) => {
                                    if (docActiveStatus !== 0) {
                                        e.preventDefault(); // Prevent action if not status 0 or 2
                                    } else {
                                        docEditButton(e); // Trigger the edit function
                                    }
                                }}
                                disabled={docActiveStatus !== 0 && docActiveStatus !== 2} // Disable only if status is not 0 or 2
                                variant="outlined"
                                size="sm"
                                sx={{
                                    ":hover": {
                                        bgcolor: "transparent", // Keep transparent on hover
                                    },
                                    opacity: docActiveStatus === 2 ? 0.5 : 1, // Apply opacity if status is 2 (struck)
                                }}
                            >
                                <Tooltip title="Edit">
                                    <PageEdit
                                        fontSize="small"
                                        color="rgba(var(--icon-primary))"
                                        style={{
                                            color: docActiveStatus === 2 ? "gray" : docActiveStatus === 0 ? "rgba(var(--icon-primary))" : "gray", // Gray if struck (status 2), blue if enabled (status 0), red if disabled (status 1)
                                            pointerEvents: docActiveStatus === 2 ? "none" : "auto", // Disable pointer events if status is 2
                                        }}
                                    />
                                </Tooltip>
                            </IconButton>
                        </Box>

                        {/* Delete Button */}
                        <Box>
                            <IconButton
                                onClick={(e) => docDeleteButton(e)} // Trigger delete function
                                // disabled={docActiveStatus === 1 || docActiveStatus === 2} // Disable if status is 1 or 2
                                variant="outlined"
                                size="sm"
                                sx={{
                                    ":hover": {
                                        bgcolor: "transparent", // Keep transparent on hover
                                    },
                                    opacity: docActiveStatus === 2 ? 0.5 : 1, // Apply opacity if status is 2 (struck)
                                }}
                            >
                                <BinMinusIn fontSize="small" color="rgba(var(--icon-primary))" />
                            </IconButton>
                        </Box>
                    </Box>

                </Box>
            )}
        </Fragment>

    );
};

export default memo(FilleListCmp);
