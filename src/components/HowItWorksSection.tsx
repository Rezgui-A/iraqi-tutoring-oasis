import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Calendar, Video, Star } from "lucide-react";

interface HowItWorksSectionProps {
  language: "en" | "ar";
}

const HowItWorksSection = ({ language }: HowItWorksSectionProps) => {
  const content = {
    en: {
      title: "How It Works",
      subtitle: "Get started with expert tutoring in just 4 simple steps",
      steps: [
        {
          icon: Search,
          title: "Find Your Tutor",
          description: "Browse through our verified tutors and find the perfect match for your subject and learning style.",
        },
        {
          icon: Calendar,
          title: "Book a Session",
          description: "Choose a convenient time slot and book your personalized tutoring session online.",
        },
        {
          icon: Video,
          title: "Join the Lesson",
          description: "Connect with your tutor via our interactive video platform for live, engaging lessons.",
        },
        {
          icon: Star,
          title: "Rate & Review",
          description: "Share your experience and help other students find the best tutors on our platform.",
        },
      ],
    },
    ar: {
      title: "كيف يعمل",
      subtitle: "ابدأ مع التدريس المتخصص في 4 خطوات بسيطة",
      steps: [
        {
          icon: Search,
          title: "ابحث عن مدرسك",
          description: "تصفح المدرسين المعتمدين لدينا واعثر على المناسب لمادتك وأسلوب التعلم الخاص بك.",
        },
        {
          icon: Calendar,
          title: "احجز جلسة",
          description: "اختر الوقت المناسب واحجز جلسة التدريس الشخصية عبر الإنترنت.",
        },
        {
          icon: Video,
          title: "انضم للدرس",
          description: "تواصل مع مدرسك عبر منصة الفيديو التفاعلية للحصول على دروس حية وجذابة.",
        },
        {
          icon: Star,
          title: "قيم واكتب مراجعة",
          description: "شارك تجربتك وساعد الطلاب الآخرين في العثور على أفضل المدرسين في منصتنا.",
        },
      ],
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{content[language].title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{content[language].subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content[language].steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">{index + 1}</div>
                    <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600">{step.description}</CardDescription>
                  </CardContent>
                </Card>

                {index < content[language].steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-blue-300"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
