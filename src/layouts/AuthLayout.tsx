
import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AuthLayout: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If user is authenticated and has completed onboarding, redirect to dashboard
    if (isAuthenticated && currentUser?.onboardingCompleted) {
      navigate('/dashboard');
    }
    // If user is authenticated but hasn't completed onboarding, redirect to onboarding
    else if (isAuthenticated && !currentUser?.onboardingCompleted && location.pathname !== '/onboarding') {
      navigate('/onboarding');
    }
  }, [isAuthenticated, currentUser, navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fitpurple-light via-background to-fitblue-light">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg animate-fade-in">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fitpurple to-fitpurple-dark">
            FitStreak
          </h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
