
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarContent, AvatarFallback } from "@/components/ui/avatar";
import { Users, Calendar, DollarSign, Star, Clock, Video, User, LogOut, TrendingUp } from "lucide-react";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const teacherStats = {
    totalStudents: 28,
    monthlyEarnings: 2850,
    averageRating: 4.8,
    completedSessions: 145,
    upcomingSessions: 8
  };

  const upcomingSessions = [
    {
      student: "أحمد محمد",
      subject: "Mathematics",
      time: "Today, 3:00 PM",
      duration: "1 hour",
      type: "Regular Session"
    },
    {
      student: "فاطمة علي",
      subject: "Mathematics", 
      time: "Today, 5:00 PM",
      duration: "45 mins",
      type: "Exam Prep"
    },
    {
      student: "يوسف حسن",
      subject: "Physics",
      time: "Tomorrow, 10:00 AM",
      duration: "1 hour",
      type: "Homework Help"
    }
  ];

  const recentStudents = [
    {
      name: "سارة أحمد",
      subject: "Mathematics",
      progress: 85,
      lastSession: "Yesterday",
      avatar: "س"
    },
    {
      name: "محمد علي", 
      subject: "Physics",
      progress: 92,
      lastSession: "2 days ago",
      avatar: "م"
    },
    {
      name: "ليلى حسن",
      subject: "Mathematics",
      progress: 78,
      lastSession: "3 days ago", 
      avatar: "ل"
    }
  ];

  const earningsData = [
    { month: "Jan", amount: 2200 },
    { month: "Feb", amount: 2450 },
    { month: "Mar", amount: 2850 },
    { month: "Apr", amount: 2650 },
    { month: "May", amount: 2850 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-tutor-green/5 to-warm-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-tutor-green" />
              <div>
                <h1 className="font-nunito font-bold text-xl text-gray-900">Teacher Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, د. أحمد محمد!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-tutor-green/10 to-green-50">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-tutor-green mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{teacherStats.totalStudents}</h3>
              <p className="text-sm text-gray-600">Total Students</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-tutor-yellow/10 to-yellow-50">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-tutor-yellow mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">${teacherStats.monthlyEarnings}</h3>
              <p className="text-sm text-gray-600">This Month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-100 to-purple-50">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{teacherStats.averageRating}</h3>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-100 to-blue-50">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{teacherStats.completedSessions}</h3>
              <p className="text-sm text-gray-600">Sessions Done</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-100 to-orange-50">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{teacherStats.upcomingSessions}</h3>
              <p className="text-sm text-gray-600">Upcoming</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-tutor-green" />
                    Upcoming Sessions
                  </div>
                  <Button size="sm" className="btn-secondary">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{session.student}</h4>
                        <p className="text-sm text-gray-600">{session.subject} • {session.type}</p>
                        <p className="text-sm text-gray-500">{session.time} • {session.duration}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          Reschedule
                        </Button>
                        <Button 
                          size="sm" 
                          className="btn-secondary"
                          onClick={() => navigate('/video-call')}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Start
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Student Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-tutor-green" />
                  Recent Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-tutor-green/20 text-tutor-green font-medium">
                            {student.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{student.name}</h4>
                          <p className="text-sm text-gray-600">{student.subject}</p>
                          <p className="text-sm text-gray-500">Last session: {student.lastSession}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-tutor-green">{student.progress}%</p>
                          <p className="text-xs text-gray-500">Progress</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Earnings Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-tutor-yellow" />
                  Monthly Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earningsData.map((data, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{data.month}</span>
                      <span className="text-lg font-bold text-tutor-green">${data.amount}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-tutor-green/10 rounded-lg text-center">
                  <p className="text-sm text-gray-600">This Month's Total</p>
                  <p className="text-2xl font-bold text-tutor-green">${teacherStats.monthlyEarnings}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Manage Schedule
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Student Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Payment History
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    Reviews & Ratings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Profile Complete</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      100%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Verification</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Verified
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Response Rate</span>
                    <Badge variant="secondary" className="bg-tutor-yellow/20 text-tutor-yellow">
                      98%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
