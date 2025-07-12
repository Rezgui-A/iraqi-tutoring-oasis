import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

interface PricingSectionProps {
  language: "en" | "ar";
}

const PricingSection = ({ language }: PricingSectionProps) => {
  const content = {
    en: {
      title: "Choose Your Learning Plan",
      subtitle: "Flexible pricing options to fit your budget and learning goals",
      monthly: "Monthly",
      popular: "Most Popular",
      getStarted: "Get Started",
      plans: [
        {
          name: "Basic",
          price: "$15",
          period: "/session",
          description: "Perfect for occasional help with homework",
          features: ["1-on-1 tutoring sessions", "Subject-specific help", "Session recordings", "Basic chat support", "Homework assistance"],
        },
        {
          name: "Standard",
          price: "$12",
          period: "/session",
          description: "Great for regular learning support",
          popular: true,
          features: ["Everything in Basic", "Priority booking", "Progress tracking", "Custom learning plans", "Extended session time", "Parent progress reports"],
        },
        {
          name: "Premium",
          price: "$10",
          period: "/session",
          description: "Best value for serious learners",
          features: ["Everything in Standard", "24/7 tutor availability", "Exam preparation", "Group study sessions", "Mobile app access", "Advanced analytics", "Dedicated support"],
        },
      ],
    },
    ar: {
      title: "اختر خطة التعلم الخاصة بك",
      subtitle: "خيارات تسعير مرنة تناسب ميزانيتك وأهداف التعلم",
      monthly: "شهرياً",
      popular: "الأكثر شعبية",
      getStarted: "ابدأ الآن",
      plans: [
        {
          name: "أساسي",
          price: "15$",
          period: "/جلسة",
          description: "مثالي للمساعدة العرضية في الواجبات",
          features: ["جلسات تدريس فردية", "مساعدة خاصة بالمادة", "تسجيل الجلسات", "دعم الدردشة الأساسي", "مساعدة الواجبات المنزلية"],
        },
        {
          name: "معياري",
          price: "12$",
          period: "/جلسة",
          description: "رائع للدعم التعليمي المنتظم",
          popular: true,
          features: ["كل ما في الأساسي", "حجز ذو أولوية", "تتبع التقدم", "خطط تعلم مخصصة", "وقت جلسة ممتد", "تقارير تقدم للوالدين"],
        },
        {
          name: "مميز",
          price: "10$",
          period: "/جلسة",
          description: "أفضل قيمة للمتعلمين الجادين",
          features: ["كل ما في المعياري", "توفر المدرس 24/7", "إعداد الامتحانات", "جلسات دراسة جماعية", "الوصول لتطبيق الجوال", "تحليلات متقدمة", "دعم مخصص"],
        },
      ],
    },
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{content[language].title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{content[language].subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content[language].plans.map((plan, index) => (
            <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${plan.popular ? "border-blue-500 border-2 scale-105" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 hover:bg-blue-700 px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {content[language].popular}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"}`} size="lg">
                  {content[language].getStarted}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">{language === "en" ? "All plans include secure payments, quality guarantee, and 24/7 platform support" : "جميع الخطط تشمل مدفوعات آمنة وضمان الجودة ودعم المنصة على مدار الساعة"}</p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span>{language === "en" ? "✓ No setup fees" : "✓ بدون رسوم إعداد"}</span>
            <span>{language === "en" ? "✓ Cancel anytime" : "✓ إلغاء في أي وقت"}</span>
            <span>{language === "en" ? "✓ Money-back guarantee" : "✓ ضمان استرداد الأموال"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
