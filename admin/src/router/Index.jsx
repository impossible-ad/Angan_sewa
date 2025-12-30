import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { adminRoutes } from "./AdminRoutes";
import Notfound from "../components/shared/PageNotFound";
import Login from "../components/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: adminRoutes,
  },
]);
