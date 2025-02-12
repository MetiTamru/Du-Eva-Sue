import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./Components/AuthContext";


import { useAuth } from "./Components/AuthContext";
import HomePage from "./Pages/HomePage";
import Admin from "./Pages/Admin";
import LoginPage from "./Components/LoginPage";
import ForgetPassword from "./Components/ForgetPassword";
import ProtectedRoute from "./Components/ProtectedRoute";
import Signup from "./Components/Signup";


const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

const AuthenticatedLayout = () => (
  <div className="app-container">
    
    <div className="content-container">
      <Routes>
        <Route element={<ProtectedRoute roles={['admin', 'user']} />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route path="/sell/view-sell" element={<Admin />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  </div>
);

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/forget-password" element={<ForgetPassword />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <Route path="*" element={<AuthenticatedLayout />} />
      )}
    </Routes>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApp = async () => {
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    loadApp();
  }, []);

  return (
    <AuthProvider>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <AppRoutes />
      )}
    </AuthProvider>
  );
}

export default App;
