
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, BookOpen, MessageCircle, Calendar, Award, Verified } from "lucide-react";

interface TeachersSectionProps {
  language: "en" | "ar";
}

const TeachersSection = ({ language }: TeachersSectionProps) => {
  const content = {
    en: {
      badge: "👨‍🏫 Meet Our Experts",
      title: "Learn from the Best",
      subtitle: "Certified professionals with proven track records ready to guide your learning journey",
      viewProfile: "View Profile",
      bookNow: "Book Session",
      messageTeacher: "Message",
      teachers: [
        {
          name: "Ahmed Al-Rashid",
          subject: "Mathematics",
          rating: 4.9,
          reviews: 156,
          experience: "5 years",
          location: "Baghdad, Iraq",
          price: "$25",
          avatar: "A",
          languages: ["Arabic", "English"],
          specialties: ["Algebra", "Calculus", "Statistics"],
          verified: true,
          responseTime: "< 1 hour",
          completedSessions: 450,
        },
        {
          name: "Sarah Johnson",
          subject: "English Literature",
          rating: 4.8,
          reviews: 142,
          experience: "7 years",
          location: "Dubai, UAE",
          price: "$30",
          avatar: "S",
          languages: ["English", "Arabic"],
          specialties: ["Essay Writing", "Grammar", "Reading"],
          verified: true,
          responseTime: "< 30 min",
          completedSessions: 380,
        },
        {
          name: "Omar Hassan",
          subject: "Physics",
          rating: 4.9,
          reviews: 89,
          experience: "4 years",
          location: "Amman, Jordan",
          price: "$28",
          avatar: "O",
          languages: ["Arabic", "English"],
          specialties: ["Mechanics", "Thermodynamics", "Optics"],
          verified: true,
          responseTime: "< 2 hours",
          completedSessions: 320,
        },
      ],
    },
    ar: {
      badge: "👨‍🏫 تعرف على خبرائنا",
      title: "تعلم من الأفضل",
      subtitle: "محترفون معتمدون بسجل حافل مستعدون لتوجيه رحلة التعلم الخاصة بك",
      viewProfile: "عرض الملف الشخصي",
      bookNow: "احجز جلسة",
      messageTeacher: "أرسل رسالة",
      teachers: [
        {
          name: "أحمد الراشد",
          subject: "الرياضيات",
          rating: 4.9,
          reviews: 156,
          experience: "5 سنوات",
          location: "بغداد، العراق",
          price: "25$",
          avatar: "أ",
          languages: ["العربية", "الإنجليزية"],
          specialties: ["الجبر", "التفاضل والتكامل", "الإحصاء"],
          verified: true,
          responseTime: "< ساعة واحدة",
          completedSessions: 450,
        },
        {
          name: "سارة جونسون",
          subject: "الأدب الإنجليزي",
          rating: 4.8,
          reviews: 142,
          experience: "7 سنوات",
          location: "دبي، الإمارات",
          price: "30$",
          avatar: "س",
          languages: ["الإنجليزية", "العربية"],
          specialties: ["كتابة المقالات", "القواعد", "القراءة"],
          verified: true,
          responseTime: "< 30 دقيقة",
          completedSessions: 380,
        },
        {
          name: "عمر حسن",
          subject: "الفيزياء",
          rating: 4.9,
          reviews: 89,
          experience: "4 سنوات",
          location: "عمان، الأردن",
          price: "28$",
          avatar: "ع",
          languages: ["العربية", "الإنجليزية"],
          specialties: ["الميكانيكا", "الديناميكا الحرارية", "البصريات"],
          verified: true,
          responseTime: "< ساعتين",
          completedSessions: 320,
        },
      ],
    },
  };

  return (
    <section id="teachers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border-green-200">
            {content[language].badge}
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content[language].subtitle}
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content[language].teachers.map((teacher, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-white overflow-hidden">
              <CardHeader className="pb-4">
                {/* Teacher Info */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">{teacher.avatar}</span>
                    </div>
                    {teacher.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <Verified className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {teacher.name}
                      {teacher.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                          {language === "en" ? "Verified" : "معتمد"}
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-blue-600 font-medium">
                      {teacher.subject}
                    </CardDescription>
                  </div>
                </div>

                {/* Rating and Price */}
                <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-bold text-gray-900">{teacher.rating}</span>
                    <span className="text-gray-500 text-sm">
                      ({teacher.reviews} {language === "en" ? "reviews" : "مراجعة"})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-600">{teacher.price}</span>
                    <span className="text-gray-500 text-sm">/hr</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <BookOpen className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-900">{teacher.completedSessions}</p>
                    <p className="text-xs text-gray-500">{language === "en" ? "Sessions" : "جلسة"}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <Clock className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-900">{teacher.responseTime}</p>
                    <p className="text-xs text-gray-500">{language === "en" ? "Response" : "استجابة"}</p>
                  </div>
                </div>

                {/* Location and Experience */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{teacher.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">
                      {teacher.experience} {language === "en" ? "experience" : "خبرة"}
                    </span>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-2">
                  {teacher.languages.map((lang, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                      {lang}
                    </Badge>
                  ))}
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {teacher.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs border-blue-200 text-blue-700">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    {content[language].viewProfile}
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <Calendar className="w-4 h-4 mr-1" />
                    {language === "en" ? "Book" : "احجز"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachersSection;
