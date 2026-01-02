import BranchManagement from "../components/pages/BranchManagement";
import BranchManager from "../components/pages/BranchManager";
import Dashboard from "../components/pages/Dashboard";
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
  {
    path: "branchmanager",
    element: <BranchManager />,
  },
];
