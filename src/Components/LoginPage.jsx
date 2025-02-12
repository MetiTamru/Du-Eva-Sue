import React, { useState } from "react";
import { FaRegUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsApple } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import bgImage from "../assets/bg7.jpg"; 
import { Link } from "react-router-dom";


function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Blurred Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Glassmorphism Card */}
      <div className="relative backdrop-blur-lg bg-white/30 p-8 rounded-3xl shadow-lg w-[400px] border border-white/40">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <FaRegUser className="text-4xl text-gray-700 bg-white p-2 rounded-full shadow-md" />
        </div>

        {/* Title */}
        <h2 className="text-gray-900 text-2xl font-semibold text-center mb-2">
          Sign in with email
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
        Stay connected, celebrate graduates, and access fellowship events & memories.
        </p>

        {/* Input Fields */}
        <form>
          {/* Email Field */}
          <div className="relative mb-4">
            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 bg-white/50 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Password Field with Visibility Toggle */}
          <div className="relative mb-2">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 bg-white/50 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
            />
            {/* Toggle Button */}
            <button
              type="button"
              className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <div className="text-right text-sm text-blue-500 hover:underline cursor-pointer mb-4">
            <Link to={"/login/forget-password"}>Forgot password?</Link>
            
          </div>

          {/* Login Button */}
          <button className="w-full cursor-pointer bg-black text-white py-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition">
            Get Started
          </button>
        </form>

        {/* Social Login */}
        <p className="lg:text-gray-600 text-gray-300  text-sm text-center my-4"><span className="lg:text-gray-700 text-gray-400 text-2xl  text-center my-4">. . . . . . . . . . </span> Or sign in with  <span className="lg:text-gray-700 text-gray-400  text-2xl text-center my-4">  . . . . . . . . . . </span></p>
        <div className=" pt-2">
          
          <button className="bg-gray-200 w-full cursor-pointer border border-gray-300 rounded-full px-4 py-2 flex items-center justify-center shadow-sm hover:bg-gray-100 active:bg-gray-200 transition duration-200 ease-in-out">
          <FcGoogle className="text-2xl w-5 h-5 mr-2" />
      <span className="text-base font-medium text-gray-700">Continue with Google</span>
    </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
