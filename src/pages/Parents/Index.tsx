/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, Clock, CheckCircle, AlertCircle, 
  BarChart3, MessageSquare, Calendar, Plus, 
  BookOpen, GraduationCap, User, Users,
  Bookmark, Star, Award, ClipboardList,
  Loader2,
  RefreshCw
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogTrigger } from "@radix-ui/react-dialog";
import ChildCard from "./ChildCard";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { language, setLanguage, isRTL } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState([]);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    children: [],
    pendingApprovals: [],
    recentReports: [],
    weeklySchedule: [],
    stats: {
      activeChildren: 0,
      totalSessions: 0,
      avgPerformance: 0,
      upcomingSessions: 0,
      completedAssignments: 0
    },
    learningTips: []
  });

  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  const studentFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    grade_level: z.string().min(1, "Grade level is required"),
  });

  const form = useForm({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      grade_level: "",
    },
  });

 const handleAddStudent = async (values) => {
    setIsAddingStudent(true);
    try {
      const userResponse = await axios.post(`${API_BASE_URL}/api/users/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'student',
        status: 'active',
        grade_level: values.grade_level
      });

      await axios.post(
        `${API_BASE_URL}/api/parent/link-child`,
        { student_id: userResponse.data.studentId },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const updatedResponse = await axios.get(
        `${API_BASE_URL}/api/parent/children`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      setStudents(updatedResponse.data);
      toast({
        title: "Success",
        description: "Student added and linked successfully",
      });
      form.reset();

    } catch (error) {
      console.error('Error adding student:', error);
      let errorMessage = "Failed to add student";
      
      if (error.response) {
        if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.status === 400) {
          errorMessage = "Validation error - please check your inputs";
        }
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAddingStudent(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      const fetchStudents = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/parent/children`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          setStudents(response.data);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to fetch student data",
            variant: "destructive",
          });
        }
      }
      fetchStudents();
    }
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/parent/dashboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        // Add mock learning tips if none returned from API
        const data = response.data;
        if (!data.learningTips || data.learningTips.length === 0) {
          data.learningTips = [
            {
              id: 1,
              title: language === "ar" ? "نصائح للتعلم الفعال" : "Effective Learning Tips",
              content: language === "ar" ? "شجع طفلك على أخذ فترات راحة قصيرة كل 45 دقيقة لتحسين التركيز." : "Encourage your child to take short breaks every 45 minutes to improve focus."
            },
            {
              id: 2,
              title: language === "ar" ? "إدارة الوقت" : "Time Management",
              content: language === "ar" ? "ساعد طفلك على إنشاء جدول دراسي متوازن يشمل جميع المواد." : "Help your child create a balanced study schedule covering all subjects."
            }
          ];
        }
        
        setDashboardData(data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch dashboard data");
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-blue-600 font-medium">
            {language === "ar" ? "جاري تحميل بيانات لوحة التحكم..." : "Loading dashboard data..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {language === "ar" ? "حدث خطأ" : "An error occurred"}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button 
            variant="default" 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {language === "ar" ? "إعادة المحاولة" : "Try Again"}
          </Button>
        </div>
      </div>
    );
  }

  const content = {
    ar: {
      title: "لوحة متابعة ولي الأمر",
      subtitle: "رحلة تعليمية ناجحة لأبنائك",
      overview: "نظرة عامة",
      progress: "التقدم الدراسي",
      loading: "جار التحميل...",
            error : "error",

      children: {
        title: "أبنائي",
        grade: "الصف",
        avgGrade: "المعدل",
        sessionProgress: "تقدم الجلسات",
        subjects: "المواد الدراسية",
        viewReport: "عرض التقرير المفصل",
        addChild: "إضافة ابن/ابنة",    
              noSubjects: "لا توجد مواد مسجلة",
      subjectsError: "فشل تحميل المواد",
      },
      approvals: {
        title: "طلبات الموافقة على الجلسات",
        child: "الابن",
        subject: "المادة",
        with: "مع",
        date: "التاريخ",
        duration: "المدة",
        decline: "رفض",
        approve: "موافقة",
        none: "لا توجد طلبات موافقة حالياً",
      },
      reports: {
        title: "أحدث التقارير التقييمية",
        feedback: "ملاحظات المعلم",
        grade: "التقدير",
        none: "لا توجد تقارير حديثة",
        viewAll: "عرض الكل",
      },
      stats: {
        title: "الإحصائيات التعليمية",
        activeChildren: "الأبناء المسجلين",
        totalSessions: "إجمالي الجلسات",
        avgPerformance: "متوسط الأداء",
        upcomingSessions: "جلسات قادمة",
        completedAssignments: "واجبات مكتملة",
      },
      schedule: {
        title: "الجدول الأسبوعي",
        upcoming: "القادمة",
        none: "لا توجد جلسات هذا الأسبوع",
        viewCalendar: "عرض التقويم الكامل",
      },
      actions: {
        title: "إجراءات سريعة",
        messageTeachers: "مراسلة المعلمين",
        viewReports: "عرض التقارير",
        scheduleSession: "حجز جلسة جديدة",
        resources: "الموارد التعليمية",
      },
      tips: {
        title: "نصائح تعليمية",
        readMore: "المزيد من النصائح",
      },
      upcoming: {
        title: "الأنشطة القادمة",
        exam: "امتحان",
        assignment: "واجب",
        event: "فعالية",
      },
      studentForm: {
        name: "اسم الطالب",
        email: "بريد الطالب",
        password: "كلمة مرور الطالب",
        gradeLevel: "الصف الدراسي",
        add: "إضافة طالب"
      }
    },
    en: {
      title: "Parent Education Dashboard",
      loading: "Loading...",
      subtitle: "Darassa, Your child's learning journey",
      overview: "Overview",
      progress: "Progress",
      error : "error",
      children: {
        title: "My Children",
        grade: "Grade",
        avgGrade: "Average",
        sessionProgress: "Session Progress",
        subjects: "Subjects",
        viewReport: "View Detailed Report",
        addChild: "Add Child",
              noSubjects: "No subjects assigned",
      subjectsError: "Failed to load subjects",
      },
      approvals: {
        title: "Session Approval Requests",
        child: "Child",
        subject: "Subject",
        with: "with",
        date: "Date",
        duration: "Duration",
        decline: "Decline",
        approve: "Approve",
        none: "No pending approvals",
      },
      reports: {
        title: "Latest Evaluation Reports",
        feedback: "Teacher Feedback",
        grade: "Grade",
        none: "No recent reports",
        viewAll: "View All",
      },
      stats: {
        title: "Education Statistics",
        activeChildren: "Enrolled Children",
        totalSessions: "Total Sessions",
        avgPerformance: "Average Performance",
        upcomingSessions: "Upcoming Sessions",
        completedAssignments: "Completed Assignments",
      },
      schedule: {
        title: "Weekly Schedule",
        upcoming: "Upcoming",
        none: "No sessions this week",
        viewCalendar: "View Full Calendar",
      },
      actions: {
        title: "Quick Actions",
        messageTeachers: "Message Teachers",
        viewReports: "View Reports",
        scheduleSession: "Book New Session",
        resources: "Learning Resources",
      },
      tips: {
        title: "Learning Tips",
        readMore: "More Tips",
      },
      upcoming: {
        title: "Upcoming Activities",
        exam: "Exam",
        assignment: "Assignment",
        event: "Event",
      },
      studentForm: {
        name: "Student Name",
        email: "Student Email",
        password: "Student Password",
        gradeLevel: "Grade Level",
        add: "Add Student"
      }
    },
  };

  const t = content[language];


  const renderStatCard = (icon, title, value, color) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg bg-${color}-100 mr-3`}>
          {React.cloneElement(icon, { className: `h-6 w-6 text-${color}-600` })}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-white ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2"> {t.title}, {user.name} </h1>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {renderStatCard(<Users />, t.stats.activeChildren, dashboardData.stats.activeChildren, "blue")}
              {renderStatCard(<BookOpen />, t.stats.totalSessions, dashboardData.stats.totalSessions, "green")}
              {renderStatCard(<Award />, t.stats.avgPerformance, `${dashboardData.stats.avgPerformance}%`, "yellow")}
              {renderStatCard(<Clock />, t.stats.upcomingSessions, dashboardData.stats.upcomingSessions, "orange")}
              {renderStatCard(<ClipboardList />, t.stats.completedAssignments, dashboardData.stats.completedAssignments, "purple")}
            </div>

            {/* Children and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Children Section */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                    {t.children.title}
                  </h2>
                  <Dialog open={isAddStudentDialogOpen} onOpenChange={setIsAddStudentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        {t.children.addChild}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t.children.addChild}</DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleAddStudent)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t.studentForm.name}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t.studentForm.name} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t.studentForm.email}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t.studentForm.email} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t.studentForm.password}</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder={t.studentForm.password} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="grade_level"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t.studentForm.gradeLevel}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder={t.studentForm.gradeLevel} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {[...Array(12)].map((_, i) => (
                                      <SelectItem key={i+1} value={`${i+1}`}>
                                        {language === "ar" ? `الصف ${i+1}` : `Grade ${i+1}`}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full" disabled={isAddingStudent}>
                            {isAddingStudent ? (
                              language === "ar" ? "جاري الإضافة..." : "Adding..."
                            ) : t.studentForm.add}
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {dashboardData.children.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dashboardData.children.map(child => (
                      <ChildCard 
                        key={child.id}
                        child={child}
                        t={t}
                        language={language}
                        navigate={navigate}
                        API_BASE_URL={API_BASE_URL}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="bg-white border border-dashed border-gray-300">
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Users className="h-10 w-10 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-500 mb-2">
                        {language === "ar" ? "لا يوجد أبناء مسجلين" : "No children registered"}
                      </h3>
                      <Button 
                        variant="outline" 
                        className="mt-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                        onClick={() => setIsAddStudentDialogOpen(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {t.children.addChild}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Quick Actions Section - Now with Learning Tips design */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Bookmark className="h-5 w-5 mr-2 text-blue-600" />
                  {t.actions.title}
                </h2>
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-gray-100">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start hover:bg-blue-50"
                        onClick={() => navigate('/parent/messages')}
                      >
                        <MessageSquare className="h-5 w-5 mr-3 text-blue-600" />
                        {t.actions.messageTeachers}
                      </Button>
                    </div>
                    <div className="p-4 border-b border-gray-100">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start hover:bg-blue-50"
                        onClick={() => navigate('/parent/reports')}
                      >
                        <BarChart3 className="h-5 w-5 mr-3 text-blue-600" />
                        {t.actions.viewReports}
                      </Button>
                    </div>
                    <div className="p-4 border-b border-gray-100">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start hover:bg-blue-50"
                        onClick={() => navigate('/parent/schedule')}
                      >
                        <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                        {t.actions.scheduleSession}
                      </Button>
                    </div>
                    <div className="p-4">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start hover:bg-blue-50"
                        onClick={() => navigate('/parent/resources')}
                      >
                        <BookOpen className="h-5 w-5 mr-3 text-blue-600" />
                        {t.actions.resources}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Learning Tips Section - Now with Quick Actions design */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Star className="h-5 w-5 mr-2 text-blue-600" />
                {t.tips.title}
              </h2>
              <Card>
                <CardHeader className="bg-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    {t.tips.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-y divide-gray-100">
                    {dashboardData.learningTips.map((tip, index) => (
                      <div key={tip.id} className="p-4">
                        <h3 className="font-medium text-gray-900 mb-2">{tip.title}</h3>
                        <p className="text-sm text-gray-600">{tip.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Button 
                variant="ghost" 
                className="text-blue-600 hover:bg-blue-50 w-full"
                onClick={() => navigate('/parent/resources/tips')}
              >
                {t.tips.readMore}
              </Button>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            {/* Reports Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <ClipboardList className="h-5 w-5 mr-2 text-blue-600" />
                  {t.reports.title}
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600 hover:bg-blue-50"
                  onClick={() => navigate('/parent/reports')}
                >
                  {t.reports.viewAll}
                </Button>
              </div>

              {dashboardData.recentReports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboardData.recentReports.map((report, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{report.child}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <BookOpen className="h-4 w-4 mr-1 text-blue-500" />
                              {report.subject} • {report.teacher}
                            </CardDescription>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={`${report.grade.startsWith("A") ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                          >
                            {report.grade}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700 italic">"{report.feedback}"</p>
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                          {new Date(report.date).toLocaleString(language, {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white border border-dashed border-gray-300">
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <ClipboardList className="h-10 w-10 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">
                      {t.reports.none}
                    </h3>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Approvals Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                {t.approvals.title}
              </h2>

              {dashboardData.pendingApprovals.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData.pendingApprovals.map((approval, index) => (
                    <Card key={index} className="border-l-4 border-orange-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{approval.child}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {approval.subject} {t.approvals.with} {approval.teacher}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                              <Calendar className="inline h-4 w-4 mr-1" />
                              {new Date(approval.date).toLocaleString(language, {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                            <p className="text-sm text-gray-500">
                              <Clock className="inline h-4 w-4 mr-1" />
                              {approval.duration}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-semibold text-green-600 mb-3">{approval.cost}</span>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleApproval(approval.id, 'declined')}
                              >
                                {t.approvals.decline}
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApproval(approval.id, 'approved')}
                              >
                                {t.approvals.approve}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white border border-dashed border-gray-300">
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <CheckCircle className="h-10 w-10 text-green-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">
                      {t.approvals.none}
                    </h3>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            {/* Weekly Schedule */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  {t.schedule.title}
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600 hover:bg-blue-50"
                  onClick={() => navigate('/parent/calendar')}
                >
                  {t.schedule.viewCalendar}
                </Button>
              </div>

              {dashboardData.weeklySchedule.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData.weeklySchedule.map((session, index) => (
                    <Card 
                      key={index} 
                      className={`border-l-4 ${
                        session.status === "pending" ? "border-yellow-500" : 
                        session.status === "confirmed" ? "border-green-500" : "border-blue-500"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              session.status === "pending" ? "bg-yellow-500" : 
                              session.status === "confirmed" ? "bg-green-500" : "bg-blue-500"
                            }`}></div>
                            <div className={language === "ar" ? "text-right" : "text-left"}>
                              <h3 className="font-medium text-gray-900">
                                {session.child} - {session.subject}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {new Date(session.time).toLocaleString(language, {
                                  weekday: 'long',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {session.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white border border-dashed border-gray-300">
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <Calendar className="h-10 w-10 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">
                      {t.schedule.none}
                    </h3>
                    <Button 
                      variant="outline" 
                      className="mt-4 border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={() => navigate('/parent/schedule')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {t.actions.scheduleSession}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  async function handleApproval(lessonId, action) {
    try {
      await axios.put(`${API_BASE_URL}/api/lessons/${lessonId}/approval`, {
        status: action
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Update local state to remove the approved/declined lesson
      setDashboardData(prev => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals.filter(approval => approval.id !== lessonId)
      }));
    } catch (err) {
      console.error("Approval error:", err);
      alert(err.response?.data?.error || "Failed to update approval status");
    }
  }
};

export default ParentDashboard;