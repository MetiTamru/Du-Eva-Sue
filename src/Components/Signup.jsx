import React, { useState } from "react";
import { FaRegUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import bgImage from "../assets/bg7.jpg"; 
import { Link } from "react-router-dom";
import axiosInstance from "./Axios";

import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth(); 
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true); // Start loading state

    try {
      // Sign up logic
      const response = await axiosInstance.post('/auth/users/', {
        email,
        password,
        name,
        role: "user",
      });
      console.log(response.data);

      try {
        const response = await axiosInstance.post('/api/token/', {
          email,
          password
        });

        const { access, refresh } = response.data;
        
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        await userDetail(email);
        
      } catch (err) {
        setError('Invalid email or password');
      }

    } catch (err) {
      setError('An error occurred during sign-up');
    } finally {
      setLoading(false); // End loading state
    }
  };

  const userDetail = async (email) => {
    try {
      const response = await axiosInstance.get(`/api/user-detail/?email=${email}`);
      console.log("Raw response data:", response.data);

      let data;
      if (typeof response.data === 'string') {
        data = JSON.parse(response.data);
      } else {
        data = response.data;
      }

      const userData = data[0];
      if (userData && userData.fields) {
        const { name, role } = userData.fields;
        const lowerCaseRole = role.toLowerCase();

        localStorage.setItem('userRole', lowerCaseRole);
        localStorage.setItem('name', name);

        setUser({ email, role: lowerCaseRole, name });
        navigate("/");

      } else {
        console.error("Unexpected data structure or fields is undefined");
      }

    } catch (err) {
      console.error("Error fetching user details:", err);
      setError('Invalid email or password');
    }
  };

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <div className="relative backdrop-blur-lg bg-white/30 p-8 rounded-3xl shadow-lg w-[400px] border border-white/40">
        <div className="flex justify-center mb-4">
          <FaRegUser className="text-4xl text-gray-700 bg-white p-2 rounded-full shadow-md" />
        </div>

        <h2 className="text-gray-900 text-2xl font-semibold text-center mb-2">
          Create an account
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Join us and start enjoying all the benefits!
        </p>

        <form>
          <div className="relative mb-4">
            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Full Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 bg-white/50 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div className="relative mb-4">
            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 bg-white/50 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div className="relative mb-2">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-white/50 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
            />
            <button
              type="button"
              id="password"
              className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <div className="relative mt-4 mb-2">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-white/50 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
            />
            <button
              type="button"
              id="confirmPassword"
              className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className={`w-full mt-3 cursor-pointer bg-black text-white py-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <p className="text-center text-sm mt-3 text-gray-400 lg:text-gray-200">
            Already have an account?{' '}
            <Link to="/login">
              <span className="text-blue-400 lg:text-blue-600">Log in here</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
