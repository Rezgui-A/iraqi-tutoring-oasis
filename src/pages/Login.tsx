
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, BookOpen, Heart, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Arabic content only (main language)
  const content = {
    title: "مرحباً بعودتك إلى رحلتك التعليمية",
    roles: {
      student: "تسجيل دخول الطالب",
      parent: "تسجيل دخول ولي الأمر", 
      teacher: "تسجيل دخول المعلم",
      tutor: "تسجيل دخول المدرس المساعد"
    },
    form: {
      email: "البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      password: "كلمة المرور",
      passwordPlaceholder: "أدخل كلمة المرور",
      remember: "تذكرني",
      forgot: "نسيت كلمة المرور؟",
      signin: "تسجيل الدخول",
      noAccount: "ليس لديك حساب؟",
      createAccount: "إنشاء حساب",
      backHome: "← العودة للرئيسية"
    }
  };

  const roles = {
    student: {
      title: content.roles.student,
      icon: GraduationCap,
      color: "accent-yellow",
      bgGradient: "from-accent-yellow/10 via-yellow-50 to-light-gray",
      redirect: "/student-dashboard",
      image: "photo-1581091226825-a6a2a5aee158"
    },
    parent: {
      title: content.roles.parent, 
      icon: Heart,
      color: "accent-yellow",
      bgGradient: "from-accent-yellow/10 via-yellow-50 to-light-gray",
      redirect: "/parent-dashboard",
      image: "photo-1649972904349-6e44c42644a7"
    },
    teacher: {
      title: content.roles.teacher,
      icon: Users,
      color: "primary-green",
      bgGradient: "from-primary-green/10 via-green-50 to-light-gray",
      redirect: "/teacher-dashboard",
      image: "photo-1488590528505-98d2b5aba04b"
    },
    tutor: {
      title: content.roles.tutor,
      icon: BookOpen,
      color: "primary-green", 
      bgGradient: "from-primary-green/10 via-green-50 to-light-gray",
      redirect: "/teacher-dashboard",
      image: "photo-1461749280684-dccba630e2f6"
    }
  };

  const currentRole = roles[activeRole as keyof typeof roles];
  const Icon = currentRole.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(currentRole.redirect);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentRole.bgGradient} flex items-center justify-center p-4 rtl`} dir="rtl">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-green/5 to-accent-yellow/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-yellow/5 to-primary-green/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-10 w-10 text-primary-green" />
            <span className="font-nunito font-bold text-2xl text-primary-blue">
              المدرس العراقي
            </span>
          </div>
          <p className="text-dark-gray">{content.title}</p>
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
                currentRole.color === 'accent-yellow' ? 'bg-accent-yellow/90' : 'bg-primary-green/90'
              }`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-nunito text-primary-blue">{currentRole.title}</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="mb-6">
              <Tabs value={activeRole} onValueChange={setActiveRole} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger 
                    value="student" 
                    className="data-[state=active]:bg-accent-yellow/20 data-[state=active]:text-accent-yellow text-sm"
                  >
                    طالب
                  </TabsTrigger>
                  <TabsTrigger 
                    value="parent"
                    className="data-[state=active]:bg-accent-yellow/20 data-[state=active]:text-accent-yellow text-sm"
                  >
                    ولي أمر
                  </TabsTrigger>
                </TabsList>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger 
                    value="teacher"
                    className="data-[state=active]:bg-primary-green/20 data-[state=active]:text-primary-green text-sm"
                  >
                    معلم
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tutor"
                    className="data-[state=active]:bg-primary-green/20 data-[state=active]:text-primary-green text-sm"
                  >
                    مدرس مساعد
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right text-dark-gray">{content.form.email}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={content.form.emailPlaceholder}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-12 text-right border-medium-gray focus:border-primary-green"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-right text-dark-gray">{content.form.password}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={content.form.passwordPlaceholder}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-12 text-right pr-12 border-medium-gray focus:border-primary-green"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-medium-gray hover:text-primary-green"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-medium-gray" />
                  <span className="text-dark-gray">{content.form.remember}</span>
                </label>
                <a href="#" className="text-primary-green hover:underline">
                  {content.form.forgot}
                </a>
              </div>

              <Button 
                type="submit" 
                className={`w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all ${
                  currentRole.color === 'accent-yellow' ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {content.form.signin}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-dark-gray">
                {content.form.noAccount}{" "}
                <button
                  onClick={() => navigate('/register')}
                  className="text-primary-green font-medium hover:underline"
                >
                  {content.form.createAccount}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-medium-gray hover:text-primary-green flex items-center justify-center mx-auto transition-colors"
          >
            {content.form.backHome}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
