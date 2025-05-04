
import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  onboardingCompleted: boolean;
}

interface UserHealth {
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number;
  weight?: number;
  fitnessGoal?: string;
  preferredWorkouts?: string[];
  dailyCalorieTarget?: number;
}

interface AuthContextType {
  currentUser: User | null;
  userHealth: UserHealth | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: (healthData: UserHealth) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userHealth, setUserHealth] = useState<UserHealth | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("fitstreak_user");
    const storedHealth = localStorage.getItem("fitstreak_health");
    
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    if (storedHealth) {
      setUserHealth(JSON.parse(storedHealth));
    }
    
    setIsLoading(false);
  }, []);

  // Login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mocked user for demo
    const user: User = {
      id: "user-123",
      email,
      name: email.split('@')[0],
      onboardingCompleted: false
    };
    
    setCurrentUser(user);
    localStorage.setItem("fitstreak_user", JSON.stringify(user));
    setIsLoading(false);
  };

  // Signup function - in a real app, this would call an API
  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mocked user for demo
    const user: User = {
      id: "user-" + Date.now(),
      email,
      name,
      onboardingCompleted: false
    };
    
    setCurrentUser(user);
    localStorage.setItem("fitstreak_user", JSON.stringify(user));
    setIsLoading(false);
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setCurrentUser(null);
    setUserHealth(null);
    localStorage.removeItem("fitstreak_user");
    localStorage.removeItem("fitstreak_health");
    setIsLoading(false);
  };

  // Complete onboarding
  const completeOnboarding = async (healthData: UserHealth) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (currentUser) {
      const updatedUser = { ...currentUser, onboardingCompleted: true };
      setCurrentUser(updatedUser);
      setUserHealth(healthData);
      localStorage.setItem("fitstreak_user", JSON.stringify(updatedUser));
      localStorage.setItem("fitstreak_health", JSON.stringify(healthData));
    }
    
    setIsLoading(false);
  };

  const value = {
    currentUser,
    userHealth,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    signup,
    logout,
    completeOnboarding,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
