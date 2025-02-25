import React, { Fragment, memo, useCallback, useRef } from "react";
import { Modal, ModalDialog } from "@mui/joy";
import { NAS_FLDR } from "../../../Constant/Static";

const DocList = ({ activeFilenames, proceedBtn, setproceedBtn }) => {
    const printRef = useRef(null);

    const handlePrint = useCallback(() => {
        if (!activeFilenames || activeFilenames.length === 0) return;

        const fileUrls = activeFilenames.map(
            (val) => `<img src="${NAS_FLDR}${val.doc_number}/${val.filename}`

        ).join("");
        // Open print window
        const printWindow = window.open("",);
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Files</title>
                </head>
                <body>
                    <h2>Files to Print</h2>
                    <div>${fileUrls}</div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    }, [activeFilenames]);

    return (
        <Fragment>
            <Modal open={proceedBtn} onClose={() => setproceedBtn(false)}>
                <ModalDialog size="md">
                    <div ref={printRef} style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {Array.isArray(activeFilenames) && activeFilenames.length > 0 ? (
                            activeFilenames?.map((file, index) => (
                                <div key={index} style={{ marginBottom: "10px" }}>
                                    <img
                                        src={`${NAS_FLDR}${file.doc_number}/${file.filename}`}
                                        alt={`File ${index}`}
                                        width={300}
                                        height={300}
                                        style={{ borderRadius: "5px", objectFit: "contain" }}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No files available.</p>
                        )}
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
