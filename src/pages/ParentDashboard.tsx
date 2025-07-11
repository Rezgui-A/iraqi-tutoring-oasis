
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, TrendingUp, Clock, CheckCircle, AlertCircle, User, LogOut, BarChart3 } from "lucide-react";

const ParentDashboard = () => {
  const navigate = useNavigate();

  const children = [
    {
      name: "أحمد محمد",
      grade: "Grade 10",
      totalSessions: 24,
      completedSessions: 20,
      averageGrade: 85,
      subjects: ["Math", "Physics", "Chemistry"]
    },
    {
      name: "فاطمة محمد",
      grade: "Grade 8", 
      totalSessions: 16,
      completedSessions: 14,
      averageGrade: 92,
      subjects: ["English", "Arabic", "History"]
    }
  ];

  const pendingApprovals = [
    {
      child: "أحمد محمد",
      teacher: "د. سارة أحمد",
      subject: "Mathematics",
      date: "Today, 4:00 PM",
      duration: "1 hour",
      cost: "$25"
    },
    {
      child: "فاطمة محمد", 
      teacher: "أستاذة ليلى علي",
      subject: "English",
      date: "Tomorrow, 3:00 PM",
      duration: "45 mins",
      cost: "$20"
    }
  ];

  const recentReports = [
    {
      child: "أحمد محمد",
      subject: "Physics",
      teacher: "د. يوسف حسن", 
      date: "Yesterday",
      grade: "A-",
      feedback: "Excellent progress in mechanics. Needs more practice with thermodynamics."
    },
    {
      child: "فاطمة محمد",
      subject: "English",
      teacher: "أستاذة ليلى علي",
      date: "2 days ago", 
      grade: "A+",
      feedback: "Outstanding performance in writing. Great improvement in grammar."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-tutor-yellow/5 to-warm-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Heart className="h-8 w-8 text-tutor-yellow" />
              <div>
                <h1 className="font-nunito font-bold text-xl text-gray-900">Parent Dashboard</h1>
                <p className="text-sm text-gray-600">Monitor your children's progress</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/parent-settings')}
              >
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Children Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              {children.map((child, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div>
                        <h3 className="font-nunito font-semibold">{child.name}</h3>
                        <p className="text-sm text-gray-600 font-normal">{child.grade}</p>
                      </div>
                      <Badge variant="secondary" className="bg-tutor-yellow/20 text-tutor-yellow">
                        {child.averageGrade}% Avg
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Session Progress</span>
                          <span>{child.completedSessions}/{child.totalSessions}</span>
                        </div>
                        <Progress 
                          value={(child.completedSessions / child.totalSessions) * 100} 
                          className="h-2"
                        />
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Subjects:</p>
                        <div className="flex flex-wrap gap-2">
                          {child.subjects.map((subject, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Detailed Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pending Approvals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                  Pending Session Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((approval, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{approval.child}</h4>
                        <p className="text-sm text-gray-600">{approval.subject} with {approval.teacher}</p>
                        <p className="text-sm text-gray-500">{approval.date} • {approval.duration}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-tutor-green">{approval.cost}</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Decline
                          </Button>
                          <Button size="sm" className="btn-primary">
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-tutor-green" />
                  Recent Progress Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{report.child}</h4>
                          <p className="text-sm text-gray-600">{report.subject} • {report.teacher}</p>
                          <p className="text-xs text-gray-500">{report.date}</p>
                        </div>
                        <Badge 
                          variant="secondary"
                          className={`${
                            report.grade.startsWith('A') 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {report.grade}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded italic">
                        "{report.feedback}"
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Family Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Active Children</span>
                    <span className="text-2xl font-bold text-tutor-yellow">{children.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Total Sessions</span>
                    <span className="text-2xl font-bold text-tutor-green">
                      {children.reduce((sum, child) => sum + child.totalSessions, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Avg Performance</span>
                    <span className="text-2xl font-bold text-tutor-blue">
                      {Math.round(children.reduce((sum, child) => sum + child.averageGrade, 0) / children.length)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* This Week's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  This Week's Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-tutor-yellow/10 rounded-lg">
                    <div className="w-3 h-3 bg-tutor-yellow rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">أحمد - Math</p>
                      <p className="text-xs text-gray-600">Today, 4:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-tutor-green/10 rounded-lg">
                    <div className="w-3 h-3 bg-tutor-green rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">فاطمة - English</p>
                      <p className="text-xs text-gray-600">Tomorrow, 3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">أحمد - Physics</p>
                      <p className="text-xs text-gray-600">Friday, 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Message Teachers
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Full Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule New Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
