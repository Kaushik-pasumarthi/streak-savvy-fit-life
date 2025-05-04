
import React, { useState } from "react";
import { Menu, Bell, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <div className="border-b bg-white sticky top-0 z-10">
      <div className="flex h-16 items-center px-4">
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu size={20} />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
        )}
        
        <div className="flex-1">
          {!isMobile && (
            <h1 className="text-lg font-semibold">
              FitStreak
            </h1>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {!isSearchOpen ? (
            <>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                <Search size={18} />
                <span className="sr-only">Search</span>
              </button>
              
              <button className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-gray-100 relative">
                <Bell size={18} />
                <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
                <span className="sr-only">Notifications</span>
              </button>
              
              <Link
                to="/settings"
                className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                <User size={18} />
                <span className="sr-only">Profile</span>
              </Link>
            </>
          ) : (
            <div className="relative w-full max-w-sm">
              <input
                type="text" 
                placeholder="Search..." 
                className="w-full h-9 pl-9 pr-4 rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-fitpurple"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
