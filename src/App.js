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

// Main Modules
const Dashboard = lazy(() => import('./Modules/Dashboard/Dashboard.jsx'))
const AdvancedSearch = lazy(() => import('./Modules/Search/AdvancedSearch.jsx'))
const FileUpload = lazy(() => import('./Modules/FileUpload/FileUpload.jsx'))
const Settings = lazy(() => import('./Modules/Settings/Settings.jsx'))

// Sub Modules
const UserManagement = lazy(() => import('./Modules/Settings/UserMangement/UserCreation.jsx'))

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
          { path: 'Color', element: <Colors /> },
        ],
      },
      { path: "/Color", element: <Colors /> },
    ],
  },
]);

const queryClient = new QueryClient()

function App() {
  return <Suspense fallback={<div>Loading...</div>} >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </Suspense>
}

export default App;
