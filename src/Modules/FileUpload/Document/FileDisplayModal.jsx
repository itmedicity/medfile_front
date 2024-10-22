import { Modal, Sheet, Typography } from "@mui/joy";
import React from "react";
import { memo } from "react";
import ModalClose from "@mui/joy/ModalClose";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  //   "pdfjs-dist/build/pdf.worker.min.mjs",
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const FileDisplayModal = ({ openFile, setOpenFile, fileLink }) => {
  const links = "https://www.pdf995.com/samples/pdf.pdf";

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openFile}
      onClose={() => setOpenFile(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          //   maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Document file={links} />
      </Sheet>
    </Modal>
  );
};

export default memo(FileDisplayModal);
