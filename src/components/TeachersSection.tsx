import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, BookOpen } from "lucide-react";

interface TeachersSectionProps {
  language: "en" | "ar";
}

const TeachersSection = ({ language }: TeachersSectionProps) => {
  const content = {
    en: {
      title: "Meet Our Top Tutors",
      subtitle: "Qualified professionals ready to help you succeed",
      viewProfile: "View Profile",
      bookNow: "Book Session",
      teachers: [
        {
          name: "Ahmed Al-Rashid",
          subject: "Mathematics",
          rating: 4.9,
          reviews: 156,
          experience: "5 years",
          location: "Baghdad, Iraq",
          price: "$25/hour",
          languages: ["Arabic", "English"],
          specialties: ["Algebra", "Calculus", "Statistics"],
        },
        {
          name: "Sarah Johnson",
          subject: "English Literature",
          rating: 4.8,
          reviews: 142,
          experience: "7 years",
          location: "Dubai, UAE",
          price: "$30/hour",
          languages: ["English", "Arabic"],
          specialties: ["Essay Writing", "Grammar", "Reading"],
        },
        {
          name: "Omar Hassan",
          subject: "Physics",
          rating: 4.9,
          reviews: 89,
          experience: "4 years",
          location: "Amman, Jordan",
          price: "$28/hour",
          languages: ["Arabic", "English"],
          specialties: ["Mechanics", "Thermodynamics", "Optics"],
        },
      ],
    },
    ar: {
      title: "تعرف على أفضل مدرسينا",
      subtitle: "محترفون مؤهلون مستعدون لمساعدتك على النجاح",
      viewProfile: "عرض الملف الشخصي",
      bookNow: "احجز جلسة",
      teachers: [
        {
          name: "أحمد الراشد",
          subject: "الرياضيات",
          rating: 4.9,
          reviews: 156,
          experience: "5 سنوات",
          location: "بغداد، العراق",
          price: "25$ / ساعة",
          languages: ["العربية", "الإنجليزية"],
          specialties: ["الجبر", "التفاضل والتكامل", "الإحصاء"],
        },
        {
          name: "سارة جونسون",
          subject: "الأدب الإنجليزي",
          rating: 4.8,
          reviews: 142,
          experience: "7 سنوات",
          location: "دبي، الإمارات",
          price: "30$ / ساعة",
          languages: ["الإنجليزية", "العربية"],
          specialties: ["كتابة المقالات", "القواعد", "القراءة"],
        },
        {
          name: "عمر حسن",
          subject: "الفيزياء",
          rating: 4.9,
          reviews: 89,
          experience: "4 سنوات",
          location: "عمان، الأردن",
          price: "28$ / ساعة",
          languages: ["العربية", "الإنجليزية"],
          specialties: ["الميكانيكا", "الديناميكا الحرارية", "البصريات"],
        },
      ],
    },
  };

  return (
    <section id="teachers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{content[language].title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{content[language].subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content[language].teachers.map((teacher, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{teacher.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">{teacher.subject}</CardDescription>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{teacher.rating}</span>
                    <span className="text-gray-500">
                      ({teacher.reviews} {language === "en" ? "reviews" : "مراجعة"})
                    </span>
                  </div>
                  <span className="text-xl font-bold text-blue-600">{teacher.price}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{teacher.location}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {teacher.experience} {language === "en" ? "experience" : "خبرة"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {teacher.languages.map((lang, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {teacher.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    {content[language].viewProfile}
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">{content[language].bookNow}</Button>
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
