// @ts-nocheck
import { Box, IconButton, Skeleton } from "@mui/joy";
import React from "react";
import { memo } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useState } from "react";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    // "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
    import.meta.url
).toString();
const PdfViewComponent = ({ fileLink }) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }
    return (
        <>
            <Box>
                <p>
                    {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                </p>
                <Box sx={{ display: "flex", justifyContent: "space-between" }} >
                    <IconButton
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                        variant="outlined"
                    >
                        <ArrowBackOutlinedIcon />
                    </IconButton>
                    <IconButton
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                        variant="outlined"
                    >
                        <ArrowForwardOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: "md",
                    height: 'calc(100vh - 180px)',
                    p: 0,
                    overflow: "scroll",
                }}
                onContextMenu={(e) => e.preventDefault()}
            >
                <Box
                    sx={{
                        display: 'flex',
                        overflow: "scroll",
                        justifyContent: 'center'
                    }}
                >
                    {
                        fileLink === '' ?
                            <Skeleton variant="rectangular" sx={{ height: 'calc(100vh - 180px)' }} animation="wave" /> :
                            <Document
                                file={fileLink}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                <Page pageNumber={pageNumber} scale={1.5} />
                            </Document>
                    }
                </Box>
                {/* <ModalClose variant="plain" sx={{ m: 1 }} /> */}
            </Box>
        </>
    )
}

export default memo(PdfViewComponent) 