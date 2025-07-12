import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Settings, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LanguageToggle from "@/components/LanguageToggle";

const Navigation: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { language, setLanguage, isRTL, t } = useLanguage();
  const navigate = useNavigate();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };


 
  if (!isAuthenticated) {

    return (
      <nav className={`bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}>
              <BookOpen className="h-8 w-8 text-blue-600" />
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-gray-900">Darasa</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t("nav.home")}
              </a>
              <a href="#subjects" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t("nav.subjects")}
              </a>
              <a href="#teachers" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t("nav.teachers")}
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t("nav.pricing")}
              </a>
            </div>

            <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-4" : "space-x-4"}`}>
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
              <Link to="/login">
                <Button variant="outline" size="sm">
                  {t("nav.login")}
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  {t("nav.signup")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`bg-white shadow-sm border-b ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}>
            <BookOpen className="h-8 w-8 text-blue-600" />
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Darasa</span>
            </Link>
          </div>

          <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-4" : "space-x-4"}`}>
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
            <span className={`text-sm text-gray-600 ${isRTL ? "text-right" : "text-left"}`}>
              {t("nav.welcome")}, {user?.name}
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
<Button 
  variant="ghost" 
  className="relative h-8 w-8 rounded-full p-0 hover:bg-gray-100"
>          <div className="relative h-8 w-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            <img
          src={`${API_BASE_URL}${user.pic_url.startsWith('/') ? '' : '/'}${user.pic_url}?t=${Date.now()}`}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.currentTarget;
                console.error('Failed to load image:', img.src);
                
                // Fallback to default image
                if (!img.src.includes('default-profile.png')) {
                  img.src = `${API_BASE_URL}/uploads/profile-pics/default-profile.png`;
                } 
                // If default image also fails, show initials as SVG
                else {
                  const initials = getInitials(user?.name || "U");
                  img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="%233b82f6"/><text x="50" y="60" font-family="Arial" font-size="40" fill="white" text-anchor="middle">${initials}</text></svg>`;
                  img.onerror = null; // Prevent infinite loop
                }
              }}
            />
          </div>

                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align={isRTL ? "start" : "end"} forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className={`flex flex-col space-y-1 ${isRTL ? "text-right" : "text-left"}`}>
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate( "/" + user?.role + "-settings")}>
                  <Settings className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  <span>{t("nav.settings")}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  <span>{t("nav.logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
