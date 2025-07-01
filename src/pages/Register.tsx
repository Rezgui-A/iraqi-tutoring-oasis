
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, Users, BookOpen, Heart, Languages, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("student");
  const [isArabic, setIsArabic] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    grade: "",
    subjects: "",
    experience: ""
  });

  const content = {
    ar: {
      title: "انضم إلى مجتمعنا التعليمي اليوم",
      roles: {
        student: "تسجيل طالب جديد",
        parent: "تسجيل ولي أمر جديد", 
        teacher: "تسجيل معلم جديد",
        tutor: "تسجيل مدرس مساعد جديد"
      },
      form: {
        fullName: "الاسم الكامل",
        fullNamePlaceholder: "أدخل اسمك الكامل",
        email: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        password: "كلمة المرور",
        passwordPlaceholder: "كلمة المرور",
        confirmPassword: "تأكيد",
        confirmPlaceholder: "تأكيد",
        phone: "رقم الهاتف",
        phonePlaceholder: "أدخل رقم هاتفك",
        grade: "المرحلة الدراسية",
        gradePlaceholder: "مثال: الصف العاشر، الجامعة",
        subjects: "المواد التي تدرسها",
        subjectsPlaceholder: "مثال: رياضيات، فيزياء، إنجليزي",
        experience: "الخبرة التدريسية",
        experiencePlaceholder: "اوصف خبرتك التدريسية بإيجاز...",
        createAccount: "إنشاء حساب",
        haveAccount: "لديك حساب بالفعل؟",
        signin: "تسجيل الدخول",
        backHome: "← العودة للرئيسية"
      }
    },
    en: {
      title: "Join our learning community today",
      roles: {
        student: "Student Registration",
        parent: "Parent Registration", 
        teacher: "Teacher Registration",
        tutor: "Student Tutor Registration"
      },
      form: {
        fullName: "Full Name",
        fullNamePlaceholder: "Enter your full name",
        email: "Email Address",
        emailPlaceholder: "Enter your email",
        password: "Password",
        passwordPlaceholder: "Password",
        confirmPassword: "Confirm",
        confirmPlaceholder: "Confirm",
        phone: "Phone Number",
        phonePlaceholder: "Enter your phone number",
        grade: "Grade Level",
        gradePlaceholder: "e.g., Grade 10, University",
        subjects: "Subjects You Teach",
        subjectsPlaceholder: "e.g., Math, Physics, English",
        experience: "Teaching Experience",
        experiencePlaceholder: "Briefly describe your teaching experience...",
        createAccount: "Create Account",
        haveAccount: "Already have an account?",
        signin: "Sign In",
        backHome: "← Back to Home"
      }
    }
  };

  const t = isArabic ? content.ar : content.en;

  const roles = {
    student: {
      title: t.roles.student,
      icon: GraduationCap,
      color: "tutor-yellow",
      bgGradient: "from-tutor-yellow/10 via-yellow-50 to-warm-gray-50",
      redirect: "/student-dashboard",
      image: "photo-1581091226825-a6a2a5aee158"
    },
    parent: {
      title: t.roles.parent, 
      icon: Heart,
      color: "tutor-yellow",
      bgGradient: "from-tutor-yellow/10 via-yellow-50 to-warm-gray-50",
      redirect: "/parent-dashboard",
      image: "photo-1649972904349-6e44c42644a7"
    },
    teacher: {
      title: t.roles.teacher,
      icon: Users,
      color: "tutor-green",
      bgGradient: "from-tutor-green/10 via-green-50 to-warm-gray-50",
      redirect: "/teacher-dashboard",
      image: "photo-1488590528505-98d2b5aba04b"
    },
    tutor: {
      title: t.roles.tutor,
      icon: BookOpen,
      color: "tutor-green", 
      bgGradient: "from-tutor-green/10 via-green-50 to-warm-gray-50",
      redirect: "/teacher-dashboard",
      image: "photo-1461749280684-dccba630e2f6"
    }
  };

  const currentRole = roles[activeRole as keyof typeof roles];
  const Icon = currentRole.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert(isArabic ? "كلمات المرور غير متطابقة!" : "Passwords don't match!");
      return;
    }
    navigate(currentRole.redirect);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentRole.bgGradient} flex items-center justify-center p-4 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-tutor-green/5 to-tutor-yellow/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-tutor-yellow/5 to-tutor-green/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-10 w-10 text-tutor-green" />
            <span className="font-nunito font-bold text-2xl text-gray-900">
              {isArabic ? "المدرس العراقي" : "IraqiTutor"}
            </span>
          </div>
          <p className="text-gray-600">{t.title}</p>
        </div>

        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center pb-4">
            <div className="relative mb-4">
              <img 
                src={`https://images.unsplash.com/${currentRole.image}?w=400&h=200&fit=crop`}
                alt={currentRole.title}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              <div className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center ${
                currentRole.color === 'tutor-yellow' ? 'bg-tutor-yellow/90' : 'bg-tutor-green/90'
              }`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-nunito">{currentRole.title}</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <Tabs value={activeRole} onValueChange={setActiveRole} className="flex-1">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger 
                    value="student" 
                    className="data-[state=active]:bg-tutor-yellow/20 data-[state=active]:text-tutor-yellow text-sm"
                  >
                    طالب
                  </TabsTrigger>
                  <TabsTrigger 
                    value="parent"
                    className="data-[state=active]:bg-tutor-yellow/20 data-[state=active]:text-tutor-yellow text-sm"
                  >
                    ولي أمر
                  </TabsTrigger>
                </TabsList>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger 
                    value="teacher"
                    className="data-[state=active]:bg-tutor-green/20 data-[state=active]:text-tutor-green text-sm"
                  >
                    معلم
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tutor"
                    className="data-[state=active]:bg-tutor-green/20 data-[state=active]:text-tutor-green text-sm"
                  >
                    مدرس مساعد
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsArabic(!isArabic)}
                className="ml-4 flex items-center space-x-2"
              >
                <Languages className="h-4 w-4" />
                <span>{isArabic ? "EN" : "عربي"}</span>
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t.form.fullName}</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder={t.form.fullNamePlaceholder}
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.form.email}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t.form.emailPlaceholder}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">{t.form.password}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t.form.passwordPlaceholder}
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="h-12 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t.form.confirmPassword}</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t.form.confirmPlaceholder}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="h-12 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t.form.phone}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t.form.phonePlaceholder}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                />
              </div>

              {(activeRole === 'student' || activeRole === 'parent') && (
                <div className="space-y-2">
                  <Label htmlFor="grade">{t.form.grade}</Label>
                  <Input
                    id="grade"
                    name="grade"
                    placeholder={t.form.gradePlaceholder}
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="h-12"
                  />
                </div>
              )}

              {(activeRole === 'teacher' || activeRole === 'tutor') && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="subjects">{t.form.subjects}</Label>
                    <Input
                      id="subjects"
                      name="subjects"
                      placeholder={t.form.subjectsPlaceholder}
                      value={formData.subjects}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">{t.form.experience}</Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      placeholder={t.form.experiencePlaceholder}
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </>
              )}

              <Button 
                type="submit" 
                className={`w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all ${
                  currentRole.color === 'tutor-yellow' ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {t.form.createAccount}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {t.form.haveAccount}{" "}
                <button
                  onClick={() => navigate('/login')}
                  className="text-tutor-green font-medium hover:underline"
                >
                  {t.form.signin}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 flex items-center justify-center mx-auto transition-colors"
          >
            {t.form.backHome}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
