// @ts-nocheck
import React, { memo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { getDocumentList } from "../../../api/commonAPI";
import { useQuery } from "@tanstack/react-query";
import { errorNofity } from "../../../Constant/Constant";
import CustomBackDropWithOutState from "../../../Components/CustomBackDropWithOutState";
import { ToastContainer } from "react-toastify";

const DocuementList = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["getDocList"],
    queryFn: getDocumentList,
  });

  if (isLoading) <CustomBackDropWithOutState message={"Loading..."} />;
  if (error) errorNofity(error);
  console.log(data);
  const columns = [
    { field: "doc_slno", headerName: "Slno", width: 70 },
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
    { field: "doc_date", headerName: "Doc Date", width: 170, type: "Date" },
    { field: "doc_ver_date", headerName: "Doc Version", width: 170 },
  ];

  //   const columns = [
  //     { field: "id", headerName: "ID", width: 70 },
  //     { field: "firstName", headerName: "First name", width: 130 },
  //     { field: "lastName", headerName: "Last name", width: 130 },
  //     {
  //       field: "age",
  //       headerName: "Age",
  //       type: "number",
  //       width: 90,
  //     },
  //     {
  //       field: "fullName",
  //       headerName: "Full name",
  //       description: "This column has a value getter and is not sortable.",
  //       sortable: false,
  //       width: 160,
  //       valueGetter: (value, row) =>
  //         `${row.firstName || ""} ${row.lastName || ""}`,
  //     },
  //   ];

  const rows = data;

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Paper sx={{ height: 400, overflow: "scroll", mx: 2 }}>
      <ToastContainer />
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default memo(DocuementList);
