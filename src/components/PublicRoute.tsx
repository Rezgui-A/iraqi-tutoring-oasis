import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    // Redirect authenticated users to their appropriate dashboard
    if (user.role === "student") {
      return <Navigate to="/student" replace />;
    } else if (user.role === "teacher") {
      // Check teacher status before redirecting
      if (user.status === "pending" || (user.teacher && user.teacher.verified_status === "pending")) {
        return <Navigate to="/teacher-verification" replace />;
      } else if (user.status === "rejected" || (user.teacher && user.teacher.verified_status === "rejected")) {
        return <Navigate to="/teacher-verification" replace />;
      } else {
        return <Navigate to="/teacher" replace />;
      }
    } else if (user.role === "parent") {
      return <Navigate to="/parent" replace />;
    } else if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    
    // Fallback to homepage if role is not recognized
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
