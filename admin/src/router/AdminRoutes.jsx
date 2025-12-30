import Dashboard from "../components/Dashboard";
import BranchManagement from "../components/pages/BranchManagement";
import Districts from "../components/pages/Districts";
import Profile from "../components/pages/Profile";
import Provinces from "../components/pages/Provinces";

export const adminRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "province",
    element: <Provinces />,
  },
  {
    path: "district",
    element: <Districts />,
  },
  {
    path: "branchmanagement",
    element: <BranchManagement />,
  },
];
