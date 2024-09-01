import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RoootLayouts from "./routes/RoootLayouts";
import Home from "./Pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";

// Rotes

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RoootLayouts />,
    // children: [{ path: "/Home", element: <Home /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/Home", element: <Home />,
        children: [
          // { path: "/Search", element: <Home /> }
        ],
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
