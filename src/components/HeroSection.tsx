
import { Button } from "@/components/ui/button";
import { Play, BookOpen, Users, Award, ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  language: "en" | "ar";
}

const HeroSection = ({ language }: HeroSectionProps) => {
  const content = {
    en: {
      badge: "🚀 Trusted by 10,000+ students worldwide",
      title: "Master Any Subject with Expert Tutors",
      subtitle: "Your Success, Our Mission",
      description: "Transform your learning journey with personalized 1-on-1 tutoring from certified experts across the MENA region. Get homework help, exam preparation, and skill building in Arabic and English.",
      cta: "Start Learning Today",
      watchDemo: "Watch How It Works",
      guarantee: "✓ 100% Satisfaction Guaranteed",
      stats: {
        students: "10,000+ Happy Students",
        tutors: "500+ Expert Tutors",
        subjects: "50+ Subjects Available",
        satisfaction: "98% Success Rate",
      },
    },
    ar: {
      badge: "🚀 موثوق من قبل أكثر من 10,000 طالب حول العالم",
      title: "أتقن أي مادة مع مدرسين خبراء",
      subtitle: "نجاحك، مهمتنا",
      description: "غيّر رحلة تعلمك مع دروس خصوصية شخصية من خبراء معتمدين في منطقة الشرق الأوسط وشمال أفريقيا. احصل على مساعدة في الواجبات، التحضير للامتحانات، وبناء المهارات باللغتين العربية والإنجليزية.",
      cta: "ابدأ التعلم اليوم",
      watchDemo: "شاهد كيف يعمل",
      guarantee: "✓ ضمان الرضا 100%",
      stats: {
        students: "+10,000 طالب سعيد",
        tutors: "+500 مدرس خبير",
        subjects: "+50 مادة متاحة",
        satisfaction: "98% معدل نجاح",
      },
    },
  };

  return (
    <section id="home" className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Trust Badge */}
            <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors">
              {content[language].badge}
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  {content[language].title}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-blue-600">
                {content[language].subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              {content[language].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {content[language].cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 h-auto border-2 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                <Play className="w-5 h-5 mr-2" />
                {content[language].watchDemo}
              </Button>
            </div>

            {/* Guarantee */}
            <p className="text-green-600 font-medium flex items-center justify-center lg:justify-start gap-2">
              {content[language].guarantee}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {[
                { icon: Users, stat: content[language].stats.students, color: "text-blue-600" },
                { icon: BookOpen, stat: content[language].stats.tutors, color: "text-green-600" },
                { icon: Award, stat: content[language].stats.subjects, color: "text-purple-600" },
                { icon: Star, stat: content[language].stats.satisfaction, color: "text-orange-600" },
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                  <p className="font-semibold text-gray-900 text-sm">{item.stat}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {language === "en" ? "Live Tutoring Session" : "جلسة تدريس مباشرة"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === "en" ? "Mathematics - Grade 10" : "الرياضيات - الصف العاشر"}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                  {language === "en" ? "Live" : "مباشر"}
                </Badge>
              </div>

              {/* Video Area */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-48 flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                <Play className="w-16 h-16 text-gray-400 relative z-10" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white text-xs">
                  <span className="bg-black/50 px-2 py-1 rounded">45:32</span>
                  <span className="bg-black/50 px-2 py-1 rounded">🔴 REC</span>
                </div>
              </div>

              {/* Session Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <span className="text-sm font-medium">Ahmad Al-Rashid</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">$25</p>
                  <p className="text-xs text-gray-500">
                    {language === "en" ? "per hour" : "في الساعة"}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-lg animate-bounce">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-500 rounded-full p-3 shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
