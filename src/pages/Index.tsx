
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Video, Star, GraduationCap, Heart, Clock, Shield, Globe, Translate } from "lucide-react";

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
        title: "التميز في",
        titleHighlight: "التدريس الخصوصي الإلكتروني",
        subtitle: "ربط الطلاب بالمعلمين المعتمدين والمدرسين المساعدين في جميع أنحاء العراق. تعليم عالي الجودة، تعلم شخصي، ونتائج موثوقة.",
        cta1: "ابدأ التعلم اليوم",
        cta2: "اعرف المزيد"
      },
      roles: {
        title: "من أنت؟",
        subtitle: "اختر دورك للبدء مع الميزات المخصصة المصممة خصيصاً لك",
        student: {
          title: "الطلاب",
          description: "تواصل مع المدرسين الخبراء وعزز أداءك الأكاديمي",
          features: ["جلسات فردية", "مساعدة في الواجبات", "التحضير للامتحانات"]
        },
        parent: {
          title: "أولياء الأمور",
          description: "راقب تقدم طفلك وادعم رحلته التعليمية",
          features: ["تقارير التقدم", "موافقة الجلسات", "التواصل مع المعلمين"]
        },
        teacher: {
          title: "المعلمون المعتمدون",
          description: "شارك خبرتك واكسب دخلاً من خلال التدريس الإلكتروني",
          features: ["جدول مرن", "أسعار تنافسية", "أدوات مهنية"]
        },
        tutor: {
          title: "المدرسون المساعدون",
          description: "ساعد زملائك الطلاب بينما تطور مهاراتك التدريسية",
          features: ["تدريس الأقران", "تطوير المهارات", "دخل إضافي"]
        },
        cta: "ابدأ الآن"
      },
      features: {
        title: "لماذا تختار المدرس العراقي؟",
        trust: {
          title: "موثوق وآمن",
          description: "جميع المدرسين معتمدون ومفحوصون لضمان سلامتك"
        },
        interactive: {
          title: "تعلم تفاعلي",
          description: "مكالمات فيديو عالية الدقة مع سبورة رقمية ومشاركة الشاشة"
        },
        flexible: {
          title: "جدولة مرنة",
          description: "احجز جلسات تناسب جدولك، متاح على مدار الساعة"
        }
      },
      testimonials: {
        title: "ما يقوله مجتمعنا",
        items: [
          {
            name: "أحمد محمد",
            role: "طالب ثانوية",
            content: "المدرس العراقي ساعدني على تحسين درجاتي في الرياضيات بشكل كبير. المعلمون صبورون ويشرحون كل شيء بوضوح.",
            rating: 5
          },
          {
            name: "فاطمة علي",
            role: "والدة",
            content: "أحب أن أكون قادرة على تتبع تقدم ابنتي والتواصل مباشرة مع معلميها. منصة شفافة جداً.",
            rating: 5
          },
          {
            name: "د. سارة حسن",
            role: "مدرسة معتمدة",
            content: "توفر المنصة أدوات ممتازة للتدريس الإلكتروني. طلابي أكثر انخراطاً من أي وقت مضى.",
            rating: 5
          }
        ]
      },
      footer: {
        description: "تمكين التعليم في جميع أنحاء العراق من خلال التكنولوجيا والمعلمين المتفانين.",
        copyright: "© 2024 المدرس العراقي. جميع الحقوق محفوظة."
      }
    },
    en: {
      nav: {
        login: "Login",
        register: "Sign Up"
      },
      hero: {
        title: "Excellence in",
        titleHighlight: "Online Tutoring",
        subtitle: "Connect students with certified teachers and peer tutors across Iraq. Quality education, personalized learning, and trusted results.",
        cta1: "Start Learning Today",
        cta2: "Learn More"
      },
      roles: {
        title: "Who Are You?",
        subtitle: "Choose your role to get started with personalized features designed just for you",
        student: {
          title: "Students",
          description: "Connect with expert tutors and boost your academic performance",
          features: ["1-on-1 Sessions", "Homework Help", "Exam Prep"]
        },
        parent: {
          title: "Parents",
          description: "Monitor your child's progress and support their learning journey",
          features: ["Progress Reports", "Session Approval", "Teacher Communication"]
        },
        teacher: {
          title: "Certified Teachers",
          description: "Share your expertise and earn income through online tutoring",
          features: ["Flexible Schedule", "Competitive Rates", "Professional Tools"]
        },
        tutor: {
          title: "Student Tutors",
          description: "Help fellow students while developing your teaching skills",
          features: ["Peer Teaching", "Skill Development", "Extra Income"]
        },
        cta: "Get Started Now"
      },
      features: {
        title: "Why Choose IraqiTutor?",
        trust: {
          title: "Trusted & Secure",
          description: "All tutors are verified and background-checked for your safety"
        },
        interactive: {
          title: "Interactive Learning",
          description: "HD video calls with digital whiteboard and screen sharing"
        },
        flexible: {
          title: "Flexible Scheduling",
          description: "Book sessions that fit your schedule, available 24/7"
        }
      },
      testimonials: {
        title: "What Our Community Says",
        items: [
          {
            name: "Ahmed Mohammed",
            role: "High School Student",
            content: "IraqiTutor helped me improve my math grades significantly. The teachers are patient and explain everything clearly.",
            rating: 5
          },
          {
            name: "Fatima Ali",
            role: "Parent",
            content: "I love being able to track my daughter's progress and communicate directly with her tutors. Very transparent platform.",
            rating: 5
          },
          {
            name: "Dr. Sarah Hassan",
            role: "Certified Teacher",
            content: "The platform provides excellent tools for online teaching. My students are more engaged than ever.",
            rating: 5
          }
        ]
      },
      footer: {
        description: "Empowering education across Iraq through technology and dedicated teachers.",
        text: "© 2024 IraqiTutor. All rights reserved."
      }
    }
  };

  const t = isArabic ? content.ar : content.en;

  const userRoles = [
    {
      title: t.roles.student.title,
      description: t.roles.student.description,
      icon: GraduationCap,
      color: "tutor-yellow",
      features: t.roles.student.features,
      image: "photo-1581091226825-a6a2a5aee158"
    },
    {
      title: t.roles.parent.title,
      description: t.roles.parent.description,
      icon: Heart,
      color: "tutor-yellow",
      features: t.roles.parent.features,
      image: "photo-1649972904349-6e44c42644a7"
    },
    {
      title: t.roles.teacher.title,
      description: t.roles.teacher.description,
      icon: Users,
      color: "tutor-green",
      features: t.roles.teacher.features,
      image: "photo-1488590528505-98d2b5aba04b"
    },
    {
      title: t.roles.tutor.title,
      description: t.roles.tutor.description,
      icon: BookOpen,
      color: "tutor-green",
      features: t.roles.tutor.features,
      image: "photo-1461749280684-dccba630e2f6"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-warm-gray-50 to-white ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-tutor-green" />
              <span className="font-nunito font-bold text-xl text-gray-900">
                {isArabic ? "المدرس العراقي" : "IraqiTutor"}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsArabic(!isArabic)}
                className="flex items-center space-x-2"
              >
                <Translate className="h-4 w-4" />
                <span>{isArabic ? "EN" : "عربي"}</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="font-medium"
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
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-tutor-yellow/5 via-tutor-green/5 to-tutor-yellow/5"></div>
        <div className="absolute top-10 left-20 w-32 h-32 bg-tutor-yellow/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-tutor-green/10 rounded-full blur-xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=400&fit=crop&crop=center"
              alt="Iraq education"
              className="w-full h-48 object-cover rounded-2xl shadow-2xl mb-8"
            />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-nunito font-bold text-gray-900 mb-6 animate-fade-in">
            {t.hero.title}
            <span className="text-tutor-green"> {t.hero.titleHighlight}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button 
              size="lg" 
              className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => navigate('/register')}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              {t.hero.cta1}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 border-2 hover:bg-gray-50"
              onClick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Globe className="mr-2 h-5 w-5" />
              {t.hero.cta2}
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="bg-tutor-yellow/20 p-4 rounded-full shadow-lg">
            <BookOpen className="h-6 w-6 text-tutor-yellow" />
          </div>
        </div>
        <div className="absolute top-32 right-16 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="bg-tutor-green/20 p-4 rounded-full shadow-lg">
            <Video className="h-6 w-6 text-tutor-green" />
          </div>
        </div>
        <div className="absolute bottom-20 left-1/4 animate-bounce" style={{ animationDelay: '2s' }}>
          <div className="bg-tutor-blue/20 p-4 rounded-full shadow-lg">
            <Users className="h-6 w-6 text-tutor-blue" />
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="roles" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-nunito font-bold text-gray-900 mb-4">
              {t.roles.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                  className={`card-hover cursor-pointer transition-all duration-300 overflow-hidden ${
                    isSelected ? 'ring-2 ring-tutor-green shadow-2xl scale-105' : 'shadow-lg hover:shadow-xl'
                  }`}
                  onClick={() => setSelectedRole(role.title)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/${role.image}?w=400&h=200&fit=crop`}
                      alt={role.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center ${
                      role.color === 'tutor-yellow' ? 'bg-tutor-yellow/90' : 'bg-tutor-green/90'
                    }`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-nunito font-semibold text-gray-900 mb-2">
                      {role.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {role.description}
                    </p>
                    <div className="space-y-2">
                      {role.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 bg-tutor-green rounded-full mr-2 flex-shrink-0" />
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
              className="btn-secondary shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => navigate('/register')}
            >
              <Star className="mr-2 h-5 w-5" />
              {t.roles.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-tutor-green/5 to-tutor-yellow/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-nunito font-bold text-gray-900 mb-4">
              {t.features.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow card-hover">
              <CardContent className="p-0">
                <div className="w-20 h-20 mx-auto mb-6 bg-tutor-green/20 rounded-full flex items-center justify-center">
                  <Shield className="h-10 w-10 text-tutor-green" />
                </div>
                <h3 className="text-xl font-nunito font-semibold mb-4">{t.features.trust.title}</h3>
                <p className="text-gray-600">{t.features.trust.description}</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow card-hover">
              <CardContent className="p-0">
                <div className="w-20 h-20 mx-auto mb-6 bg-tutor-blue/20 rounded-full flex items-center justify-center">
                  <Video className="h-10 w-10 text-tutor-blue" />
                </div>
                <h3 className="text-xl font-nunito font-semibold mb-4">{t.features.interactive.title}</h3>
                <p className="text-gray-600">{t.features.interactive.description}</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow card-hover">
              <CardContent className="p-0">
                <div className="w-20 h-20 mx-auto mb-6 bg-tutor-yellow/20 rounded-full flex items-center justify-center">
                  <Clock className="h-10 w-10 text-tutor-yellow" />
                </div>
                <h3 className="text-xl font-nunito font-semibold mb-4">{t.features.flexible.title}</h3>
                <p className="text-gray-600">{t.features.flexible.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-nunito font-bold text-gray-900 mb-4">
              {t.testimonials.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
              <Card key={index} className="card-hover shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-tutor-yellow fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-tutor-green/20 rounded-full flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-tutor-green" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <GraduationCap className="h-8 w-8 text-tutor-green" />
            <span className="font-nunito font-bold text-xl">
              {isArabic ? "المدرس العراقي" : "IraqiTutor"}
            </span>
          </div>
          <p className="text-gray-400 mb-4 max-w-2xl mx-auto">
            {t.footer.description}
          </p>
          <div className="border-t border-gray-800 pt-6 mt-6">
            <p className="text-gray-500 text-sm">
              {t.footer.copyright || t.footer.text}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
