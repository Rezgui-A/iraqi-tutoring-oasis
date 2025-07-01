
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Video, Star, GraduationCap, Heart, Clock, Shield, Globe, Languages, Award, TrendingUp, FileText, MessageSquare, Calendar, DollarSign } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isArabic, setIsArabic] = useState(true);

  const content = {
    ar: {
      nav: {
        login: "تسجيل الدخول", 
        register: "إنشاء حساب"
      },
      hero: {
        title: "منصة التدريس الخصوصي الرائدة في العراق",
        subtitle: "تواصل مع أفضل المدرسين المعتمدين في جميع المواد الدراسية. تعلم شخصي، نتائج مضمونة، ومتابعة شاملة لتقدمك الأكاديمي.",
        cta1: "ابدأ رحلتك التعليمية",
        cta2: "استكشف المنصة"
      },
      roles: {
        title: "من أنت؟",
        subtitle: "اختر دورك للاستفادة من الميزات المخصصة المصممة خصيصاً لك",
        student: {
          title: "الطلاب",
          description: "تواصل مع المدرسين الخبراء وطور مهاراتك الأكاديمية مع خطط تعلم مخصصة",
          features: ["بحث وتصفية المدرسين", "خطط تعلم 3-6 أشهر", "جلسات فردية أو جماعية", "تحليلات التقدم", "سبورة تفاعلية", "رفع الواجبات والملفات"]
        },
        parent: {
          title: "أولياء الأمور", 
          description: "راقب تقدم أطفالك وادعم رحلتهم التعليمية مع تقارير شاملة",
          features: ["نظرة عامة على الحجوزات", "موافقة الخطط التعليمية", "تقارير التقدم الأكاديمي", "التواصل مع المدرسين", "تقارير قابلة للتحميل", "إشعارات ورسائل"]
        },
        teacher: {
          title: "المعلمون المعتمدون",
          description: "شارك خبرتك واكسب دخلاً مميزاً من خلال التدريس الإلكتروني المتطور",
          features: ["إنشاء الملف الشخصي", "خطط تعلم مخصصة", "جلسات جماعية", "إنشاء الاختبارات", "مشاركة المواد", "تحليلات الأرباح"]
        },
        tutor: {
          title: "المدرسون المساعدون",
          description: "ساعد زملائك الطلاب وطور مهاراتك التدريسية مع دخل إضافي",
          features: ["تدريس الأقران", "مرونة في الجدولة", "أدوات تدريس احترافية", "تطوير المهارات", "دعم فني", "مجتمع تعليمي"]
        },
        cta: "ابدأ الآن مجاناً"
      },
      features: {
        title: "لماذا تختار منصتنا؟",
        items: [
          {
            title: "أمان وموثوقية",
            description: "جميع المدرسين معتمدون ومفحوصون، مع تسجيل آمن للجلسات",
            icon: Shield
          },
          {
            title: "تعلم تفاعلي متطور",
            description: "مكالمات فيديو عالية الجودة مع سبورة رقمية ومشاركة الشاشة والملفات",
            icon: Video
          },
          {
            title: "مرونة في الجدولة",
            description: "احجز جلسات تناسب وقتك، متاح 24/7 مع إمكانية الإلغاء والتعديل",
            icon: Clock
          },
          {
            title: "تحليلات شاملة",
            description: "تتبع تقدمك مع رسوم بيانية وتقارير مفصلة لقياس التحسن",
            icon: TrendingUp
          },
          {
            title: "دعم متعدد اللغات",
            description: "واجهة باللغتين العربية والإنجليزية مع مدرسين يتحدثون لغات متعددة",
            icon: Languages
          },
          {
            title: "خيارات دفع متنوعة",
            description: "ZainCash، AsiaPay، Stripe - طرق دفع آمنة ومريحة للجميع",
            icon: DollarSign
          }
        ]
      },
      testimonials: {
        title: "قصص نجاح طلابنا",
        items: [
          {
            name: "أحمد محمد الزهراني",
            role: "طالب في الصف الثالث متوسط",
            content: "تحسنت درجاتي في الرياضيات من 60% إلى 95% في شهرين فقط! المدرسون صبورون ويشرحون بطريقة سهلة ومفهومة.",
            rating: 5,
            improvement: "+35% في الرياضيات"
          },
          {
            name: "فاطمة علي حسن",
            role: "والدة طالبة في الثانوية",
            content: "المنصة ممتازة لمتابعة تقدم ابنتي. التقارير مفصلة والتواصل مع المدرسين سهل جداً. أنصح بها بشدة.",
            rating: 5,
            improvement: "متابعة يومية"
          },
          {
            name: "د. سارة أحمد الكريم",
            role: "مدرسة فيزياء معتمدة",
            content: "أدوات التدريس الرقمية رائعة والطلاب أكثر تفاعلاً. حققت دخلاً ممتازاً مع مرونة في الوقت.",
            rating: 5,
            improvement: "+200% في الدخل"
          }
        ]
      },
      stats: {
        title: "أرقام تتحدث عن نجاحنا",
        items: [
          { number: "10,000+", label: "طالب نشط" },
          { number: "500+", label: "مدرس معتمد" },
          { number: "95%", label: "نسبة رضا الطلاب" },
          { number: "50,000+", label: "ساعة تدريس مكتملة" }
        ]
      },
      subjects: {
        title: "المواد الدراسية المتاحة",
        items: [
          "الرياضيات", "الفيزياء", "الكيمياء", "اللغة العربية", 
          "اللغة الإنجليزية", "التاريخ", "الجغرافيا", "الأحياء",
          "الحاسوب", "التربية الإسلامية"
        ]
      },
      footer: {
        description: "تمكين التعليم في جميع أنحاء العراق من خلال التكنولوجيا والمعلمين المتفانين.",
        copyright: "© 2024 منصة التدريس العراقية. جميع الحقوق محفوظة."
      }
    },
    en: {
      nav: {
        login: "Login",
        register: "Sign Up"
      },
      hero: {
        title: "Leading Private Tutoring Platform in Iraq",
        subtitle: "Connect with the best certified teachers in all subjects. Personalized learning, guaranteed results, and comprehensive progress tracking.",
        cta1: "Start Your Learning Journey",
        cta2: "Explore Platform"
      },
      roles: {
        title: "Who Are You?",
        subtitle: "Choose your role to access personalized features designed just for you",
        student: {
          title: "Students",
          description: "Connect with expert tutors and develop your academic skills with personalized learning plans",
          features: ["Search & Filter Teachers", "3-6 Month Learning Plans", "Individual or Group Sessions", "Progress Analytics", "Interactive Whiteboard", "Upload Assignments & Files"]
        },
        parent: {
          title: "Parents",
          description: "Monitor your children's progress and support their educational journey with comprehensive reports",
          features: ["Booking Overview", "Learning Plan Approval", "Academic Progress Reports", "Teacher Communication", "Downloadable Reports", "Notifications & Messages"]
        },
        teacher: {
          title: "Certified Teachers",
          description: "Share your expertise and earn excellent income through advanced online teaching",
          features: ["Create Profile", "Custom Learning Plans", "Group Sessions", "Create Assessments", "Share Materials", "Earnings Analytics"]
        },
        tutor: {
          title: "Student Tutors",
          description: "Help fellow students and develop your teaching skills with additional income",
          features: ["Peer Teaching", "Flexible Scheduling", "Professional Tools", "Skill Development", "Technical Support", "Learning Community"]
        },
        cta: "Get Started Free"
      },
      features: {
        title: "Why Choose Our Platform?",
        items: [
          {
            title: "Security & Trust",
            description: "All teachers are certified and verified, with secure session recording",
            icon: Shield
          },
          {
            title: "Advanced Interactive Learning",
            description: "High-quality video calls with digital whiteboard, screen and file sharing",
            icon: Video
          },
          {
            title: "Flexible Scheduling",
            description: "Book sessions that fit your time, available 24/7 with cancellation options",
            icon: Clock
          },
          {
            title: "Comprehensive Analytics",
            description: "Track your progress with detailed graphs and reports measuring improvement",
            icon: TrendingUp
          },
          {
            title: "Multilingual Support",
            description: "Arabic and English interface with teachers speaking multiple languages",
            icon: Languages
          },
          {
            title: "Diverse Payment Options",
            description: "ZainCash, AsiaPay, Stripe - secure and convenient payment methods for everyone",
            icon: DollarSign
          }
        ]
      },
      testimonials: {
        title: "Our Students' Success Stories",
        items: [
          {
            name: "Ahmed Mohammed Al-Zahrani",
            role: "9th Grade Student",
            content: "My math grades improved from 60% to 95% in just two months! Teachers are patient and explain in an easy, understandable way.",
            rating: 5,
            improvement: "+35% in Mathematics"
          },
          {
            name: "Fatima Ali Hassan",
            role: "High School Student's Mother",
            content: "The platform is excellent for tracking my daughter's progress. Reports are detailed and communication with teachers is very easy. Highly recommend it.",
            rating: 5,
            improvement: "Daily Monitoring"
          },
          {
            name: "Dr. Sarah Ahmed Al-Kareem",
            role: "Certified Physics Teacher",
            content: "Digital teaching tools are amazing and students are more engaged. I've achieved excellent income with time flexibility.",
            rating: 5,
            improvement: "+200% Income"
          }
        ]
      },
      stats: {
        title: "Numbers That Speak of Our Success",
        items: [
          { number: "10,000+", label: "Active Students" },
          { number: "500+", label: "Certified Teachers" },
          { number: "95%", label: "Student Satisfaction" },
          { number: "50,000+", label: "Completed Teaching Hours" }
        ]
      },
      subjects: {
        title: "Available Subjects",
        items: [
          "Mathematics", "Physics", "Chemistry", "Arabic Language",
          "English Language", "History", "Geography", "Biology",
          "Computer Science", "Islamic Studies"
        ]
      },
      footer: {
        description: "Empowering education across Iraq through technology and dedicated teachers.",
        copyright: "© 2024 Iraqi Tutoring Platform. All rights reserved."
      }
    }
  };

  const t = isArabic ? content.ar : content.en;

  const userRoles = [
    {
      title: t.roles.student.title,
      description: t.roles.student.description,
      icon: GraduationCap,
      color: "accent-yellow",
      features: t.roles.student.features,
      image: "photo-1581091226825-a6a2a5aee158"
    },
    {
      title: t.roles.parent.title,
      description: t.roles.parent.description,
      icon: Heart,
      color: "accent-yellow",
      features: t.roles.parent.features,
      image: "photo-1649972904349-6e44c42644a7"
    },
    {
      title: t.roles.teacher.title,
      description: t.roles.teacher.description,
      icon: Users,
      color: "primary-green",
      features: t.roles.teacher.features,
      image: "photo-1488590528505-98d2b5aba04b"
    },
    {
      title: t.roles.tutor.title,
      description: t.roles.tutor.description,
      icon: BookOpen,
      color: "primary-green",
      features: t.roles.tutor.features,
      image: "photo-1461749280684-dccba630e2f6"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-light-gray to-white ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className="nav-primary border-b sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-light-green" />
              <span className="font-nunito font-bold text-xl text-white">
                {isArabic ? "المدرس العراقي" : "IraqiTutor"}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsArabic(!isArabic)}
                className="flex items-center space-x-2 border-light-green text-light-green hover:bg-light-green hover:text-primary-blue"
              >
                <Languages className="h-4 w-4" />
                <span>{isArabic ? "EN" : "عربي"}</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="font-medium border-white text-white hover:bg-white hover:text-primary-blue"
              >
                {t.nav.login}
              </Button>
              <Button 
                className="btn-primary"
                onClick={() => navigate('/register')}
              >
                {t.nav.register}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden bg-gradient-to-br from-primary-blue/5 via-primary-green/5 to-secondary-turquoise/5">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-32 h-32 bg-primary-green/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-40 h-40 bg-secondary-turquoise/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent-yellow/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop&crop=center"
              alt="Iraqi students learning"
              className="w-full h-64 object-cover rounded-2xl shadow-2xl mb-8"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-nunito font-bold text-primary-blue mb-6 animate-fade-in leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-xl text-dark-gray mb-8 max-w-4xl mx-auto animate-fade-in leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button 
              size="lg" 
              className="btn-primary text-lg px-10 py-4 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              onClick={() => navigate('/register')}
            >
              <BookOpen className="mr-2 h-6 w-6" />
              {t.hero.cta1}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="btn-outline text-lg px-10 py-4 shadow-lg hover:shadow-xl transition-all"
              onClick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Globe className="mr-2 h-6 w-6" />
              {t.hero.cta2}
            </Button>
          </div>
        </div>

        {/* Floating animated elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="bg-primary-green/20 p-4 rounded-full shadow-lg backdrop-blur-sm">
            <BookOpen className="h-8 w-8 text-primary-green" />
          </div>
        </div>
        <div className="absolute top-32 right-16 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="bg-secondary-turquoise/20 p-4 rounded-full shadow-lg backdrop-blur-sm">
            <Video className="h-8 w-8 text-secondary-turquoise" />
          </div>
        </div>
        <div className="absolute bottom-20 left-1/4 animate-bounce" style={{ animationDelay: '2s' }}>
          <div className="bg-accent-orange/20 p-4 rounded-full shadow-lg backdrop-blur-sm">
            <Users className="h-8 w-8 text-accent-orange" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-nunito font-bold text-primary-blue mb-4">
              {t.stats.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {t.stats.items.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-green mb-2">{stat.number}</div>
                <div className="text-medium-gray font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="roles" className="py-20 px-4 bg-gradient-to-br from-light-gray to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-nunito font-bold text-primary-blue mb-4">
              {t.roles.title}
            </h2>
            <p className="text-lg text-dark-gray max-w-3xl mx-auto">
              {t.roles.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {userRoles.map((role, index) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.title;
              
              return (
                <Card 
                  key={role.title} 
                  className={`card-hover cursor-pointer transition-all duration-300 overflow-hidden border-2 ${
                    isSelected ? 'border-primary-green shadow-2xl scale-105' : 'border-medium-gray/30 shadow-lg hover:shadow-xl hover:border-primary-green/50'
                  }`}
                  onClick={() => setSelectedRole(role.title)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/${role.image}?w=400&h=200&fit=crop`}
                      alt={role.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className={`absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                      role.color === 'accent-yellow' ? 'bg-accent-yellow/90' : 'bg-primary-green/90'
                    }`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-nunito font-semibold text-primary-blue mb-2">
                      {role.title}
                    </h3>
                    <p className="text-dark-gray mb-4 text-sm leading-relaxed">
                      {role.description}
                    </p>
                    <div className="space-y-2">
                      {role.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-dark-gray">
                          <div className="w-2 h-2 bg-primary-green rounded-full mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="btn-secondary shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 px-12 py-4 text-lg"
              onClick={() => navigate('/register')}
            >
              <Star className="mr-2 h-6 w-6" />
              {t.roles.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-nunito font-bold text-primary-blue mb-4">
              {t.features.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.items.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center p-8 shadow-lg hover:shadow-xl transition-all card-hover border-2 border-medium-gray/20 hover:border-primary-green/30">
                  <CardContent className="p-0">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-green/20 to-secondary-turquoise/20 rounded-full flex items-center justify-center">
                      <Icon className="h-10 w-10 text-primary-green" />
                    </div>
                    <h3 className="text-xl font-nunito font-semibold mb-4 text-primary-blue">{feature.title}</h3>
                    <p className="text-dark-gray leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-light-gray to-primary-green/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-nunito font-bold text-primary-blue mb-12">
            {t.subjects.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {t.subjects.items.map((subject, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-medium-gray/20">
                <span className="text-dark-gray font-medium">{subject}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-nunito font-bold text-primary-blue mb-4">
              {t.testimonials.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
              <Card key={index} className="card-hover shadow-lg hover:shadow-xl transition-all border-2 border-medium-gray/20 hover:border-primary-green/30">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent-yellow fill-current" />
                    ))}
                  </div>
                  <p className="text-dark-gray mb-4 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary-green/20 rounded-full flex items-center justify-center mr-4">
                        <Users className="h-6 w-6 text-primary-green" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary-blue">{testimonial.name}</p>
                        <p className="text-sm text-medium-gray">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="bg-light-green/20 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-primary-green">{testimonial.improvement}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-blue text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <GraduationCap className="h-10 w-10 text-light-green" />
            <span className="font-nunito font-bold text-2xl">
              {isArabic ? "المدرس العراقي" : "IraqiTutor"}
            </span>
          </div>
          <p className="text-light-green mb-6 max-w-2xl mx-auto text-lg">
            {t.footer.description}
          </p>
          <div className="border-t border-light-green/30 pt-6 mt-6">
            <p className="text-light-green/80 text-sm">
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
