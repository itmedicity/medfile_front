import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RoootLayouts from "./routes/RoootLayouts";
import Home from "./Pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Colors from "./Pages/Colors";

// Rotes

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RoootLayouts />,
    children: [],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/Home",
        element: <Home />,
        children: [
          // { path: "/Search", element: <Colors /> },
          // { path: "/Color", element: <Colors /> },
        ],
      },
      { path: "/Color", element: <Colors /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
