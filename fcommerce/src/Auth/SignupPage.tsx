import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../Loaders/ToastContext";
import WaitingLoader from "../Loaders/WaitingLoader";

import signupImage from "../Asset/images/signupImage.jpg";

const SignupPage = () => {
  const navigate = useNavigate()
  const { notifySuccess, notifyError, startWaitingLoader, stopWaitingLoader } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    startWaitingLoader();

    try {
      const res = await axios.post("https://oneworld-fq81.onrender.com/api/User/NewUser", formData);
      stopWaitingLoader();
      notifySuccess(res.data.responseMessage);
      navigate("/login");
      // clear form
      setFormData({
        username: "",
        email: "",
        password: ""
      });
    } catch (error) {
      console.log(error);
      stopWaitingLoader();
      notifyError(error.response.data.responseMessage);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <WaitingLoader />
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex">
        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-[red] items-center justify-center">
          <div className="w-[100%] h-[100%]">
            <img
              src={signupImage}
              alt="Illustration"
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Create an account</h2>
            <p className="text-sm text-gray-500 mb-6">Start your journey with us!</p>

            <form action="submit" onSubmit={handleSignup}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  autoComplete="username"
                  className="mt-1 block w-full px-4 py-2 border-b border-black outline-none sm:text-sm"
                  placeholder="Enter your Username"
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  autoComplete="email"
                  className="mt-1 block w-full px-4 py-2 border-b border-black outline-none sm:text-sm"
                  placeholder="Enter your email"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    className="mt-1 block w-full px-4 py-2 border-b border-black outline-none sm:text-sm"
                    placeholder="Enter your password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full  bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#ce6233]"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="mt-6 text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium ">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;