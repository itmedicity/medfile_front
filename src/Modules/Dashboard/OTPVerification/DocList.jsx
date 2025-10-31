

import React, { Fragment, memo, useCallback, useRef } from "react";
import { Modal, ModalDialog } from "@mui/joy";
import FileLink from "../../../assets/images/pdfSvg2.svg";

const DocList = ({ activeFilenames, proceedBtn, setproceedBtn, activeFile }) => {
    const printRef = useRef(null);

    const handlePrint = useCallback(() => {
        if (!activeFilenames || activeFilenames.length === 0 || !activeFile) return;

        const isPDF = activeFile.type === "application/pdf";
        const printWindow = window.open("", "_blank");

        if (!printWindow) return;

        if (isPDF) {
            // Just show the PDF in an iframe, no auto-print
            const htmlContent = `
      <html>
        <head>
          <title>View PDF</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
            iframe {
              border: none;
              width: 100vw;
              height: 100vh;
            }
          </style>
        </head>
        <body>
          <iframe src="${activeFile.url}" allow="autoplay" width="100%" height="100%"></iframe>
        </body>
      </html>
    `;
            printWindow.document.open();
            printWindow.document.write(htmlContent);
            printWindow.document.close();
        } else {
            // For images (jpeg/png), auto-print
            const htmlContent = `
      <html>
        <head>
          <title>Print Image</title>
          <style>
            body {
              text-align: center;
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            img {
              max-width: 90%;
              height: auto;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <h2>File to Print</h2>
          <img src="${activeFile.url}" alt="${activeFile.originalname || 'Image'}" />
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function () {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `;
            printWindow.document.open();
            printWindow.document.write(htmlContent);
            printWindow.document.close();
        }
    }, [activeFilenames, activeFile]);


    return (
        <Fragment>
            <Modal open={proceedBtn} onClose={() => setproceedBtn(false)}>
                <ModalDialog size="md">
                    <div ref={printRef} style={{ maxHeight: "400px", overflowY: "auto", bgcolor: "green" }}>
                        <div style={{ marginBottom: "10px" }}>
                            <img
                                // src={activeFile?.url}
                                src={activeFile?.type === "application/pdf" ? FileLink : activeFile?.url}
                                alt={`File`}
                                width={300}
                                height={300}
                                style={{
                                    borderRadius: "5px",
                                    objectFit: "contain",
                                    maxWidth: "100%",
                                    height: "auto"
                                }}
                            />
                        </div>
                    </div>
                    <button
                        onClick={handlePrint}
                        style={{
                            marginTop: "10px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            cursor: "pointer",
                        }}
                    >
                        Print Files
                    </button>
                </ModalDialog>
            </Modal>
        </Fragment>
    );
};

export default memo(DocList);

