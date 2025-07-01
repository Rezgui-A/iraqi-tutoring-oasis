
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, Users, BookOpen, Heart, Eye, EyeOff, ArrowRight, Star, Shield, Clock } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("student");
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

  // Arabic content only (main language)
  const content = {
    title: "انضم إلى مجتمعنا التعليمي اليوم",
    subtitle: "ابدأ رحلتك التعليمية مع أفضل المدرسين في العراق",
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
      passwordPlaceholder: "كلمة المرور (8 أحرف على الأقل)",
      confirmPassword: "تأكيد كلمة المرور",
      confirmPlaceholder: "أعد إدخال كلمة المرور",
      phone: "رقم الهاتف",
      phonePlaceholder: "مثال: 07901234567",
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
    },
    benefits: {
      student: [
        { icon: Star, text: "دروس تفاعلية مع أفضل المدرسين" },
        { icon: Clock, text: "جدولة مرنة تناسب وقتك" },
        { icon: Shield, text: "تتبع تقدمك الأكاديمي" }
      ],
      parent: [
        { icon: Shield, text: "مراقبة تقدم أطفالك" },
        { icon: Star, text: "تقارير مفصلة عن الأداء" },
        { icon: Clock, text: "إشعارات فورية بالحصص" }
      ],
      teacher: [
        { icon: Users, text: "إدارة طلابك بسهولة" },
        { icon: Star, text: "أدوات تدريس متقدمة" },
        { icon: Clock, text: "جدولة مرنة للحصص" }
      ],
      tutor: [
        { icon: BookOpen, text: "مساعدة الطلاب في دروسهم" },
        { icon: Star, text: "بناء سمعة تدريسية" },
        { icon: Clock, text: "دخل إضافي مرن" }
      ]
    }
  };

  const roles = {
    student: {
      title: content.roles.student,
      icon: GraduationCap,
      color: "accent-yellow",
      bgGradient: "from-accent-yellow/20 via-accent-yellow/5 to-light-gray",
      buttonClass: "bg-accent-yellow hover:bg-accent-yellow/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
      redirect: "/student-dashboard",
      image: "photo-1581091226825-a6a2a5aee158",
      benefits: content.benefits.student
    },
    parent: {
      title: content.roles.parent, 
      icon: Heart,
      color: "accent-orange",
      bgGradient: "from-accent-orange/20 via-accent-orange/5 to-light-gray",
      buttonClass: "bg-accent-orange hover:bg-accent-orange/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
      redirect: "/parent-dashboard",
      image: "photo-1649972904349-6e44c42644a7",
      benefits: content.benefits.parent
    },
    teacher: {
      title: content.roles.teacher,
      icon: Users,
      color: "primary-green",
      bgGradient: "from-primary-green/20 via-primary-green/5 to-light-gray",
      buttonClass: "bg-primary-green hover:bg-primary-green/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
      redirect: "/teacher-dashboard",
      image: "photo-1488590528505-98d2b5aba04b",
      benefits: content.benefits.teacher
    },
    tutor: {
      title: content.roles.tutor,
      icon: BookOpen,
      color: "secondary-turquoise", 
      bgGradient: "from-secondary-turquoise/20 via-secondary-turquoise/5 to-light-gray",
      buttonClass: "bg-secondary-turquoise hover:bg-secondary-turquoise/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
      redirect: "/teacher-dashboard",
      image: "photo-1461749280684-dccba630e2f6",
      benefits: content.benefits.tutor
    }
  };

  const currentRole = roles[activeRole as keyof typeof roles];
  const Icon = currentRole.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("كلمات المرور غير متطابقة!");
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
    <div className={`min-h-screen bg-gradient-to-br ${currentRole.bgGradient} rtl`} dir="rtl">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary-green/10 to-accent-yellow/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-accent-orange/10 to-secondary-turquoise/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-primary-blue/5 to-primary-green/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <GraduationCap className="h-12 w-12 text-primary-green" />
              <span className="font-nunito font-bold text-3xl text-primary-blue">
                المدرس العراقي
              </span>
            </div>
            <h1 className="text-4xl font-nunito font-bold text-dark-gray mb-4">{content.title}</h1>
            <p className="text-xl text-medium-gray max-w-2xl mx-auto">{content.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Benefits Section */}
            <div className="space-y-6">
              <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95 overflow-hidden">
                <div className="relative">
                  <img 
                    src={`https://images.unsplash.com/${currentRole.image}?w=600&h=300&fit=crop`}
                    alt={currentRole.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 flex items-center space-x-3">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-${currentRole.color}/90 backdrop-blur-sm`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-white">
                      <h3 className="text-xl font-nunito font-bold">{currentRole.title}</h3>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {currentRole.benefits.map((benefit, index) => {
                      const BenefitIcon = benefit.icon;
                      return (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-l from-light-gray to-transparent">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${currentRole.color}/10`}>
                            <BenefitIcon className={`h-5 w-5 text-${currentRole.color}`} />
                          </div>
                          <span className="text-dark-gray font-medium">{benefit.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-nunito text-primary-blue mb-2">{currentRole.title}</CardTitle>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                {/* Role Selection Tabs */}
                <div className="mb-8">
                  <Tabs value={activeRole} onValueChange={setActiveRole} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4 h-14 bg-light-gray/50">
                      <TabsTrigger 
                        value="student" 
                        className="data-[state=active]:bg-accent-yellow/20 data-[state=active]:text-accent-yellow data-[state=active]:shadow-md text-sm font-medium h-12"
                      >
                        <GraduationCap className="h-4 w-4 ml-2" />
                        طالب
                      </TabsTrigger>
                      <TabsTrigger 
                        value="parent"
                        className="data-[state=active]:bg-accent-orange/20 data-[state=active]:text-accent-orange data-[state=active]:shadow-md text-sm font-medium h-12"
                      >
                        <Heart className="h-4 w-4 ml-2" />
                        ولي أمر
                      </TabsTrigger>
                    </TabsList>
                    <TabsList className="grid w-full grid-cols-2 h-14 bg-light-gray/50">
                      <TabsTrigger 
                        value="teacher"
                        className="data-[state=active]:bg-primary-green/20 data-[state=active]:text-primary-green data-[state=active]:shadow-md text-sm font-medium h-12"
                      >
                        <Users className="h-4 w-4 ml-2" />
                        معلم
                      </TabsTrigger>
                      <TabsTrigger 
                        value="tutor"
                        className="data-[state=active]:bg-secondary-turquoise/20 data-[state=active]:text-secondary-turquoise data-[state=active]:shadow-md text-sm font-medium h-12"
                      >
                        <BookOpen className="h-4 w-4 ml-2" />
                        مدرس مساعد
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-dark-gray font-medium">{content.form.fullName}</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder={content.form.fullNamePlaceholder}
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-right border-2 border-medium-gray/30 focus:border-primary-green focus:ring-0 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-dark-gray font-medium">{content.form.email}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={content.form.emailPlaceholder}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-right border-2 border-medium-gray/30 focus:border-primary-green focus:ring-0 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-dark-gray font-medium">{content.form.password}</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={content.form.passwordPlaceholder}
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="h-12 text-right pr-12 border-2 border-medium-gray/30 focus:border-primary-green focus:ring-0 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-medium-gray hover:text-primary-green transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-dark-gray font-medium">{content.form.confirmPassword}</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={content.form.confirmPlaceholder}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="h-12 text-right pr-12 border-2 border-medium-gray/30 focus:border-primary-green focus:ring-0 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-medium-gray hover:text-primary-green transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-dark-gray font-medium">{content.form.phone}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={content.form.phonePlaceholder}
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-right border-2 border-medium-gray/30 focus:border-primary-green focus:ring-0 transition-colors"
                    />
                  </div>

                  {(activeRole === 'student' || activeRole === 'parent') && (
                    <div className="space-y-2">
                      <Label htmlFor="grade" className="text-dark-gray font-medium">{content.form.grade}</Label>
                      <Input
                        id="grade"
                        name="grade"
                        placeholder={content.form.gradePlaceholder}
                        value={formData.grade}
                        onChange={handleInputChange}
                        className="h-12 text-right border-2 border-medium-gray/30 focus:border-primary-green focus:ring-0 transition-colors"
                      />
                    </div>
                  )}

                  {(activeRole === 'teacher' || activeRole === 'tutor') && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="subjects" className="text-dark-gray font-medium">{content.form.subjects}</Label>
                        <Input
                          id="subjects"
                          name="subjects"
                          placeholder={content.form.subjectsPlaceholder}
                          value={formData.subjects}
                          onChange={handleInputChange}
                          className="h-12 text-right border-2 border-medium-gray/30 focus:border-primary-green focus:ring-0 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience" className="text-dark-gray font-medium">{content.form.experience}</Label>
                        <Textarea
                          id="experience"
                          name="experience"
                          placeholder={content.form.experiencePlaceholder}
                          value={formData.experience}
                          onChange={handleInputChange}
                          rows={3}
                          className="text-right border-2 border-medium-gray/30 focus:border-primary-green focus:ring-0 transition-colors resize-none"
                        />
                      </div>
                    </>
                  )}

                  <Button 
                    type="submit" 
                    className={`w-full h-14 text-lg ${currentRole.buttonClass} flex items-center justify-center space-x-2`}
                  >
                    <span>{content.form.createAccount}</span>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-medium-gray">
                    {content.form.haveAccount}{" "}
                    <button
                      onClick={() => navigate('/login')}
                      className="text-primary-green font-medium hover:text-primary-green/80 hover:underline transition-colors"
                    >
                      {content.form.signin}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/')}
              className="text-medium-gray hover:text-primary-green flex items-center justify-center mx-auto transition-colors space-x-2 text-lg"
            >
              <span>{content.form.backHome}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
