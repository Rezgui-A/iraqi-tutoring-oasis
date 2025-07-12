import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Mail, ArrowLeft, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import LanguageToggle from "@/components/LanguageToggle";

const TeacherVerification: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage, isRTL } = useLanguage();
  const { user } = useAuth();
  const [teacherStatus, setTeacherStatus] = useState<"pending" | "rejected" | null>(null);

  useEffect(() => {
    if (user && user.role === "teacher") {
      if (user.status === "rejected" || (user.teacher && user.teacher.verified_status === "rejected")) {
        setTeacherStatus("rejected");
      } else {
        setTeacherStatus("pending");
      }
    }
  }, [user]);

  const content = {
    en: {
      title: teacherStatus === "rejected" ? "Application Not Approved" : "Application Submitted Successfully",
      subtitle: teacherStatus === "rejected" ? "We appreciate your interest in joining our teaching platform" : "Thank you for your interest in joining our teaching platform",
      status: {
        title: "Application Status",
        pending: "Under Review",
        rejected: "Not Approved",
      },
      message: {
        title: "What happens next?",
        steps: ["Our team will review your application and documents", "We will verify your qualifications and experience", "You will receive an email notification once the review is complete", "If approved, you'll be able to access your teacher dashboard"],
      },
      timeline: {
        title: "Expected Timeline",
        description: "Application reviews typically take 2-3 business days",
      },
      contact: {
        title: "Need Help?",
        description: "If you have any questions about your application, please contact our support team.",
        email: "support@darasa.com",
      },
      actions: {
        backToHome: "Back to Home",
        checkEmail: "Check Your Email",
      },
    },
    ar: {
      title: teacherStatus === "rejected" ? "لم تتم الموافقة على الطلب" : "تم تقديم الطلب بنجاح",
      subtitle: teacherStatus === "rejected" ? "نقدر اهتمامك بالانضمام إلى منصتنا التعليمية" : "شكراً لاهتمامك بالانضمام إلى منصتنا التعليمية",
      status: {
        title: "حالة الطلب",
        pending: "قيد المراجعة",
        rejected: "لم تتم الموافقة",
      },
      message: {
        title: "ما هي الخطوات التالية؟",
        steps: ["سيقوم فريقنا بمراجعة طلبك والمستندات المرفقة", "سنتحقق من مؤهلاتك وخبرتك", "ستتلقى إشعاراً عبر البريد الإلكتروني عند اكتمال المراجعة", "في حالة الموافقة، ستتمكن من الوصول إلى لوحة تحكم المعلم"],
      },
      timeline: {
        title: "الجدول الزمني المتوقع",
        description: "تستغرق مراجعة الطلبات عادة من 2-3 أيام عمل",
      },
      contact: {
        title: "تحتاج مساعدة؟",
        description: "إذا كان لديك أي أسئلة حول طلبك، يرجى التواصل مع فريق الدعم.",
        email: "support@darasa.com",
      },
      actions: {
        backToHome: "العودة للرئيسية",
        checkEmail: "تحقق من بريدك الإلكتروني",
      },
    },
  };

  const t = content[language];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Darasa</h1>
            </div>
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">{teacherStatus === "rejected" ? <XCircle className="h-16 w-16 text-red-500" /> : <CheckCircle className="h-16 w-16 text-green-500" />}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Status Card */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className={teacherStatus === "rejected" ? "bg-red-50" : "bg-yellow-50"}>
              <CardTitle className={`flex items-center ${teacherStatus === "rejected" ? "text-red-800" : "text-yellow-800"}`}>
                {teacherStatus === "rejected" ? <XCircle className="h-5 w-5 mr-2" /> : <Clock className="h-5 w-5 mr-2" />}
                {t.status.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${teacherStatus === "rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                  {teacherStatus === "rejected" ? <XCircle className="h-4 w-4 mr-1" /> : <Clock className="h-4 w-4 mr-1" />}
                  {teacherStatus === "rejected" ? t.status.rejected : t.status.pending}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Card */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center text-blue-800">
                <Clock className="h-5 w-5 mr-2" />
                {t.timeline.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 text-center">{t.timeline.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Process Steps */}
        <Card className="mt-6 border border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-gray-800">{t.message.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {t.message.steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">{index + 1}</div>
                  </div>
                  <p className={`text-gray-600 ${isRTL ? "mr-3" : "ml-3"}`}>{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-6 border border-gray-200 shadow-sm">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center text-green-800">
              <Mail className="h-5 w-5 mr-2" />
              {t.contact.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-3">{t.contact.description}</p>
            <a href={`mailto:${t.contact.email}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <Mail className="h-4 w-4 mr-1" />
              {t.contact.email}
            </a>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate("/")} variant="outline" className="flex items-center">
            <ArrowLeft className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {t.actions.backToHome}
          </Button>
          <Button onClick={() => window.open(`mailto:${t.contact.email}`, "_blank")} className="flex items-center bg-blue-600 hover:bg-blue-700">
            <Mail className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {t.actions.checkEmail}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherVerification;
