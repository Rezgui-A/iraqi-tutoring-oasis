import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "student" | "teacher" | "parent" | "admin";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = `/${user?.role}`;
    return <Navigate to={redirectPath} replace />;
  }

  // Additional check for teachers accessing teacher routes
  if (requiredRole === "teacher" && user?.role === "teacher") {
    if (user.status === "pending" || (user.teacher && user.teacher.verified_status === "pending")) {
      return <Navigate to="/teacher-verification" replace />;
    }
    if (user.status === "rejected" || (user.teacher && user.teacher.verified_status === "rejected")) {
      return <Navigate to="/teacher-verification" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
