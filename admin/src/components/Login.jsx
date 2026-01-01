import { useEffect, useState } from "react";
import Input from "./shared/Input";
import { useLoginMutation } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../redux/features/authState";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);
  const [login] = useLoginMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
    if (isAuth) {
      navigate("/admin/dashboard");
    }
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        toast.error("Please fill all the fields");
        return;
      }
      const credentials = await login(formData).unwrap();
      toast.success(`${credentials.message}`);
      dispatch(setUser(credentials?.user));

      return navigate("/admin/dashboard");
    } catch (error) {
      toast.error("error:Something Wrong");
      //alert("error:", error);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-md w-96">
        {/* Login Heading */}
        <h1 className="text-3xl font-bold mb-6">LOGIN</h1>

        {/* Form */}

        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <Input
            label="Email"
            type="text"
            placeholder="Enter the email"
            id="email"
            value={formData.email}
            autoComplete="off"
            required
            onChange={handleChange}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter the password"
            id="password"
            value={formData.password}
            autoComplete="off"
            required
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg mt-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
