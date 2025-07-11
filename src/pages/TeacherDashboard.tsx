
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Users, Clock, Video, BookOpen, Star, Settings, LogOut, Languages } from "lucide-react";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [isArabic, setIsArabic] = useState(true);

  const content = {
    ar: {
      title: "لوحة تحكم المعلم",
      welcome: "مرحباً، د. أحمد محمد",
      subtitle: "إليك نظرة سريعة على نشاطك التدريسي",
      stats: {
        earnings: "الأرباح الشهرية",
        students: "الطلاب النشطين",
        hours: "ساعات التدريس",
        rating: "التقييم"
      },
      schedule: {
        title: "الجدول اليومي",
        upcoming: "الجلسات القادمة",
        time: "الوقت",
        student: "الطالب",
        subject: "المادة",
        action: "الإجراء"
      },
      earnings: {
        title: "الأرباح والإحصائيات",
        thisMonth: "هذا الشهر",
        lastMonth: "الشهر الماضي",
        totalEarnings: "إجمالي الأرباح"
      },
      profile: {
        title: "الملف الشخصي",
        subjects: "المواد المُدرَّسة",
        experience: "سنوات الخبرة",
        edit: "تعديل الملف"
      },
      nav: {
        videoCall: "بدء جلسة فيديو",
        settings: "الإعدادات",
        logout: "تسجيل الخروج"
      }
    },
    en: {
      title: "Teacher Dashboard",
      welcome: "Welcome, Dr. Ahmed Mohammed",
      subtitle: "Here's a quick overview of your teaching activity",
      stats: {
        earnings: "Monthly Earnings",
        students: "Active Students",
        hours: "Teaching Hours",
        rating: "Rating"
      },
      schedule: {
        title: "Today's Schedule",
        upcoming: "Upcoming Sessions",
        time: "Time",
        student: "Student",
        subject: "Subject",
        action: "Action"
      },
      earnings: {
        title: "Earnings & Statistics",
        thisMonth: "This Month",
        lastMonth: "Last Month",
        totalEarnings: "Total Earnings"
      },
      profile: {
        title: "Profile Overview",
        subjects: "Subjects Taught",
        experience: "Years Experience",
        edit: "Edit Profile"
      },
      nav: {
        videoCall: "Start Video Session",
        settings: "Settings",
        logout: "Logout"
      }
    }
  };

  const t = isArabic ? content.ar : content.en;

  const todaySessions = [
    { time: "10:00", student: "سارة أحمد", subject: "رياضيات", status: "confirmed" },
    { time: "14:00", student: "محمد علي", subject: "فيزياء", status: "pending" },
    { time: "16:00", student: "فاطمة حسن", subject: "كيمياء", status: "confirmed" },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-tutor-green/5 to-warm-gray-50 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-tutor-green" />
              <div>
                <h1 className="text-xl font-nunito font-bold text-gray-900">{t.title}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsArabic(!isArabic)}
                className="flex items-center space-x-2"
              >
                <Languages className="h-4 w-4" />
                <span>{isArabic ? "EN" : "عربي"}</span>
              </Button>
              <Button className="btn-secondary" onClick={() => navigate('/video-call')}>
                <Video className="h-4 w-4 mr-2" />
                {t.nav.videoCall}
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/teacher-settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                {t.nav.settings}
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                <LogOut className="h-4 w-4 mr-2" />
                {t.nav.logout}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16 border-4 border-tutor-green/20">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback className="bg-tutor-green/20 text-tutor-green font-bold text-xl">أم</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-nunito font-bold text-gray-900">{t.welcome}</h2>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover shadow-lg bg-gradient-to-br from-tutor-green to-tutor-green/80 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">{t.stats.earnings}</p>
                  <p className="text-2xl font-bold">2,450,000 د.ع</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{t.stats.students}</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
                <Users className="h-8 w-8 text-tutor-yellow" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{t.stats.hours}</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
                <Clock className="h-8 w-8 text-tutor-blue" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{t.stats.rating}</p>
                  <p className="text-2xl font-bold text-gray-900">4.9</p>
                </div>
                <Star className="h-8 w-8 text-tutor-yellow" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Schedule */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-tutor-green/10 to-tutor-yellow/10">
                <CardTitle className="flex items-center text-gray-900">
                  <Calendar className="h-5 w-5 mr-2 text-tutor-green" />
                  {t.schedule.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 mb-4">{t.schedule.upcoming}</h4>
                  {todaySessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="bg-tutor-green/20 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-tutor-green" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{session.time}</p>
                          <p className="text-sm text-gray-600">{session.student}</p>
                          <p className="text-sm text-gray-500">{session.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={session.status === 'confirmed' ? 'default' : 'secondary'}>
                          {session.status === 'confirmed' ? 'مؤكد' : 'في الانتظار'}
                        </Badge>
                        <Button size="sm" className="btn-secondary">
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile & Stats */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-tutor-yellow/10 to-tutor-green/10">
                <CardTitle className="text-gray-900">{t.profile.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-tutor-green/20">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                    <AvatarFallback className="bg-tutor-green/20 text-tutor-green font-bold text-2xl">أم</AvatarFallback>
                  </Avatar>
                  <h3 className="font-nunito font-bold text-lg text-gray-900">د. أحمد محمد</h3>
                  <p className="text-gray-600 text-sm">معلم رياضيات وفيزياء</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.profile.subjects}:</span>
                    <span className="font-medium">رياضيات، فيزياء</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.profile.experience}:</span>
                    <span className="font-medium">8 سنوات</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">التقييم:</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-tutor-yellow fill-current mr-1" />
                      <span className="font-medium">4.9</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4 btn-primary">
                  {t.profile.edit}
                </Button>
              </CardContent>
            </Card>

            {/* Earnings Summary */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <DollarSign className="h-5 w-5 mr-2 text-tutor-green" />
                  {t.earnings.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-tutor-green/10 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">{t.earnings.thisMonth}</p>
                    <p className="text-2xl font-bold text-tutor-green">2,450,000 د.ع</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.earnings.lastMonth}:</span>
                    <span className="font-medium">2,200,000 د.ع</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.earnings.totalEarnings}:</span>
                    <span className="font-medium">18,500,000 د.ع</span>
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
