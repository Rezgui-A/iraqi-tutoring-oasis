import { Button } from "@/components/ui/button";
import { Play, BookOpen, Users, Award } from "lucide-react";

interface HeroSectionProps {
  language: "en" | "ar";
}

const HeroSection = ({ language }: HeroSectionProps) => {
  const content = {
    en: {
      title: "Connect with Expert Tutors",
      subtitle: "Across the MENA Region",
      description: "Join thousands of students getting personalized homework help and tutoring in Arabic and English. Book your session today!",
      cta: "Find Your Tutor",
      watchDemo: "Watch Demo",
      stats: {
        students: "10,000+ Students",
        tutors: "500+ Tutors",
        subjects: "50+ Subjects",
        satisfaction: "98% Satisfaction",
      },
    },
    ar: {
      title: "تواصل مع مدرسين خبراء",
      subtitle: "في منطقة الشرق الأوسط وشمال أفريقيا",
      description: "انضم إلى آلاف الطلاب الذين يحصلون على مساعدة شخصية في الواجبات والدروس الخصوصية باللغتين العربية والإنجليزية. احجز جلستك اليوم!",
      cta: "ابحث عن مدرسك",
      watchDemo: "شاهد العرض التوضيحي",
      stats: {
        students: "+10,000 طالب",
        tutors: "+500 مدرس",
        subjects: "+50 مادة",
        satisfaction: "98% رضا",
      },
    },
  };

  return (
    <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-green-600/10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {content[language].title}
              <span className="block text-blue-600">{content[language].subtitle}</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{content[language].description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                {content[language].cta}
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Play className="w-5 h-5 mr-2" />
                {content[language].watchDemo}
              </Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">{content[language].stats.students}</p>
              </div>
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">{content[language].stats.tutors}</p>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">{content[language].stats.subjects}</p>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">{content[language].stats.satisfaction}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 transform rotate-3 shadow-xl">
              <div className="bg-white rounded-2xl p-6 transform -rotate-3 shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{language === "en" ? "Live Tutoring Session" : "جلسة تدريس مباشرة"}</h3>
                    <p className="text-gray-600">{language === "en" ? "Mathematics - Grade 10" : "الرياضيات - الصف العاشر"}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Play className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{language === "en" ? "45 min session" : "جلسة 45 دقيقة"}</span>
                    <span className="text-lg font-semibold text-blue-600">{language === "en" ? "$25/hour" : "25$ / ساعة"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
