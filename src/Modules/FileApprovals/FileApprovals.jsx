// @ts-nocheck
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Box, Tooltip, IconButton } from "@mui/joy";
import DefaultPageLayout from '../../Components/DefaultPageLayout'
import EditDocUpload from "../FileUpload/Document/EditDocUpload";
import CustomBackDropWithOutState from "../../Components/CustomBackDropWithOutState";
import { ToastContainer } from "react-toastify";
import { getDocumentList, getNonSecDocumentList } from "../../api/commonAPI";
import { errorNofity } from "../../Constant/Constant";
import DocumentApprovals from "../FileUpload/Document/DocumentApprovals";
import { CheckCircle, SecurityPass, WarningCircle } from "iconoir-react";

const localData = localStorage.getItem("app_auth");
const credValue = atob(JSON.parse(localData)?.authType);

const FileApprovals = () => {

    const [tableData, setTableData] = useState([]);

    const { isLoading, data, error } = useQuery({
        queryKey: ["getDocList"],
        queryFn: Number(credValue) === 1 ? getNonSecDocumentList : getDocumentList,
        staleTime: Infinity,
        refetchOnWindowFocus: false
    });

    // console.log("tableData:", tableData);

    useEffect(() => {
        if (data) {
            setTableData(data);
        }
    }, [data]);

    if (isLoading) <CustomBackDropWithOutState message={"Loading..."} />;
    if (error) errorNofity(error);

    const renderCmp = useCallback((params) => (<DocumentApprovals {...{ params }} />), []);

    const approvalStatus = useCallback((params) => {
        const status = params.value; // Get the apprvl_status value
        if (status === 1) {
            return (
                <Box className="flex w-16 h-full justify-center items-center">
                    <Tooltip title="Approved" placement="right">
                        <CheckCircle
                            height={18}
                            width={18}
                            color="rgba(var(--icon-approve-clr))"
                        />
                    </Tooltip>
                </Box>
            )
        }
        else {
            return (
                <Box className="flex w-16 h-full justify-center items-center">
                    <Tooltip title="Not Approved" placement="right">
                        <WarningCircle
                            height={18}
                            width={18}
                            color="rgba(var(--icon-notapprove-clr))"
                        />
                    </Tooltip>
                </Box>
            )
        }
    }, []);


    const columns = useMemo(() => [
        { field: "docslno", headerName: "Slno", width: 50, },
        { field: "actions", headerName: 'Actions', width: 70, type: 'actions', renderCell: renderCmp },
        { field: "apprvl_status", headerName: "Status", width: 70, renderCell: approvalStatus },
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

    const rows = useMemo(() => tableData || [], [tableData]);
    const pagination = { page: 0, pageSize: 25 };
    const paginationModel = useMemo(() => pagination, [pagination]);

    return (
        <DefaultPageLayout label={"Document Approval"} >
            <div className='flex h ' style={{ minHeight: 'calc(100vh - 20dvh)' }} >

                <Box sx={{ height: '80vh', overflow: 'hidden', width: '100%', maxWidth: '100vw', p: 1, }}>
                    {/* <ToastContainer /> */}
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
                        }}
                    />
                </Box>

            </div>
        </DefaultPageLayout>
    )
}

export default memo(FileApprovals)