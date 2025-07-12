import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { authTranslations } from "./translations/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TeacherVerification from "./pages/Teachers/TeacherVerification";
import Student from "./pages/Students/Index";
import NotFound from "./pages/NotFound";
import TeacherDashboard from "./pages/Teachers/Index";
import ParentDashboard from "./pages/Parents/Index";
import AdminDashboard from "./pages/Admin/Index";
import ParentSettings from "./pages/Parents/settings";
import StudentSettings from "./pages/Students/settings";
import TeacherSettings from "./pages/Teachers/settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider translations={authTranslations}>
          <AuthProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <Signup />
                    </PublicRoute>
                  }
                />
                <Route path="/teacher-verification" element={<TeacherVerification />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route
                  path="/student/*"
                  element={
                    <ProtectedRoute requiredRole="student">
                      <Student />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/teacher/*"
                  element={
                    <ProtectedRoute requiredRole="teacher">
                      <TeacherDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/parent/*"
                  element={
                    <ProtectedRoute requiredRole="parent">
                      <ParentDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                
      <Route
        path="/parent-settings"
        element={
          <ProtectedRoute requiredRole="parent">
            <ParentSettings />
          </ProtectedRoute>
        }
      />      <Route
        path="/student-settings"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentSettings />
          </ProtectedRoute>
        }
      /> <Route
        path="/teacher-settings"
        element={
          <ProtectedRoute requiredRole="teacher">
            <TeacherSettings />
          </ProtectedRoute>
        }
      />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
