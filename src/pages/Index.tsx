
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Video, Star, GraduationCap, Heart, Clock, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const userRoles = [
    {
      title: "Students",
      description: "Connect with expert tutors and boost your academic performance",
      icon: GraduationCap,
      color: "tutor-yellow",
      features: ["1-on-1 Sessions", "Homework Help", "Exam Prep"]
    },
    {
      title: "Parents",
      description: "Monitor your child's progress and support their learning journey",
      icon: Heart,
      color: "tutor-yellow",
      features: ["Progress Reports", "Session Approval", "Teacher Communication"]
    },
    {
      title: "Certified Teachers",
      description: "Share your expertise and earn income through online tutoring",
      icon: Users,
      color: "tutor-green",
      features: ["Flexible Schedule", "Competitive Rates", "Professional Tools"]
    },
    {
      title: "Student Tutors",
      description: "Help fellow students while developing your teaching skills",
      icon: BookOpen,
      color: "tutor-green",
      features: ["Peer Teaching", "Skill Development", "Extra Income"]
    }
  ];

  const testimonials = [
    {
      name: "أحمد محمد",
      role: "طالب ثانوية",
      content: "IraqiTutor helped me improve my math grades significantly. The teachers are patient and explain everything clearly.",
      rating: 5
    },
    {
      name: "فاطمة علي",
      role: "والدة",
      content: "I love being able to track my daughter's progress and communicate directly with her tutors. Very transparent platform.",
      rating: 5
    },
    {
      name: "د. سارة حسن",
      role: "مدرسة معتمدة",
      content: "The platform provides excellent tools for online teaching. My students are more engaged than ever.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-gray-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-tutor-green" />
              <span className="font-nunito font-bold text-xl text-gray-900">IraqiTutor</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="font-medium"
              >
                تسجيل الدخول
              </Button>
              <Button 
                className="btn-primary"
                onClick={() => navigate('/register')}
              >
                إنشاء حساب
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-nunito font-bold text-gray-900 mb-6 animate-fade-in">
            Excellence in
            <span className="text-tutor-green"> Online Tutoring</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Connect students with certified teachers and peer tutors across Iraq. 
            Quality education, personalized learning, and trusted results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button 
              size="lg" 
              className="btn-primary text-lg px-8 py-4"
              onClick={() => navigate('/register')}
            >
              Start Learning Today
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="bg-tutor-yellow/20 p-4 rounded-full">
            <BookOpen className="h-6 w-6 text-tutor-yellow" />
          </div>
        </div>
        <div className="absolute top-32 right-16 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="bg-tutor-green/20 p-4 rounded-full">
            <Video className="h-6 w-6 text-tutor-green" />
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="roles" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-nunito font-bold text-gray-900 mb-4">
              Who Are You?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your role to get started with personalized features designed just for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {userRoles.map((role, index) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.title;
              
              return (
                <Card 
                  key={role.title} 
                  className={`card-hover cursor-pointer transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-tutor-green shadow-lg' : ''
                  }`}
                  onClick={() => setSelectedRole(role.title)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      role.color === 'tutor-yellow' ? 'bg-tutor-yellow/20' : 'bg-tutor-green/20'
                    }`}>
                      <Icon className={`h-8 w-8 ${
                        role.color === 'tutor-yellow' ? 'text-tutor-yellow' : 'text-tutor-green'
                      }`} />
                    </div>
                    <h3 className="text-xl font-nunito font-semibold text-gray-900 mb-2">
                      {role.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {role.description}
                    </p>
                    <div className="space-y-2">
                      {role.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 bg-tutor-green rounded-full mr-2" />
                          {feature}
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
              className="btn-secondary"
              onClick={() => navigate('/register')}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-tutor-green/5 to-tutor-yellow/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-nunito font-bold text-gray-900 mb-4">
              Why Choose IraqiTutor?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-tutor-green/20 rounded-full flex items-center justify-center">
                <Shield className="h-10 w-10 text-tutor-green" />
              </div>
              <h3 className="text-xl font-nunito font-semibold mb-4">Trusted & Secure</h3>
              <p className="text-gray-600">All tutors are verified and background-checked for your safety</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-tutor-blue/20 rounded-full flex items-center justify-center">
                <Video className="h-10 w-10 text-tutor-blue" />
              </div>
              <h3 className="text-xl font-nunito font-semibold mb-4">Interactive Learning</h3>
              <p className="text-gray-600">HD video calls with digital whiteboard and screen sharing</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-tutor-yellow/20 rounded-full flex items-center justify-center">
                <Clock className="h-10 w-10 text-tutor-yellow" />
              </div>
              <h3 className="text-xl font-nunito font-semibold mb-4">Flexible Scheduling</h3>
              <p className="text-gray-600">Book sessions that fit your schedule, available 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-nunito font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-tutor-yellow fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
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
            <span className="font-nunito font-bold text-xl">IraqiTutor</span>
          </div>
          <p className="text-gray-400 mb-4">
            Empowering education across Iraq through technology and dedicated teachers.
          </p>
          <div className="border-t border-gray-800 pt-6 mt-6">
            <p className="text-gray-500 text-sm">
              © 2024 IraqiTutor. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
