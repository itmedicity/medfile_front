import React, { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RoootLayouts from "./routes/RoootLayouts";
import Home from "./Pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Colors from "./Pages/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomBackDropWithOutState from "./Components/CustomBackDropWithOutState";
import "./App.css";
import { AuthProvider } from "./Context/AuthProvider";
import ErrorElement from "./Pages/ErrorElement";
import { socket } from "./ws/socket";
import { toast, ToastContainer } from "react-toastify";

// Main Modules
const Dashboard = lazy(() => import("./Modules/Dashboard/Dashboard.jsx"));
const AdvancedSearch = lazy(() =>
  import("./Modules/Search/AdvancedSearch.jsx")
);
const FileUpload = lazy(() => import("./Modules/FileUpload/FileUpload.jsx"));
const Settings = lazy(() => import("./Modules/Settings/Settings.jsx"));

// Sub Modules
const UserManagement = lazy(() => import("./Modules/Settings/UserMangement/UserCreation.jsx"));
const DocTypeMaster = lazy(() => import("./Modules/Settings/DocumentTypeMaster/DoctypeMaster.jsx"));
const SubTypeMaster = lazy(() => import("./Modules/Settings/SubTypeMaster/SubTypeMaster.jsx"));
const DocCategory = lazy(() => import("./Modules/Settings/DocumentCategory/DocCategoryMaster.jsx"));
const DocSubCategory = lazy(() => import("./Modules/Settings/DocumentSubCategory/DocumentSubCategory.jsx"));
const DocGroup = lazy(() => import("./Modules/Settings/DocumentGroup/DocumentGroup.jsx"));
const InstituteTypeMaster = lazy(() => import("./Modules/Settings/InstituteTypeMaster/InstituteTypeMaster.jsx"));
const InstitutionMaster = lazy(() => import("./Modules/Settings/InstitutionMaster/InstitutionMaster.jsx"));
const CourseType = lazy(() => import("./Modules/Settings/CourseType/CourseType.jsx"));
const CourseMaster = lazy(() => import("./Modules/Settings/CourseMaster/CourseMaster.jsx"));
const RackMaster = lazy(() => import("./Modules/Settings/RackMaster/RackMaster.jsx"));
const LocationMaster = lazy(() => import("./Modules/Settings/LocationMaster/LocationMaster.jsx"));
const CustodianMaster = lazy(() => import("./Modules/Settings/CustomdienMaster/CustodianMaster.jsx"));
const CustodianDepartment = lazy(() => import("./Modules/Settings/CustodienDepartment/CustodianDepartment.jsx"));
const FileApprovals = lazy(() => import("./Modules/FileApprovals/FileApprovals.jsx"));
const ModuleGroupMaster = lazy(() => import("./Modules/Settings/ModuleGroupMaster/ModuleGroupMaster.jsx"))
const MenuNameMaster = lazy(() => import("./Modules/Settings/MenuNameMaster/MenuNameMaster.jsx"))
const UserTypeMaster = lazy(() => import("./Modules/Settings/UserTypeMaster/UserTypeMaster.jsx"))
const UserGroupRights = lazy(() => import("./Modules/Settings/UserGroupRights/UserGroupRights.jsx"))
const ModuleNameMaster = lazy(() => import("./Modules/Settings/ModuleNameMaster/ModuleNameMaster.jsx"))
const DocumentNestedCategory = lazy(() => import("./Modules/Settings/DocumentNestedCategory/DocumentNestedCategory.jsx"))
const AuditReport = lazy(() => import("./Modules/AuditReport/AuditReportMain.jsx"))
const DocMastAuditReport = lazy(() => import("./Modules/AuditReport/DocMasterAudit/DocMasterAudit.jsx"))
const DocDetlAuditReport = lazy(() => import("./Modules/AuditReport/DocDetlAuditReport/DocDetlAuditReport.jsx"))
const UserAuditReport = lazy(() => import("./Modules/AuditReport/UserAuditReport/UserAuditReport.jsx"))
const DocTypeAuditReport = lazy(() => import("./Modules/AuditReport/DocTypeAuditReport/DocTypeAuditReport.jsx"))
const DocSubTypeReport = lazy(() => import("./Modules/AuditReport/DocSubTypeReport/DocSubTypeReport.jsx"))
const DocCategoryReport = lazy(() => import("./Modules/AuditReport/DocCategoryReport/DocCategoryReport.jsx"))
const DocSubCategoryReport = lazy(() => import("./Modules/AuditReport/DocSubCategoryReport/DocSubCategoryReport.jsx"))
const DocNestedCategoryReport = lazy(() => import("./Modules/AuditReport/DocNestedCategoryReport/DocNestedCategoryReport.jsx"))
const DocGroupAuditReport = lazy(() => import("./Modules/AuditReport/DocGroupAuditReport/DocGroupAuditReport.jsx"))
const InstituteTypeAuditReport = lazy(() => import("./Modules/AuditReport/InstituteTypeAuditReport/InstituteTypeAuditReport.jsx"))
const InstituteMastAuditReport = lazy(() => import("./Modules/AuditReport/InstituteMastAuditReport/InstituteMastAuditReport.jsx"))
const CourseTypeAuditReport = lazy(() => import("./Modules/AuditReport/CourseTypeAuditReport/CourseTypeAuditReport.jsx"))
const CourseAuditReport = lazy(() => import("./Modules/AuditReport/CourseAuditReport/CourseAuditReport.jsx"))
const LocationAuditReport = lazy(() => import("./Modules/AuditReport/LocationAuditReport/LocationAuditReport.jsx"))
const RackAuditReport = lazy(() => import("./Modules/AuditReport/RackAuditReport/RackAuditReport.jsx"))
const CustodianAuditReport = lazy(() => import("./Modules/AuditReport/CustodianAuditReport/CustodianAuditReport.jsx"))
const CustodianMasterAuditReport = lazy(() => import("./Modules/AuditReport/CustodianMasterAuditReport/CustodianMasterAuditReport.jsx"))

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RoootLayouts />,
    children: [],
    errorElement: <ErrorElement />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/Home",
        element: <Home />,
        children: [
          {
            path: "Dashboard", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <Dashboard />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "AdvancedSearch", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <AdvancedSearch />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "FileUpload", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <FileUpload />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Settings", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <Settings />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "FileSearch", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <FileApprovals />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "AuditReport", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <AuditReport />
              </Suspense>, errorElement: <ErrorElement />
          },
          { path: "UserManagement", element: <UserManagement />, errorElement: <ErrorElement /> },
          { path: "DocTypeMaster", element: <DocTypeMaster />, errorElement: <ErrorElement /> },
          { path: "SubTypeMaster", element: <SubTypeMaster />, errorElement: <ErrorElement /> },
          { path: "DocCategory", element: <DocCategory />, errorElement: <ErrorElement /> },
          { path: "DocSubCategory", element: <DocSubCategory />, errorElement: <ErrorElement /> },
          { path: "DocGroup", element: <DocGroup />, errorElement: <ErrorElement /> },
          { path: "InstituteTypeMaster", element: <InstituteTypeMaster />, errorElement: <ErrorElement /> },
          { path: "InstitutionMaster", element: <InstitutionMaster />, errorElement: <ErrorElement /> },
          { path: "CourseType", element: <CourseType />, errorElement: <ErrorElement /> },
          { path: "CourseMaster", element: <CourseMaster />, errorElement: <ErrorElement /> },
          { path: "RackMaster", element: <RackMaster />, errorElement: <ErrorElement /> },
          { path: "LocationMaster", element: <LocationMaster />, errorElement: <ErrorElement /> },
          { path: "CustodianMaster", element: <CustodianMaster />, errorElement: <ErrorElement /> },
          { path: "CustodianDepartment", element: <CustodianDepartment />, errorElement: <ErrorElement /> },
          { path: "Color", element: <Colors />, errorElement: <ErrorElement /> },
          { path: "ModuleGroupMaster", element: <ModuleGroupMaster />, errorElement: <ErrorElement /> },
          { path: "MenuNameMaster", element: <MenuNameMaster />, errorElement: <ErrorElement /> },
          { path: "UserTypeMaster", element: <UserTypeMaster />, errorElement: <ErrorElement /> },
          { path: "UserGroupRights", element: <UserGroupRights />, errorElement: <ErrorElement /> },
          { path: "ModuleNameMaster", element: <ModuleNameMaster />, errorElement: <ErrorElement /> },
          { path: "DocumentNestedCategory", element: <DocumentNestedCategory />, errorElement: <ErrorElement /> },

          //audit report
          { path: "DocMastAuditReport", element: <DocMastAuditReport />, errorElement: <ErrorElement /> },
          { path: "DocDetlAuditReport", element: <DocDetlAuditReport />, errorElement: <ErrorElement /> },
          { path: "UserAuditReport", element: <UserAuditReport />, errorElement: <ErrorElement /> },
          { path: "DocTypeAuditReport", element: <DocTypeAuditReport />, errorElement: <ErrorElement /> },
          { path: "DocSubTypeReport", element: <DocSubTypeReport />, errorElement: <ErrorElement /> },
          { path: "DocCategoryReport", element: <DocCategoryReport />, errorElement: <ErrorElement /> },
          { path: "DocSubCategoryReport", element: <DocSubCategoryReport />, errorElement: <ErrorElement /> },
          { path: "DocNestedCategoryReport", element: <DocNestedCategoryReport />, errorElement: <ErrorElement /> },
          { path: "DocGroupAuditReport", element: <DocGroupAuditReport />, errorElement: <ErrorElement /> },
          { path: "InstituteTypeAuditReport", element: <InstituteTypeAuditReport />, errorElement: <ErrorElement /> },
          { path: "InstituteMastAuditReport", element: <InstituteMastAuditReport />, errorElement: <ErrorElement /> },
          { path: "CourseTypeAuditReport", element: <CourseTypeAuditReport />, errorElement: <ErrorElement /> },
          { path: "CourseAuditReport", element: <CourseAuditReport />, errorElement: <ErrorElement /> },
          { path: "LocationAuditReport", element: <LocationAuditReport />, errorElement: <ErrorElement /> },
          { path: "RackAuditReport", element: <RackAuditReport />, errorElement: <ErrorElement /> },
          { path: "CustodianAuditReport", element: <CustodianAuditReport />, errorElement: <ErrorElement /> },
          { path: "CustodianMasterAuditReport", element: <CustodianMasterAuditReport />, errorElement: <ErrorElement /> },

        ],
      },
      { path: "/Color", element: <Colors /> },
    ],
    errorElement: <ErrorElement />,
  },
]);

const queryClient = new QueryClient();

function App() {

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("multiple-login", (message) => {
      console.log(message);
      localStorage.removeItem("app_auth");
      toast.error(
        <div className='flex h-20 flex-col' >{message}</div>, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Redirect to login page
      setTimeout(() => {
        // warningNofity(message);
        window.location.href = "/";
      }, 3000); // Wait 3 seconds before redirecting
    });

    // socket.on("disconnect", () => {
    //   console.log("Disconnected");
    // });

    // return () => {
    //   socket.disconnect();
    // };

  }, [])

  useLayoutEffect(() => {
    document.body.classList.add("light");
  }, []);
  {/* <CustomBackDropWithOutState message={"Loading..."} /> */ }
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <AuthProvider>
        <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
          <RouterProvider router={routes} />
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
