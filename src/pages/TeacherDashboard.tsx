
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Clock, 
  Video, 
  BookOpen, 
  Star, 
  Settings, 
  LogOut, 
  Languages, 
  Eye,
  TrendingUp,
  Award,
  MessageSquare,
  FileText,
  PlayCircle,
  BarChart3,
  Bell,
  Plus,
  ChevronRight,
  Timer,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [isArabic, setIsArabic] = useState(true);

  const content = {
    ar: {
      title: "لوحة المعلم المهنية",
      welcome: "مرحباً، د. أحمد محمد",
      subtitle: "مدرس رياضيات وفيزياء معتمد",
      quickActions: "الإجراءات السريعة",
      todaySchedule: "جدول اليوم",
      upcomingClasses: "الصفوف القادمة",
      recentActivity: "النشاط الأخير",
      earnings: "الأرباح",
      students: "الطلاب",
      hours: "الساعات",
      rating: "التقييم",
      thisMonth: "هذا الشهر",
      activeStudents: "طالب نشط",
      hoursThisWeek: "ساعة هذا الأسبوع",
      startSession: "بدء جلسة",
      createQuiz: "إنشاء اختبار",
      viewMessages: "عرض الرسائل",
      scheduleClass: "جدولة صف",
      viewAll: "عرض الكل",
      confirmed: "مؤكد",
      pending: "في الانتظار",
      completed: "مكتمل",
      performance: "الأداء",
      monthlyGoal: "الهدف الشهري",
      completionRate: "معدل الإنجاز"
    },
    en: {
      title: "Professional Teacher Dashboard",
      welcome: "Welcome, Dr. Ahmed Mohammed",
      subtitle: "Certified Mathematics & Physics Teacher",
      quickActions: "Quick Actions",
      todaySchedule: "Today's Schedule",
      upcomingClasses: "Upcoming Classes",
      recentActivity: "Recent Activity",
      earnings: "Earnings",
      students: "Students",
      hours: "Hours",
      rating: "Rating",
      thisMonth: "This Month",
      activeStudents: "Active Students",
      hoursThisWeek: "Hours This Week",
      startSession: "Start Session",
      createQuiz: "Create Quiz",
      viewMessages: "View Messages",
      scheduleClass: "Schedule Class",
      viewAll: "View All",
      confirmed: "Confirmed",
      pending: "Pending",
      completed: "Completed",
      performance: "Performance",
      monthlyGoal: "Monthly Goal",
      completionRate: "Completion Rate"
    }
  };

  const t = isArabic ? content.ar : content.en;

  const todayClasses = [
    { time: "10:00", student: "سارة أحمد", subject: "رياضيات", status: "confirmed", duration: "60 دقيقة" },
    { time: "14:00", student: "محمد علي", subject: "فيزياء", status: "pending", duration: "45 دقيقة" },
    { time: "16:00", student: "فاطمة حسن", subject: "كيمياء", status: "confirmed", duration: "60 دقيقة" },
  ];

  const recentActivities = [
    { action: "Quiz completed by سارة أحمد", time: "منذ 2 ساعات", type: "quiz" },
    { action: "New booking from محمد علي", time: "منذ 4 ساعات", type: "booking" },
    { action: "Payment received", time: "منذ 6 ساعات", type: "payment" },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-light-gray via-white to-light-gray ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-medium-gray/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-primary-green/10 p-3 rounded-xl">
                <BookOpen className="h-8 w-8 text-primary-green" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-dark-gray">{t.title}</h1>
                <p className="text-medium-gray">لوحة التحكم المتقدمة</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsArabic(!isArabic)}
                className="border-medium-gray/30 hover:bg-light-gray"
              >
                <Languages className="h-4 w-4" />
                <span className="ml-2">{isArabic ? "EN" : "عربي"}</span>
              </Button>
              
              <Button className="bg-primary-green hover:bg-primary-green/90 text-white">
                <Video className="h-4 w-4 mr-2" />
                بدء جلسة فيديو
              </Button>
              
              <Button variant="outline" onClick={() => navigate('/teacher-settings')}>
                <Eye className="h-4 w-4 mr-2" />
                عرض الملف
              </Button>
              
              <Button variant="outline" onClick={() => navigate('/teacher-settings')}>
                <Settings className="h-4 w-4 mr-2" />
                الإعدادات
              </Button>
              
              <Button variant="outline" onClick={() => navigate('/')}>
                <LogOut className="h-4 w-4 mr-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Section with Enhanced Profile */}
        <div className="bg-gradient-to-r from-primary-green/5 via-secondary-turquoise/5 to-primary-blue/5 rounded-2xl p-8 border border-medium-gray/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback className="bg-primary-green/20 text-primary-green font-bold text-2xl">أم</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-primary-green rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-dark-gray mb-1">{t.welcome}</h2>
                <p className="text-lg text-medium-gray mb-2">{t.subtitle}</p>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-accent-yellow/20 text-accent-yellow border-accent-yellow/30">
                    <Star className="h-3 w-3 mr-1" />
                    معلم معتمد
                  </Badge>
                  <Badge className="bg-primary-green/20 text-primary-green border-primary-green/30">
                    <Award className="h-3 w-3 mr-1" />
                    8+ سنوات خبرة
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-primary-green">4.9</div>
                <div className="flex items-center justify-center mt-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-3 w-3 text-accent-yellow fill-current" />
                  ))}
                </div>
                <div className="text-xs text-medium-gray mt-1">من 124 تقييم</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary-green to-primary-green/80 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">{t.earnings}</p>
                  <p className="text-3xl font-bold mt-2">2,450,000</p>
                  <p className="text-xs text-green-100 mt-1">د.ع {t.thisMonth}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-green-100">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span className="text-sm">+12% من الشهر الماضي</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-medium-gray/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-medium-gray text-sm font-medium">{t.students}</p>
                  <p className="text-3xl font-bold text-dark-gray mt-2">24</p>
                  <p className="text-xs text-medium-gray mt-1">{t.activeStudents}</p>
                </div>
                <div className="bg-secondary-turquoise/10 p-3 rounded-xl">
                  <Users className="h-8 w-8 text-secondary-turquoise" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-primary-green">
                <Plus className="h-4 w-4 mr-2" />
                <span className="text-sm">3 طلاب جدد</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-medium-gray/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-medium-gray text-sm font-medium">{t.hours}</p>
                  <p className="text-3xl font-bold text-dark-gray mt-2">156</p>
                  <p className="text-xs text-medium-gray mt-1">{t.hoursThisWeek}</p>
                </div>
                <div className="bg-primary-blue/10 p-3 rounded-xl">
                  <Clock className="h-8 w-8 text-primary-blue" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-accent-orange">
                <Timer className="h-4 w-4 mr-2" />
                <span className="text-sm">32 ساعة هذا الأسبوع</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-medium-gray/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-medium-gray text-sm font-medium">{t.performance}</p>
                  <p className="text-3xl font-bold text-dark-gray mt-2">92%</p>
                  <p className="text-xs text-medium-gray mt-1">{t.completionRate}</p>
                </div>
                <div className="bg-accent-yellow/10 p-3 rounded-xl">
                  <BarChart3 className="h-8 w-8 text-accent-yellow" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Section */}
        <Card className="bg-white border border-medium-gray/20 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-dark-gray flex items-center">
              <PlayCircle className="h-5 w-5 mr-2 text-primary-green" />
              {t.quickActions}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-16 bg-primary-green/10 hover:bg-primary-green/20 text-primary-green border-primary-green/20 flex-col space-y-2">
                <Video className="h-6 w-6" />
                <span className="text-sm">{t.startSession}</span>
              </Button>
              <Button variant="outline" className="h-16 border-secondary-turquoise/30 hover:bg-secondary-turquoise/10 text-secondary-turquoise flex-col space-y-2">
                <FileText className="h-6 w-6" />
                <span className="text-sm">{t.createQuiz}</span>
              </Button>
              <Button variant="outline" className="h-16 border-accent-orange/30 hover:bg-accent-orange/10 text-accent-orange flex-col space-y-2">
                <MessageSquare className="h-6 w-6" />
                <span className="text-sm">{t.viewMessages}</span>
              </Button>
              <Button variant="outline" className="h-16 border-primary-blue/30 hover:bg-primary-blue/10 text-primary-blue flex-col space-y-2">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">{t.scheduleClass}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Enhanced Today's Schedule */}
          <div className="lg:col-span-2">
            <Card className="bg-white border border-medium-gray/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary-green/5 to-secondary-turquoise/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-dark-gray">
                    <Calendar className="h-5 w-5 mr-2 text-primary-green" />
                    {t.todaySchedule}
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary-green">
                    {t.viewAll}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {todayClasses.map((classItem, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-light-gray/50 to-white rounded-xl border border-medium-gray/10 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary-green/20 p-3 rounded-xl">
                          <Clock className="h-5 w-5 text-primary-green" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <p className="font-bold text-dark-gray text-lg">{classItem.time}</p>
                            <Badge variant={classItem.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                              {classItem.status === 'confirmed' ? t.confirmed : t.pending}
                            </Badge>
                          </div>
                          <p className="font-medium text-dark-gray">{classItem.student}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-sm text-medium-gray">{classItem.subject}</p>
                            <span className="text-medium-gray">•</span>
                            <p className="text-sm text-medium-gray">{classItem.duration}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-primary-green hover:bg-primary-green/90 text-white">
                          <Video className="h-4 w-4 mr-1" />
                          انضمام
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with Recent Activity and Performance */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="bg-white border border-medium-gray/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-dark-gray">
                  <Bell className="h-5 w-5 mr-2 text-accent-orange" />
                  {t.recentActivity}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-light-gray/50 transition-colors">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'quiz' ? 'bg-secondary-turquoise/20' :
                        activity.type === 'booking' ? 'bg-primary-green/20' :
                        'bg-accent-yellow/20'
                      }`}>
                        {activity.type === 'quiz' ? (
                          <FileText className="h-4 w-4 text-secondary-turquoise" />
                        ) : activity.type === 'booking' ? (
                          <Calendar className="h-4 w-4 text-primary-green" />
                        ) : (
                          <DollarSign className="h-4 w-4 text-accent-yellow" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-gray">{activity.action}</p>
                        <p className="text-xs text-medium-gray">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Goal Progress */}
            <Card className="bg-gradient-to-br from-primary-blue/5 to-secondary-turquoise/5 border border-medium-gray/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-dark-gray">
                  <Award className="h-5 w-5 mr-2 text-primary-blue" />
                  {t.monthlyGoal}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary-blue mb-1">75%</div>
                  <p className="text-sm text-medium-gray">من الهدف المحدد</p>
                </div>
                <Progress value={75} className="h-3 mb-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-medium-gray">الهدف:</span>
                    <span className="font-medium text-dark-gray">3,000,000 د.ع</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-medium-gray">المحقق:</span>
                    <span className="font-medium text-primary-green">2,250,000 د.ع</span>
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
