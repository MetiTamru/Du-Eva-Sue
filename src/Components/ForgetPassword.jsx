import React, { useState } from "react";
import { FaRegUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsApple } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import bgImage from "../assets/bg7.jpg"; 


function ForgetPassword() {
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
          Forgot Password?
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
        Enter your email and we will send you a restart code.
        </p>

        {/* Input Fields */}
        <form>
          {/* Email Field */}
          <div className="relative  mb-4">
            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 bg-white/50 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Password Field with Visibility Toggle */}
         

          

          {/* Login Button */}
          <button className="w-full mt-3 cursor-pointer bg-black text-white py-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition">
            Send Code
          </button>
        </form>

        {/* Social Login */}
       
        
      </div>
    </div>
  );
}

export default ForgetPassword;

