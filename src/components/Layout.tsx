import React from "react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
