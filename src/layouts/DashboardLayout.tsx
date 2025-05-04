
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Loader2 } from "lucide-react";

const DashboardLayout: React.FC = () => {
  const { isAuthenticated, isLoading, currentUser } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
    
    // If authenticated but onboarding not completed, redirect to onboarding
    if (!isLoading && isAuthenticated && currentUser && !currentUser.onboardingCompleted) {
      navigate('/onboarding');
    }
  }, [isAuthenticated, isLoading, navigate, currentUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-fitpurple h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {!isMobile && <Sidebar />}
      
      <div className="flex-1">
        <Navbar />
        <main className="container py-6 px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
