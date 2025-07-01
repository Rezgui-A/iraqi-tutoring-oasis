
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Upload, Video, BookOpen, GraduationCap, User, LogOut } from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const upcomingSessions = [
    {
      subject: "Mathematics",
      teacher: "د. أحمد محمد",
      time: "Today, 3:00 PM",
      duration: "1 hour",
      status: "confirmed"
    },
    {
      subject: "Physics", 
      teacher: "أستاذة سارة علي",
      time: "Tomorrow, 10:00 AM",
      duration: "45 mins",
      status: "pending"
    },
    {
      subject: "English",
      teacher: "مدرس يوسف حسن",
      time: "Friday, 2:00 PM", 
      duration: "1 hour",
      status: "confirmed"
    }
  ];

  const recentSessions = [
    {
      subject: "Chemistry",
      teacher: "د. فاطمة أحمد",
      date: "Yesterday",
      rating: 5,
      hasRecording: true
    },
    {
      subject: "Arabic",
      teacher: "أستاذ محمد علي",
      date: "2 days ago",
      rating: 4,
      hasRecording: false
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tutor-yellow/5 to-warm-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <GraduationCap className="h-8 w-8 text-tutor-green" />
              <div>
                <h1 className="font-nunito font-bold text-xl text-gray-900">Student Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, أحمد!</p>
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="card-hover cursor-pointer bg-gradient-to-br from-tutor-yellow/10 to-yellow-50">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-tutor-yellow mx-auto mb-4" />
                  <h3 className="font-nunito font-semibold text-lg mb-2">Book Session</h3>
                  <p className="text-gray-600 text-sm">Schedule a new tutoring session</p>
                </CardContent>
              </Card>

              <Card className="card-hover cursor-pointer bg-gradient-to-br from-tutor-green/10 to-green-50">
                <CardContent className="p-6 text-center">
                  <Video className="h-12 w-12 text-tutor-green mx-auto mb-4" />
                  <h3 className="font-nunito font-semibold text-lg mb-2">Join Session</h3>
                  <p className="text-gray-600 text-sm">Enter ongoing tutoring session</p>
                </CardContent>
              </Card>

              <Card className="card-hover cursor-pointer bg-gradient-to-br from-tutor-blue/10 to-blue-50">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-tutor-blue mx-auto mb-4" />
                  <h3 className="font-nunito font-semibold text-lg mb-2">My Library</h3>
                  <p className="text-gray-600 text-sm">Access study materials</p>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-tutor-green" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{session.subject}</h4>
                        <p className="text-sm text-gray-600">{session.teacher}</p>
                        <p className="text-sm text-gray-500">{session.time} • {session.duration}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          session.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {session.status}
                        </span>
                        <Button 
                          size="sm" 
                          className="btn-secondary"
                          onClick={() => navigate('/video-call')}
                        >
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{session.subject}</h4>
                        <p className="text-sm text-gray-600">{session.teacher}</p>
                        <p className="text-sm text-gray-500">{session.date}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex text-tutor-yellow">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < session.rating ? 'text-tutor-yellow' : 'text-gray-300'}>
                              ★
                            </span>
                          ))}
                        </div>
                        {session.hasRecording && (
                          <Button variant="outline" size="sm">
                            Watch Recording
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-tutor-yellow" />
                  Upload Homework
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">
                    Drag and drop your files here, or click to browse
                  </p>
                  <Input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose Files
                  </Button>
                  {selectedFile && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle>This Week's Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Sessions Completed</span>
                    <span className="text-lg font-bold text-tutor-green">4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Hours Studied</span>
                    <span className="text-lg font-bold text-tutor-yellow">3.5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Assignments Submitted</span>
                    <span className="text-lg font-bold text-tutor-blue">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-tutor-yellow/10 rounded-lg">
                    <div className="w-3 h-3 bg-tutor-yellow rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Math Session</p>
                      <p className="text-xs text-gray-600">3:00 PM - 4:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Study Time</p>
                      <p className="text-xs text-gray-600">5:00 PM - 6:00 PM</p>
                    </div>
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

export default StudentDashboard;
