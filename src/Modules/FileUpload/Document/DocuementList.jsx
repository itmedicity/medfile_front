// @ts-nocheck
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { getDocumentList, getNonSecDocumentList } from "../../../api/commonAPI";
import { useQuery } from "@tanstack/react-query";
import { errorNofity } from "../../../Constant/Constant";
import CustomBackDropWithOutState from "../../../Components/CustomBackDropWithOutState";
import { ToastContainer } from "react-toastify";
import { format } from "date-fns";
import { Box } from "@mui/joy";
import EditDocUpload from "./EditDocUpload";

const DocuementList = ({ userType }) => {

    // const { isLoading, data, error } = useQuery({
    //     queryKey: ["getDocList"],
    //     queryFn: getDocumentList,
    //     refetchOnWindowFocus: false
    // });

    const [tableData, setTableData] = useState([]);

    const { isLoading, data, error } = useQuery({
        queryKey: ["getDocList"],
        queryFn: Number(userType) === 1 ? getNonSecDocumentList : getDocumentList,
        staleTime: Infinity,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (data) {
            setTableData(data);
        }
    }, [data]);

    if (isLoading) <CustomBackDropWithOutState message={"Loading..."} />;
    if (error) errorNofity(error);

    const renderCmp = useCallback((params) => (<EditDocUpload  {...{ params }} />), []);

    const columns = useMemo(() => [
        { field: "actions", headerName: 'Actions', width: 100, type: 'actions', renderCell: renderCmp },
        { field: "doc_slno", headerName: "Slno", width: 70, },
        { field: "doc_id", headerName: "Doc ID", width: 70, type: "number" },
        { field: "doc_number", headerName: "Doc Number", width: 160 },
        { field: "doc_name", headerName: "Doc Name", width: 200 },
        { field: "docVer", headerName: "Version", width: 80 },
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
    ], [renderCmp]);

    const rows = useMemo(() => tableData, [tableData])
    const pagination = { page: 0, pageSize: 25 };
    const paginationModel = useMemo(() => pagination, [pagination]);

    return (
        <Box sx={{ height: '80vh', overflow: 'hidden', width: '100%', maxWidth: '100vw', }}>
            <ToastContainer />
            {/* <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={35}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[25, 50, 75, 100]}
                columnHeaderHeight={35}
                sx={{
                    display: 'flex',
                    border: 0.5,
                    borderColor: 'rgba(var(--border-primary))',
                    color: 'rgba(var(--font-primary-white))',
                    '&.MuiDataGrid-root .MuiDataGrid-row--borderBottom': {
                        backgroundColor: 'rgba(var(--font-darkGrey))',
                        color: 'rgba(var(--font-primary-white))',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        color: 'rgba(var(--color-white))',
                    },
                }}
            /> */}
            <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={35}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[25, 50, 75, 100]}
                columnHeaderHeight={35}
                sx={{
                    display: 'flex',
                    border: 0.5,
                    borderColor: 'rgba(var(--border-primary))',
                    color: 'rgba(var(--font-primary-white))',
                    '&.MuiDataGrid-root .MuiDataGrid-row--borderBottom': {
                        backgroundColor: 'rgba(var(--font-darkGrey))',
                        color: 'rgba(var(--font-primary-white))',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        color: 'rgba(var(--color-white))',
                    },
                    // Styling the pagination dropdown button (page size options)
                    '& .MuiTablePagination-select': {
                        color: 'rgba(var(--font-primary-white))',  // Change the text color
                        backgroundColor: 'rgba(var(--background-dropdown))',  // Change background color
                        '&:hover': {
                            backgroundColor: 'rgba(var(--background-hover-dropdown))', // Background color on hover
                        },
                    },
                    '& .MuiTablePagination-selectIcon': {
                        color: 'rgba(var(--icon-color))', // Change the icon color
                    }
                }}
            />
        </Box>
    );
};

export default memo(DocuementList);
