import { BookOpen } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SubjectsSection from "@/components/SubjectsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TeachersSection from "@/components/TeachersSection";
import PricingSection from "@/components/PricingSection";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language, isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Main Content */}
      <main>
        <HeroSection language={language} />
        <SubjectsSection language={language} />
        <HowItWorksSection language={language} />
        <TeachersSection language={language} />
        <PricingSection language={language} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">EduConnect</span>
              </div>
              <p className="text-gray-400">{language === "en" ? "Connecting students with qualified tutors across the MENA region." : "ربط الطلاب بالمعلمين المؤهلين في منطقة الشرق الأوسط وشمال أفريقيا."}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{language === "en" ? "Quick Links" : "روابط سريعة"}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === "en" ? "About Us" : "من نحن"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === "en" ? "How it Works" : "كيف يعمل"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{language === "en" ? "Support" : "الدعم"}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === "en" ? "Help Center" : "مركز المساعدة"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === "en" ? "Contact Us" : "تواصل معنا"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === "en" ? "FAQ" : "الأسئلة الشائعة"}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{language === "en" ? "Contact" : "تواصل معنا"}</h3>
              <p className="text-gray-400 mb-2">info@educonnect.com</p>
              <p className="text-gray-400">+964 XXX XXX XXXX</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EduConnect. {language === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
