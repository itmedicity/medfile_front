import React, { memo } from 'react'
import Modal from '@mui/joy/Modal'
import Sheet from '@mui/joy/Sheet'
import { CssVarsProvider, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import Button from '@mui/joy/Button'

const ReqImageDisModal = ({ openFile, setOpenFile, UploadedImages }) => {
    const fileType = UploadedImages?.blob?.type

    // console.log("fileType:::", fileType);


    return (
        <CssVarsProvider>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openFile}
                onClose={() => setOpenFile(false)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxHeight: window.innerHeight - 80
                }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        minWidth: '50%',
                        borderRadius: 'sm',
                        p: 2,
                        boxShadow: 'lg',
                        height: window.innerHeight - 100
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            borderRadius: 1,
                            border: '0.1px solid grey',
                            margin: 'auto',
                            height: window.innerHeight - 180,
                            overflow: 'auto',
                            '::-webkit-scrollbar': { display: 'none' }
                        }}
                    >
                        {fileType?.startsWith('image') ? (
                            <img
                                src={UploadedImages?.url}
                                alt={UploadedImages?.imageName || 'Preview'}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        ) : fileType === 'application/pdf' ? (
                            <embed
                                src={`${UploadedImages?.url}#toolbar=0&navpanes=0&view=FitH`}
                                type="application/pdf"
                                width="100%"
                                height="100%"
                            />
                        ) : (
                            <Typography level="h6" color="neutral">
                                Unsupported file type
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <Button variant="outlined" color="secondary" onClick={() => setOpenFile(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Sheet>
            </Modal>
        </CssVarsProvider>
    )
}

export default memo(ReqImageDisModal)