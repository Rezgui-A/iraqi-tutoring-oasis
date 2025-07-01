
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, BookOpen, Heart } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("student");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const roles = {
    student: {
      title: "Student Login",
      icon: GraduationCap,
      color: "tutor-yellow",
      bgGradient: "from-tutor-yellow/10 to-yellow-50",
      redirect: "/student-dashboard"
    },
    parent: {
      title: "Parent Login", 
      icon: Heart,
      color: "tutor-yellow",
      bgGradient: "from-tutor-yellow/10 to-yellow-50",
      redirect: "/parent-dashboard"
    },
    teacher: {
      title: "Teacher Login",
      icon: Users,
      color: "tutor-green",
      bgGradient: "from-tutor-green/10 to-green-50",
      redirect: "/teacher-dashboard"
    },
    tutor: {
      title: "Student Tutor Login",
      icon: BookOpen,
      color: "tutor-green", 
      bgGradient: "from-tutor-green/10 to-green-50",
      redirect: "/teacher-dashboard"
    }
  };

  const currentRole = roles[activeRole as keyof typeof roles];
  const Icon = currentRole.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app would validate credentials
    navigate(currentRole.redirect);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentRole.bgGradient} flex items-center justify-center p-4`}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-10 w-10 text-tutor-green" />
            <span className="font-nunito font-bold text-2xl text-gray-900">IraqiTutor</span>
          </div>
          <p className="text-gray-600">Welcome back to your learning journey</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              currentRole.color === 'tutor-yellow' ? 'bg-tutor-yellow/20' : 'bg-tutor-green/20'
            }`}>
              <Icon className={`h-8 w-8 ${
                currentRole.color === 'tutor-yellow' ? 'text-tutor-yellow' : 'text-tutor-green'
              }`} />
            </div>
            <CardTitle className="text-2xl font-nunito">{currentRole.title}</CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs value={activeRole} onValueChange={setActiveRole} className="mb-6">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger 
                  value="student" 
                  className="data-[state=active]:bg-tutor-yellow/20 data-[state=active]:text-tutor-yellow"
                >
                  Student
                </TabsTrigger>
                <TabsTrigger 
                  value="parent"
                  className="data-[state=active]:bg-tutor-yellow/20 data-[state=active]:text-tutor-yellow"
                >
                  Parent
                </TabsTrigger>
              </TabsList>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="teacher"
                  className="data-[state=active]:bg-tutor-green/20 data-[state=active]:text-tutor-green"
                >
                  Teacher
                </TabsTrigger>
                <TabsTrigger 
                  value="tutor"
                  className="data-[state=active]:bg-tutor-green/20 data-[state=active]:text-tutor-green"
                >
                  Student Tutor
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-tutor-green hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button 
                type="submit" 
                className={`w-full h-12 text-lg font-medium ${
                  currentRole.color === 'tutor-yellow' ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate('/register')}
                  className="text-tutor-green font-medium hover:underline"
                >
                  Create Account
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 flex items-center justify-center mx-auto"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
