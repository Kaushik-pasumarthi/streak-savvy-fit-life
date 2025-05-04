
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home,
  Activity,
  HeartPulse,
  Utensils,
  Settings,
  LogOut,
  MessageSquare
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const Sidebar: React.FC = () => {
  const { logout, currentUser } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { path: "/workouts", label: "Workouts", icon: <Activity size={20} /> },
    { path: "/meals", label: "Meals", icon: <Utensils size={20} /> },
    { path: "/health", label: "Health", icon: <HeartPulse size={20} /> },
    { path: "/contact", label: "Support", icon: <MessageSquare size={20} /> },
    { path: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 border-b">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="bg-fitpurple text-white p-1 rounded-md">
            <HeartPulse size={24} />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fitpurple to-fitpurple-dark">
            FitStreak
          </h1>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-fitblue-light rounded-full w-8 h-8 flex items-center justify-center text-fitpurple font-medium">
              {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-sm font-medium">{currentUser?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
            </div>
          </div>
        </div>
        
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-2 text-sm rounded-md transition-colors",
                isActive(item.path)
                  ? "bg-fitpurple-light text-fitpurple-dark font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <button
          onClick={() => logout()}
          className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md w-full"
        >
          <LogOut size={20} className="mr-3" />
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
