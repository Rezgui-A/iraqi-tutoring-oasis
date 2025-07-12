/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "teacher" | "parent" | "admin";
  phone?: string;
  language?: string;
  status: string;
  student?: any;
  teacher?: any;
  parent?: any;
  pic_url?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<{ userId: number; otpCode: string }>;
  confirmOtp: (userId: number, code: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "student" | "teacher" | "parent";
  language: string;
  grade_level?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token and get user data
      fetchUserProfile(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);

      // Fetch user profile and get the user data directly
      const profileResponse = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      });

      if (profileResponse.ok) {
        const userData = await profileResponse.json();
        setUser(userData);

        // Redirect based on user role using the fresh userData
        if (userData.role === "student") {
          navigate("/student");
        } else if (userData.role === "teacher") {
          // Check teacher status before redirecting
          if (userData.status === "pending" || (userData.teacher && userData.teacher.verified_status === "pending")) {
            navigate("/teacher-verification");
          } else if (userData.status === "rejected" || (userData.teacher && userData.teacher.verified_status === "rejected")) {
            // For rejected teachers, you might want to show a different page
            navigate("/teacher-verification");
          } else {
            navigate("/teacher");
          }
        } else if (userData.role === "parent") {
          navigate("/parent");
        } else if (userData.role === "admin") {
          navigate("/admin");
        }
      } else {
        // Token is invalid, remove it
        localStorage.removeItem("token");
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      return { userId: data.userId, otpCode: data.otpCode };
    } catch (error) {
      throw error;
    }
  };

  const confirmOtp = async (userId: number, code: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/confirm-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "OTP confirmation failed");
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await fetchUserProfile(token);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    confirmOtp,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
