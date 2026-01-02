import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSignoutMutation } from "../redux/features/authSlice";
import { clearUser } from "../redux/features/authState";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuItems = [
    { name: "Profile", path: "/admin/profile" },
    { name: "Province", path: "/admin/province" },
    { name: "District", path: "/admin/district" },
    { name: "Branch Management", path: "/admin/branchmanagement" },
    { name: "Branch Manager", path: "/admin/branchmanager" },
  ];

  const [signOut] = useSignoutMutation();
  const handleSignOut = async () => {
    try {
      await signOut().unwrap();
      dispatch(clearUser());
      navigate("/");
    } catch (error) {
      toast.error("failed to signOut");
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-8">
        <button
          onClick={handleSignOut}
          className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
