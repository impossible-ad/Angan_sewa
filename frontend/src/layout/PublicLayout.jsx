import { Outlet } from "react-router-dom";
import Navbar from "../components/pages/publicpages/Navbar";
import Footer from "../components/pages/publicpages/Footer";

const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
