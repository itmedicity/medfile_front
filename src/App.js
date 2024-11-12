import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RoootLayouts from "./routes/RoootLayouts";
import Home from "./Pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Colors from "./Pages/Colors";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import CustomBackDropWithOutState from "./Components/CustomBackDropWithOutState";
import './App.css'

// Main Modules
const Dashboard = lazy(() => import('./Modules/Dashboard/Dashboard.jsx'))
const AdvancedSearch = lazy(() => import('./Modules/Search/AdvancedSearch.jsx'))
const FileUpload = lazy(() => import('./Modules/FileUpload/FileUpload.jsx'))
const Settings = lazy(() => import('./Modules/Settings/Settings.jsx'))

// Sub Modules
const UserManagement = lazy(() => import('./Modules/Settings/UserMangement/UserCreation.jsx'))
const DocTypeMaster = lazy(() => import('./Modules/Settings/DocumentTypeMaster/DoctypeMaster.jsx'))
const SubTypeMaster = lazy(() => import('./Modules/Settings/SubTypeMaster/SubTypeMaster.jsx'))
const DocCategory = lazy(() => import('./Modules/Settings/DocumentCategory/DocCategoryMaster.jsx'))
const DocSubCategory = lazy(() => import('./Modules/Settings/DocumentSubCategory/DocumentSubCategory.jsx'))
const DocGroup = lazy(() => import('./Modules/Settings/DocumentGroup/DocumentGroup.jsx'))
const InstituteTypeMaster = lazy(() => import('./Modules/Settings/InstituteTypeMaster/InstituteTypeMaster.jsx'))
const InstitutionMaster = lazy(() => import('./Modules/Settings/InstitutionMaster/InstitutionMaster.jsx'))
const CourseType = lazy(() => import('./Modules/Settings/CourseType/CourseType.jsx'))
const CourseMaster = lazy(() => import('./Modules/Settings/CourseMaster/CourseMaster.jsx'))


const routes = createBrowserRouter([
  {
    path: '/',
    element: <RoootLayouts />,
    children: [],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/Home', element: <Home />,
        children: [
          { path: 'Dashboard', element: <Dashboard /> },
          { path: 'AdvancedSearch', element: <AdvancedSearch /> },
          { path: 'FileUpload', element: <FileUpload /> },
          { path: 'Settings', element: <Settings /> },
          { path: 'UserManagement', element: <UserManagement /> },
          { path: 'DocTypeMaster', element: <DocTypeMaster /> },
          { path: 'SubTypeMaster', element: <SubTypeMaster /> },
          { path: 'DocCategory', element: <DocCategory /> },
          { path: 'DocSubCategory', element: <DocSubCategory /> },
          { path: 'DocGroup', element: <DocGroup /> },
          { path: 'InstituteTypeMaster', element: <InstituteTypeMaster /> },
          { path: 'InstitutionMaster', element: <InstitutionMaster /> },
          { path: 'CourseType', element: <CourseType /> },
          { path: 'CourseMaster', element: <CourseMaster /> },
          { path: 'Color', element: <Colors /> },
        ],
      },
      { path: "/Color", element: <Colors /> },
    ],
  },
]);

const queryClient = new QueryClient()

function App() {
  return <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </Suspense>
}

export default App;
