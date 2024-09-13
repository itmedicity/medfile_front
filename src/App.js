import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RoootLayouts from "./routes/RoootLayouts";
import Home from "./Pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Colors from "./Pages/Colors";

const Dashboard = lazy(() => import('./Modules/Dashboard/Dashboard.jsx'))
const AdvancedSearch = lazy(() => import('./Modules/Search/AdvancedSearch.jsx'))
const FileUpload = lazy(() => import('./Modules/FileUpload/FileUpload.jsx'))
const Settings = lazy(() => import('./Modules/Settings/Settings.jsx'))

// Rotes

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
          { path: 'Color', element: <Colors /> },
        ],
      },
      { path: "/Color", element: <Colors /> },
    ],
  },
]);

function App() {
  return <Suspense fallback={<div>Loading...</div>} >
    <RouterProvider router={routes} />
  </Suspense>
}

export default App;
