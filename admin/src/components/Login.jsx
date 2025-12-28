import { useState } from "react";
import Input from "./shared/Input";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  console.log(formData);

  const handleClick = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("hi" + formData.email);
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
            onChange={handleClick}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter the password"
            id="password"
            value={formData.password}
            autoComplete="off"
            required
            onChange={handleClick}
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
