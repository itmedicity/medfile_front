// @ts-nocheck
import React, { memo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { getDocumentList } from "../../../api/commonAPI";
import { useQuery } from "@tanstack/react-query";
import { errorNofity } from "../../../Constant/Constant";
import CustomBackDropWithOutState from "../../../Components/CustomBackDropWithOutState";
import { ToastContainer } from "react-toastify";
import { format } from "date-fns";
import { Box } from "@mui/joy";
import EditDocUpload from "./EditDocUpload";

const DocuementList = () => {

    const { isLoading, data, error } = useQuery({
        queryKey: ["getDocList"],
        queryFn: getDocumentList,
    });

    if (isLoading) <CustomBackDropWithOutState message={"Loading..."} />;
    if (error) errorNofity(error);

    const columns = [
        { field: "actions", headerName: 'Actions', type: 'actions', width: 100, renderCell: (params) => (<EditDocUpload {...{ params }} />) },
        { field: "doc_slno", headerName: "Slno", width: 70, },
        { field: "doc_id", headerName: "Doc ID", width: 70, type: "number" },
        { field: "doc_number", headerName: "Doc Number", width: 160 },
        { field: "doc_name", headerName: "Doc Name", width: 200 },
        { field: "doc_desc", headerName: "Doc Description", width: 200 },
        { field: "doc_type_master_name", headerName: "Do Type", width: 300 },
        { field: "doc_sub_type_name", headerName: "Doc Sub Type", width: 250 },
        { field: "institution_name", headerName: "Institution", width: 100 },
        { field: "course_name", headerName: "Course", width: 100 },
        { field: "category_name", headerName: "Category", width: 200 },
        { field: "subcat_name", headerName: "Sub Category", width: 300 },
        { field: "group_name", headerName: "Group", width: 200 },
        { field: "docDate", headerName: "Doc Date", width: 170, },
        { field: "docVersion", headerName: "Doc Version", width: 170 },
    ];

    const rows = data

    const paginationModel = { page: 0, pageSize: 25 };

    return (
        <Box sx={{ height: '80vh', overflow: 'hidden', width: '100%', maxWidth: '100vw' }}>
            <ToastContainer />
            <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={35}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[25, 50, 75, 100]}
                columnHeaderHeight={35}
                // checkboxSelection
                sx={{
                    display: 'flex',
                    border: 0.5,
                    borderColor: 'rgba(var(--border-primary))',
                    color: 'rgba(var(--font-primary-white))',
                    '&.MuiDataGrid-root .MuiDataGrid-row--borderBottom': {
                        backgroundColor: 'rgba(var(--font-darkGrey))',
                        color: 'rgba(var(--font-primary-white))',
                        // borderColor: 'red',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        color: 'rgba(var(--color-white))',
                    },
                }}
            // onRowClick={(e) => console.log(e)}
            />
        </Box>
    );
};

export default memo(DocuementList);
