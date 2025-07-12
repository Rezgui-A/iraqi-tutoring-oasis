/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Users, Clock, Star, TrendingUp, Award, GraduationCap, Video } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface DashboardData {
  profile: {
    name: string;
    email: string;
    subjects: string[];
    rating: number;
    experience: number;
    photo_path: string | null;
  };
  schedule: Array<{
    time: string;
    student: string;
    subject: string;
    status: string;
  }>;
  stats: {
    monthly_earnings: number;
    total_students: number;
    total_hours: number;
    total_lessons: number;
  } | null;
}

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const { language, setLanguage, isRTL } = useLanguage();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  // Fetch dashboard data from backend
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please log in again",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:3001/api/teacher/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "teacher") {
      fetchDashboardData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const content = {
    ar: {
      title: "لوحة تحكم المعلم",
      welcome: (name: string) => `مرحباً، ${name}`,
      subtitle: "إليك نظرة سريعة على نشاطك التدريسي",
      loading: "جاري التحميل...",
      stats: {
        earnings: "الأرباح الشهرية",
        students: "إجمالي الطلاب",
        hours: "إجمالي الساعات",
        lessons: "إجمالي الدروس",
        rating: "التقييم",
      },
      schedule: {
        title: "الجدول اليومي",
        upcoming: "الجلسات القادمة",
        noSessions: "لا توجد جلسات اليوم",
        time: "الوقت",
        student: "الطالب",
        subject: "المادة",
        action: "الإجراء",
      },
      earnings: {
        title: "الأرباح والإحصائيات",
        thisMonth: "هذا الشهر",
        performance: "الأداء",
        growth: "النمو",
      },
      profile: {
        title: "الملف الشخصي",
        subjects: "المواد المُدرَّسة",
        experience: "سنوات الخبرة",
        edit: "تعديل الملف",
      },
      nav: {
        videoCall: "بدء جلسة فيديو",
        settings: "الإعدادات",
        logout: "تسجيل الخروج",
      },
    },
    en: {
      title: "Teacher Dashboard",
      welcome: (name: string) => `Welcome, ${name}`,
      subtitle: "Here's a quick overview of your teaching activity",
      loading: "Loading...",
      stats: {
        earnings: "Monthly Earnings",
        students: "Total Students",
        hours: "Total Hours",
        lessons: "Total Lessons",
        rating: "Rating",
      },
      schedule: {
        title: "Today's Schedule",
        upcoming: "Upcoming Sessions",
        noSessions: "No sessions today",
        time: "Time",
        student: "Student",
        subject: "Subject",
        action: "Action",
      },
      earnings: {
        title: "Earnings & Statistics",
        thisMonth: "This Month",
        performance: "Performance",
        growth: "Growth",
      },
      profile: {
        title: "Profile Overview",
        subjects: "Subjects Taught",
        experience: "Years Experience",
        edit: "Edit Profile",
      },
      nav: {
        videoCall: "Start Video Session",
        settings: "Settings",
        logout: "Logout",
      },
    },
  };

  const t = content[language];

  // Helper functions
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString(language === "ar" ? "ar-SA" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: language === "en",
    });
  };

  const handleLogout = () => {
    logout();
  };

  const handleStartSession = (sessionId: number) => {
    // In a real app, this would start the video session
    console.log(`Starting session ${sessionId}`);
    navigate("/video-session");
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
<div className="mb-8">
  <div className="flex items-center space-x-4 mb-4">
    <div className="relative h-16 w-16 rounded-full border-4 border-blue-200 overflow-hidden">
      {user?.pic_url ? (
        <img
          src={`${API_BASE_URL}${user.pic_url.startsWith('/') ? '' : '/'}${user.pic_url}?t=${Date.now()}`}
          alt="Profile"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `${API_BASE_URL}/uploads/profile-pics/default-profile.png`;
            e.currentTarget.onerror = null; // Prevent infinite loop
          }}
        />
      ) : (
        <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
          {user?.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase() || (language === "ar" ? "معلم" : "T")}
        </div>
      )}
    </div>
    <div className={isRTL ? "text-right" : "text-left"}>
      <h2 className="text-3xl font-bold text-gray-900">
        {typeof t.welcome === "function" 
          ? t.welcome(user?.name || (language === "ar" ? "معلم" : "Teacher")) 
          : t.welcome}
      </h2>
      <p className="text-gray-600">{t.subtitle}</p>
    </div>
  </div>
</div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Earnings Card */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-500 text-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">{t.stats.earnings}</p>
                  <p className="text-2xl font-bold">{language === "ar" ? `${dashboardData?.stats?.monthly_earnings?.toLocaleString() || 0} د.ع` : `$${dashboardData?.stats?.monthly_earnings?.toLocaleString() || 0}`}</p>
                </div>
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <DollarSign className="h-8 w-8 text-blue-100" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Students Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{t.stats.students}</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData?.stats?.total_students || 0}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hours Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{t.stats.hours}</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData?.stats?.total_hours || 0}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lessons Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{t.stats.lessons}</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData?.stats?.total_lessons || 0}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Schedule */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center text-gray-900">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  {t.schedule.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 mb-4">{t.schedule.upcoming}</h4>
                  {dashboardData?.schedule && dashboardData.schedule.length > 0 ? (
                    dashboardData.schedule.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Clock className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className={isRTL ? "text-right" : "text-left"}>
                            <p className="font-medium text-gray-900">{formatTime(session.time)}</p>
                            <p className="text-sm text-gray-600">{session.student}</p>
                            <p className="text-sm text-gray-500">{session.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>{session.status === "confirmed" ? (language === "ar" ? "مؤكد" : "Confirmed") : language === "ar" ? "في الانتظار" : "Pending"}</Badge>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleStartSession(index)}>
                            <Video className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>{t.schedule.noSessions}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile & Stats */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-gray-900">{t.profile.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-blue-200">
                    <AvatarImage src={dashboardData?.profile?.photo_path || undefined} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-2xl">
                      {dashboardData?.profile?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || (language === "ar" ? "معلم" : "T")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg text-gray-900">{dashboardData?.profile?.name || (language === "ar" ? "معلم" : "Teacher")}</h3>
                  <p className="text-gray-600 text-sm">{dashboardData?.profile?.subjects?.join(language === "ar" ? "، " : ", ") || (language === "ar" ? "لا توجد مواد محددة" : "No subjects specified")}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.profile.subjects}:</span>
                    <span className="font-medium text-right">{dashboardData?.profile?.subjects?.join(language === "ar" ? "، " : ", ") || (language === "ar" ? "غير محدد" : "Not specified")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.profile.experience}:</span>
                    <span className="font-medium">{dashboardData?.profile?.experience ? `${dashboardData.profile.experience} ${language === "ar" ? "سنوات" : "years"}` : language === "ar" ? "غير محدد" : "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.stats.rating}:</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span className="font-medium">{dashboardData?.profile?.rating?.toFixed(1) || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">{t.profile.edit}</Button>
              </CardContent>
            </Card>

            {/* Earnings Summary */}
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center text-gray-900">
                  <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                  {t.earnings.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600">{t.earnings.thisMonth}</p>
                    <p className="text-2xl font-bold text-blue-600">{language === "ar" ? `${dashboardData?.stats?.monthly_earnings?.toLocaleString() || 0} د.ع` : `$${dashboardData?.stats?.monthly_earnings?.toLocaleString() || 0}`}</p>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                      {t.earnings.performance}:
                    </span>
                    <span className="font-medium text-green-600">{language === "ar" ? "ممتاز" : "Excellent"}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center">
                      <Award className="h-4 w-4 mr-2 text-yellow-500" />
                      {t.earnings.growth}:
                    </span>
                    <span className="font-medium text-blue-600">{language === "ar" ? "+12%" : "+12%"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
