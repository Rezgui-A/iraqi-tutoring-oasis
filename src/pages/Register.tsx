
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, Users, BookOpen, Heart } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("student");
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

  const roles = {
    student: {
      title: "Student Registration",
      icon: GraduationCap,
      color: "tutor-yellow",
      bgGradient: "from-tutor-yellow/10 to-yellow-50",
      redirect: "/student-dashboard"
    },
    parent: {
      title: "Parent Registration", 
      icon: Heart,
      color: "tutor-yellow",
      bgGradient: "from-tutor-yellow/10 to-yellow-50",
      redirect: "/parent-dashboard"
    },
    teacher: {
      title: "Teacher Registration",
      icon: Users,
      color: "tutor-green",
      bgGradient: "from-tutor-green/10 to-green-50",
      redirect: "/teacher-dashboard"
    },
    tutor: {
      title: "Student Tutor Registration",
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Simulate registration - in real app would create account
    navigate(currentRole.redirect);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          <p className="text-gray-600">Join our learning community today</p>
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
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                />
              </div>

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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                />
              </div>

              {(activeRole === 'student' || activeRole === 'parent') && (
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level</Label>
                  <Input
                    id="grade"
                    name="grade"
                    placeholder="e.g., Grade 10, University"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="h-12"
                  />
                </div>
              )}

              {(activeRole === 'teacher' || activeRole === 'tutor') && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="subjects">Subjects You Teach</Label>
                    <Input
                      id="subjects"
                      name="subjects"
                      placeholder="e.g., Math, Physics, English"
                      value={formData.subjects}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Teaching Experience</Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      placeholder="Briefly describe your teaching experience..."
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </>
              )}

              <Button 
                type="submit" 
                className={`w-full h-12 text-lg font-medium ${
                  currentRole.color === 'tutor-yellow' ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate('/login')}
                  className="text-tutor-green font-medium hover:underline"
                >
                  Sign In
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

export default Register;
