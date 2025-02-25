import { Box, Modal, ModalDialog, Typography } from '@mui/joy';
import React, { memo, useCallback } from 'react';
import { format } from 'date-fns';
import axiosApi from '../../../Axios/Axios';
import { errorNofity, succesNofity } from '../../../Constant/Constant';
import { QueryClient } from "react-query";

const FileDelete = ({ data, deleteModal, setDeleteModal, refetchDocDetl }) => {


    const onDelete = useCallback(async () => {
        // console.log(data);

        const obj = {
            docActiveStatus: 2,
            docCreateUser: Number(data.docCreateUser),
            doc_id: Number(data.doc_id),
            filename: data.filename,
            docEditDate: format(new Date(), "yyyy-MM-dd HH:mm"),
            docd_slno: Number(data.docd_slno)
        }

        // console.log("obj", obj);


        try {
            const updateRes = await axiosApi.patch("/docMaster/DocDelete", obj);
            const { success } = updateRes.data;
            if (success === 1) {
                refetchDocDetl()
                succesNofity("Document Deleted Successfully");
                QueryClient.invalidateQueries(["getDocumentNumber", "getDocList"]);


            }
            // console.log(updateRes)
        } catch (error) {
            // console.log(error)
            errorNofity("Something went wrong".error);
        }



    }, [data, setDeleteModal])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={deleteModal}
            onClose={() => setDeleteModal(false)}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "all 0.5s ease-in-out",
                backgroundColor: "transparent",
            }}
        >
            <ModalDialog
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: 24,
                }}
            >
                <Typography
                    id="modal-title"
                    textColor="inherit"
                    sx={{
                        fontWeight: "md",
                        // mb: 2,
                        fontFamily: "var(--font-family)",
                        color: "rgba(var(--font-primary-white))",
                    }}
                >
                    Are You Sure You Want to Delete This File?
                </Typography>

                {/* Button Section */}
                <Box className="flex justify-between w-full">

                    <Box className="flex flex-col p-1 border-[0.1rem] mx-0"
                        sx={{ borderColor: "rgba(var(--border-primary))", position: 'relative', p: 0.8, cursor: "pointer" }}

                        onClick={() => {
                            onDelete(); // Trigger the delete function
                            setDeleteModal(false); // Close the modal after deletion
                        }}>
                        <Typography>YES</Typography>
                    </Box>



                    <Box className="flex flex-col p-1 border-[0.1rem] mx-0"
                        sx={{ borderColor: "rgba(var(--border-primary))", position: 'relative', p: 0.8, cursor: "pointer" }}

                        onClick={() => {
                            // onClose(); // Trigger the delete function
                            setDeleteModal(false); // Close the modal after deletion
                        }}>
                        <Typography>NO</Typography>
                    </Box>

                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default memo(FileDelete);

