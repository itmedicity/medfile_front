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
import { warningNofity } from "./Constant/Constant";

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
          { path: "Dashboard", element: <Dashboard />, errorElement: <ErrorElement /> },
          { path: "AdvancedSearch", element: <AdvancedSearch />, errorElement: <ErrorElement /> },
          { path: "FileUpload", element: <FileUpload />, errorElement: <ErrorElement /> },
          { path: "Settings", element: <Settings />, errorElement: <ErrorElement /> },
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
          { path: "Color", element: <Colors />, errorElement: <ErrorElement /> },
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
      warningNofity(message);
      // Redirect to login page
      window.location.href = "/";
    });

  }, [])

  useLayoutEffect(() => {
    document.body.classList.add("light");
  }, []);

  return (
    <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
