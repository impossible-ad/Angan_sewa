import { createBrowserRouter } from "react-router-dom";
import ManagerLayout from "../layout/ManagerLayout";
import PublicLayout from "../layout/PublicLayout";
import NotFound from "../components/shared/NotFound";
import { managerRoutes } from "./ManagerRoutes";
import { publicRoutes } from "./PublicRoutes";

const indexRouter = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  {
    path: "/manager",
    element: <ManagerLayout />,

    children: managerRoutes,
  },
  {
    path: "",
    element: <PublicLayout />,

    children: publicRoutes,
  },
]);
export default indexRouter;
