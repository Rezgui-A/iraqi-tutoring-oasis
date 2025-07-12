
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Settings, BookOpen, Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!isAuthenticated) {
    return (
      <nav className={`bg-white/95 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-gray-100 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}>
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Darasa
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-10">
              <a href="#home" className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium group">
                {t("nav.home")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#subjects" className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium group">
                {t("nav.subjects")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#teachers" className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium group">
                {t("nav.teachers")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#pricing" className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium group">
                {t("nav.pricing")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            {/* Right Section */}
            <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-4" : "space-x-4"}`}>
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
              
              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    {t("nav.signup")}
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl">
              <div className="px-2 pt-4 pb-6 space-y-2">
                <a href="#home" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                  {t("nav.home")}
                </a>
                <a href="#subjects" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                  {t("nav.subjects")}
                </a>
                <a href="#teachers" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                  {t("nav.teachers")}
                </a>
                <a href="#pricing" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                  {t("nav.pricing")}
                </a>
                
                <div className="pt-4 border-t border-gray-100 space-y-2 md:hidden">
                  <Link to="/login" className="block">
                    <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium">
                      {t("nav.login")}
                    </Button>
                  </Link>
                  <Link to="/signup" className="block">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium">
                      {t("nav.signup")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }

  return (
    <nav className={`bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Darasa
              </span>
            </Link>
          </div>

          {/* Right Section */}
          <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-6" : "space-x-6"}`}>
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
            
            {/* Welcome Message */}
            <div className="hidden sm:block">
              <span className={`text-sm text-gray-600 font-medium ${isRTL ? "text-right" : "text-left"}`}>
                {t("nav.welcome")}, <span className="text-gray-800">{user?.name}</span>
              </span>
            </div>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-12 w-12 rounded-full p-0 hover:bg-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-gray-200 hover:ring-blue-300 transition-all duration-300">
                    <AvatarImage 
                      src={user?.pic_url ? `${API_BASE_URL}${user.pic_url.startsWith('/') ? '' : '/'}${user.pic_url}?t=${Date.now()}` : undefined}
                      alt="Profile"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-semibold">
                      {getInitials(user?.name || "U")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl" align={isRTL ? "start" : "end"} forceMount>
                <DropdownMenuLabel className="font-normal p-3">
                  <div className={`flex flex-col space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                    <p className="text-base font-semibold leading-none text-gray-900">{user?.name}</p>
                    <p className="text-sm leading-none text-gray-500">{user?.email}</p>
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit">
                      {user?.role}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem 
                  onClick={() => navigate("/" + user?.role + "-settings")}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Settings className={`h-4 w-4 text-gray-500 ${isRTL ? "ml-3" : "mr-3"}`} />
                  <span className="font-medium text-gray-700">{t("nav.settings")}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center p-3 rounded-lg hover:bg-red-50 cursor-pointer transition-colors text-red-600"
                >
                  <LogOut className={`h-4 w-4 ${isRTL ? "ml-3" : "mr-3"}`} />
                  <span className="font-medium">{t("nav.logout")}</span>
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
