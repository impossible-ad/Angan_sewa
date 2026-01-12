import { Home } from "../components/pages/publicpages/Home";
import Login from "../components/shared/Login";

export const publicRoutes = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "/login",
    element:<Login/>
  }
];
