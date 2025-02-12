import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import bgImage from "../assets/bg7.jpg"; 
import axiosInstance from "./Axios"; // Assuming you have this set up for axios API calls

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Replace with your actual API endpoint for sending the reset code
      const response = await axiosInstance.post('/api/send-reset-code/', { email });
      
      if (response.data.success) {
        setSuccess("A reset code has been sent to your email.");
      } else {
        setError("Failed to send the reset code. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please check your email and try again.");
    } finally {
      setLoading(false);
    }
  };

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
          Enter your email and we will send you a reset code.
        </p>

        {/* Error or Success Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        {/* Input Fields */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="relative mb-4">
            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/50 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              required
            />
          </div>

          {/* Send Code Button */}
          <button
            type="submit"
            className={`w-full mt-3 cursor-pointer bg-black text-white py-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Code"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
