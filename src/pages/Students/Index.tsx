import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, Clock, AlertCircle, MessageSquare, 
  Calendar, Upload, ChevronRight, Award,
  BarChart2, CheckCircle, Bookmark, Star,
  Users, FileText, Home, GraduationCap
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import CalendarComponent from "@/components/CalendarComponent";
import TeachersList from "@/components/TeachersList";
import FileUpload from "@/components/FileUpload";
import React from "react";

// Mock data for teachers
const teachers = [
  { id: 1, name: "Dr. Smith", subject: "Mathematics", email: "smith@edu.com" },
  { id: 2, name: "Ms. Johnson", subject: "Computer Science", email: "johnson@edu.com" },
  { id: 3, name: "Dr. Brown", subject: "Physics", email: "brown@edu.com" },
  { id: 4, name: "Prof. Davis", subject: "Literature", email: "davis@edu.com" },
];

// Mock data for scheduled classes
const scheduledClasses = [
  { id: 1, title: "Advanced Mathematics", date: "2024-05-15T10:00:00", duration: 60, teacher: "Dr. Smith" },
  { id: 2, title: "Computer Science", date: "2024-05-16T14:00:00", duration: 90, teacher: "Ms. Johnson" },
  { id: 3, title: "Physics", date: "2024-05-17T09:00:00", duration: 60, teacher: "Dr. Brown" },
  { id: 4, title: "Literature", date: "2024-05-19T11:00:00", duration: 90, teacher: "Prof. Davis" },
];

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  color: string;
}

const StatsCard = ({ icon, title, value, change, color }: StatsCardProps) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg bg-${color}-100 mr-3`}>
          {React.cloneElement(icon as React.ReactElement, { className: `h-5 w-5 text-${color}-600` })}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <p className={`text-2xl font-bold text-${color}-600 mr-2`}>{value}</p>
            {change && (
              <span className={`text-xs ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {change}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CourseCardProps {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  nextClass: string;
  color: string;
  onClick: (id: number) => void;
}

const CourseCard = ({ id, title, instructor, progress, nextClass, color, onClick }: CourseCardProps) => {
  return (
    <div 
      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer group"
      onClick={() => onClick(id)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <BookOpen className={`h-5 w-5 ${color}`} />
        </div>
        <div className="flex items-center">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {progress}% {progress > 80 ? '🎉' : progress > 50 ? '👍' : '📚'}
          </span>
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">With {instructor}</p>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Your progress</span>
          <span>{progress}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${color}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mt-3">
          <Clock className="h-3 w-3 mr-1" />
          <span>Next class: {nextClass}</span>
        </div>
      </div>
    </div>
  );
};

interface AssignmentItemProps {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "submitted" | "graded";
  onUpload: (id: number) => void;
}

const AssignmentItem = ({ id, title, course, dueDate, priority, status, onUpload }: AssignmentItemProps) => {
  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  const statusIcons = {
    pending: <AlertCircle className="h-4 w-4 text-orange-500" />,
    submitted: <Clock className="h-4 w-4 text-blue-500" />,
    graded: <CheckCircle className="h-4 w-4 text-green-500" />,
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-100 transition-colors group">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          {statusIcons[status]}
        </div>
        <div>
          <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{title}</h4>
          <p className="text-xs text-gray-500">{course}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[priority]}`}>
          {priority}
        </span>
        <span className="text-xs text-gray-500">{dueDate}</span>
        {status === "pending" && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onUpload(id);
            }}
          >
            <Upload className="h-3 w-3 mr-1" />
            Upload
          </Button>
        )}
        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const [activeView, setActiveView] = useState<"dashboard" | "schedule" | "teachers" | "upload">("dashboard");
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language, isRTL } = useLanguage();

  const content = {
    en: {
      welcome: "Welcome back,",
      subtitle: "Ready for today's learning adventure?",
      stats: {
        courses: "Active Courses",
        assignments: "Assignments Due",
        gpa: "Current GPA",
        streak: "Day Streak",
        enrolled: "Enrolled",
        thisWeek: "This week",
        trendingUp: "+2 from last week",
        trendingDown: "-1 from last month",
      },
      sections: {
        courses: "Your Courses",
        assignments: "Recent Assignments",
        quickActions: "Quick Actions",
        submitAssignment: "Submit Assignment",
        viewSchedule: "View Schedule",
        contactTeachers: "Contact Teachers",
        resources: "Learning Resources",
        achievements: "Recent Achievements",
      },
      priority: {
        high: "Urgent",
        medium: "Priority",
        low: "Normal",
      },
      status: {
        pending: "pending",
        submitted: "submitted",
        graded: "graded",
      },
      achievements: [
        "Math Whiz - Solved 100 problems",
        "Perfect Attendance - 30 days",
        "Early Bird - 5 assignments early"
      ]
    },
    ar: {
      welcome: "مرحباً بعودتك،",
      subtitle: "مستعد لرحلة التعلم اليوم؟",
      stats: {
        courses: "المواد النشطة",
        assignments: "واجبات مستحقة",
        gpa: "المعدل الحالي",
        streak: "يوم متتالي",
        enrolled: "مسجل",
        thisWeek: "هذا الأسبوع",
        trendingUp: "+2 عن الأسبوع الماضي",
        trendingDown: "-1 عن الشهر الماضي",
      },
      sections: {
        courses: "موادك الدراسية",
        assignments: "الواجبات الأخيرة",
        quickActions: "إجراءات سريعة",
        submitAssignment: "تسليم واجب",
        viewSchedule: "عرض الجدول",
        contactTeachers: "تواصل مع المعلمين",
        resources: "مصادر التعلم",
        achievements: "الإنجازات الحديثة",
      },
      priority: {
        high: "عاجل",
        medium: "مهم",
        low: "عادي",
      },
      status: {
        pending: "قيد الانتظار",
        submitted: "تم التسليم",
        graded: "تم التصحيح",
      },
      achievements: [
        "عبقري الرياضيات - حل 100 مسألة",
        "الحضور المثالي - 30 يوم",
        "المبكر - 5 واجبات مبكرة"
      ]
    },
  };

  const courses = [
    {
      id: 1,
      title: language === "en" ? "Advanced Mathematics" : "الرياضيات المتقدمة",
      instructor: language === "en" ? "Dr. Smith" : "د. أحمد",
      progress: 75,
      nextClass: language === "en" ? "Tomorrow 10:00 AM" : "غداً 10:00 ص",
      color: "text-blue-600",
    },
    {
      id: 2,
      title: language === "en" ? "Computer Science" : "علوم الحاسوب",
      instructor: language === "en" ? "Ms. Johnson" : "أ. سارة",
      progress: 60,
      nextClass: language === "en" ? "Wed 2:00 PM" : "الأربعاء 2:00 م",
      color: "text-green-600",
    },
    {
      id: 3,
      title: language === "en" ? "Physics" : "الفيزياء",
      instructor: language === "en" ? "Dr. Brown" : "د. خالد",
      progress: 45,
      nextClass: language === "en" ? "Thu 9:00 AM" : "الخميس 9:00 ص",
      color: "text-purple-600",
    },
    {
      id: 4,
      title: language === "en" ? "Literature" : "الأدب",
      instructor: language === "en" ? "Prof. Davis" : "د. فاطمة",
      progress: 80,
      nextClass: language === "en" ? "Fri 11:00 AM" : "الجمعة 11:00 ص",
      color: "text-pink-600",
    },
  ];

  const assignments = [
    {
      id: 1,
      title: language === "en" ? "Calculus Problem Set 3" : "مجموعة مسائل التفاضل 3",
      course: language === "en" ? "Advanced Mathematics" : "الرياضيات المتقدمة",
      dueDate: language === "en" ? "Today" : "اليوم",
      priority: "high" as const,
      status: "pending" as const,
    },
    {
      id: 2,
      title: language === "en" ? "Programming Project" : "مشروع البرمجة",
      course: language === "en" ? "Computer Science" : "علوم الحاسوب",
      dueDate: language === "en" ? "Tomorrow" : "غداً",
      priority: "medium" as const,
      status: "pending" as const,
    },
    {
      id: 3,
      title: language === "en" ? "Essay: Shakespeare Analysis" : "تحليل مقالة شكسبير",
      course: language === "en" ? "Literature" : "الأدب",
      dueDate: language === "en" ? "3 days" : "3 أيام",
      priority: "low" as const,
      status: "submitted" as const,
    },
    {
      id: 4,
      title: language === "en" ? "Lab Report" : "تقرير المختبر",
      course: language === "en" ? "Physics" : "الفيزياء",
      dueDate: language === "en" ? "1 week" : "أسبوع",
      priority: "medium" as const,
      status: "graded" as const,
    },
  ];

  const handleCourseClick = (id: number) => {
    navigate(`/course/${id}`);
  };

  const handleAssignmentUpload = (id: number) => {
    setSelectedAssignment(id);
    setActiveView("upload");
  };

  const handleFileSubmit = (file: File) => {
    console.log(`Submitting file for assignment ${selectedAssignment}:`, file.name);
    setSelectedAssignment(null);
    setActiveView("dashboard");
  };

  const handleMessageTeacher = (teacherId: number) => {
    console.log(`Messaging teacher ${teacherId}`);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {activeView === "dashboard" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {content[language].welcome} <span className="text-blue-600">{user?.name}</span>
            </h1>
            <p className="text-gray-600">{content[language].subtitle}</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard 
              icon={<BookOpen />} 
              title={content[language].stats.courses} 
              value="4" 
              change={content[language].stats.trendingUp}
              color="blue" 
            />
            <StatsCard 
              icon={<FileText />} 
              title={content[language].stats.assignments} 
              value="2" 
              color="orange" 
            />
            <StatsCard 
              icon={<Award />} 
              title={content[language].stats.gpa} 
              value="3.8" 
              change={content[language].stats.trendingDown}
              color="purple" 
            />
            <StatsCard 
              icon={<Star />} 
              title={content[language].stats.streak} 
              value="12" 
              color="green" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Courses and Achievements */}
            <div className="lg:col-span-2 space-y-6">
              {/* Courses Section */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                    {content[language].sections.courses}
                  </h2>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    {language === "en" ? "View all" : "عرض الكل"} <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <CourseCard 
                      key={course.id} 
                      id={course.id} 
                      title={course.title} 
                      instructor={course.instructor} 
                      progress={course.progress} 
                      nextClass={course.nextClass} 
                      color={course.color} 
                      onClick={handleCourseClick} 
                    />
                  ))}
                </div>
              </div>

              {/* Achievements Section */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-5">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  {content[language].sections.achievements}
                </h2>
                <div className="space-y-3">
                  {content[language].achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Star className="h-5 w-5 text-yellow-500 mr-3" />
                      <p className="text-sm font-medium text-gray-800">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Assignments and Quick Actions */}
            <div className="space-y-6">
              {/* Assignments Section */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-orange-600" />
                    {content[language].sections.assignments}
                  </h2>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    {language === "en" ? "View all" : "عرض الكل"} <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {assignments.map((assignment) => (
                    <AssignmentItem 
                      key={assignment.id} 
                      id={assignment.id} 
                      title={assignment.title} 
                      course={assignment.course} 
                      dueDate={assignment.dueDate} 
                      priority={assignment.priority} 
                      status={assignment.status} 
                      onUpload={handleAssignmentUpload} 
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions Section */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-5">
                  <BarChart2 className="h-5 w-5 mr-2 text-green-600" />
                  {content[language].sections.quickActions}
                </h2>
                
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start hover:bg-blue-50"
                    onClick={() => setActiveView("upload")}
                  >
                    <Upload className="h-5 w-5 mr-3 text-blue-600" />
                    {content[language].sections.submitAssignment}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start hover:bg-blue-50"
                    onClick={() => setActiveView("schedule")}
                  >
                    <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                    {content[language].sections.viewSchedule}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start hover:bg-blue-50"
                    onClick={() => setActiveView("teachers")}
                  >
                    <MessageSquare className="h-5 w-5 mr-3 text-blue-600" />
                    {content[language].sections.contactTeachers}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start hover:bg-blue-50"
                    onClick={() => navigate('/resources')}
                  >
                    <BookOpen className="h-5 w-5 mr-3 text-blue-600" />
                    {content[language].sections.resources}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === "schedule" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {language === "en" ? "My Class Schedule" : "جدول الحصص"}
            </h2>
            <Button 
              variant="outline" 
              onClick={() => setActiveView("dashboard")}
              className="flex items-center"
            >
              <Home className="h-4 w-4 mr-2" />
              {language === "en" ? "Back to Dashboard" : "العودة للوحة التحكم"}
            </Button>
          </div>
          <CalendarComponent events={scheduledClasses} language={language} />
        </div>
      )}

      {activeView === "teachers" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {language === "en" ? "My Teachers" : "معلموني"}
            </h2>
            <Button 
              variant="outline" 
              onClick={() => setActiveView("dashboard")}
              className="flex items-center"
            >
              <Home className="h-4 w-4 mr-2" />
              {language === "en" ? "Back to Dashboard" : "العودة للوحة التحكم"}
            </Button>
          </div>
          <TeachersList 
            teachers={teachers} 
            language={language} 
            onMessage={handleMessageTeacher} 
          />
        </div>
      )}

      {activeView === "upload" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {language === "en" ? "Submit Assignment" : "تسليم الواجب"}
            </h2>
            <Button 
              variant="outline" 
              onClick={() => setActiveView("dashboard")}
              className="flex items-center"
            >
              <Home className="h-4 w-4 mr-2" />
              {language === "en" ? "Back to Dashboard" : "العودة للوحة التحكم"}
            </Button>
          </div>
          <FileUpload 
            onFileSubmit={handleFileSubmit} 
            language={language} 
            assignment={assignments.find((a) => a.id === selectedAssignment)} 
          />
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;