import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RoootLayouts from "./routes/RoootLayouts";
import Home from "./Pages/Home";

// Rotes

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RoootLayouts />,
    children: [{ path: "/Home", element: <Home /> }],
  },
  // { path: "/", element: <RoootLayouts /> },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
