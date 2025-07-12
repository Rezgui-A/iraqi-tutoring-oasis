
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  DollarSign, 
  Star, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Settings,
  Plus,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Students',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      title: 'Classes This Week',
      value: '18',
      change: '+3',
      trend: 'up',
      icon: BookOpen,
      color: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      title: 'Monthly Earnings',
      value: '$2,450',
      change: '+8%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'bg-gradient-to-r from-yellow-500 to-yellow-600'
    }
  ];

  const quickActions = [
    { title: 'Schedule Class', icon: Calendar, color: 'bg-blue-100 text-blue-700' },
    { title: 'Create Assignment', icon: Plus, color: 'bg-green-100 text-green-700' },
    { title: 'Message Students', icon: MessageCircle, color: 'bg-purple-100 text-purple-700' },
    { title: 'View Analytics', icon: TrendingUp, color: 'bg-orange-100 text-orange-700' }
  ];

  const recentActivities = [
    { type: 'class', message: 'Math Class completed with John Doe', time: '2 hours ago', status: 'completed' },
    { type: 'message', message: 'New message from Sarah Smith', time: '4 hours ago', status: 'new' },
    { type: 'payment', message: 'Payment received: $150', time: '1 day ago', status: 'completed' },
    { type: 'schedule', message: 'Physics class scheduled for tomorrow', time: '2 days ago', status: 'scheduled' }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
              <p className="text-gray-600">Manage your classes and students</p>
            </div>
            <Button 
              onClick={() => navigate('/teacher-settings')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              View Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
                <p className="text-blue-100 mb-4">Ready to inspire and educate today?</p>
                <div className="flex items-center gap-4">
                  <Badge className="bg-white/20 text-white border-white/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified Teacher
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Star className="w-3 h-3 mr-1" />
                    Top Rated
                  </Badge>
                </div>
              </div>
              <div className="hidden md:block">
                <BookOpen className="h-16 w-16 text-white/30" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600 font-medium">{stat.change} from last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-4 hover:bg-gray-50"
                >
                  <div className={`p-2 rounded-lg mr-3 ${action.color}`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{action.title}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Your classes for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900">Mathematics</p>
                  <p className="text-sm text-blue-700">Grade 10 - John Doe</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-800">10:00 AM</p>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">Starting soon</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">Physics</p>
                  <p className="text-sm text-green-700">Grade 11 - Sarah Smith</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-800">2:00 PM</p>
                  <Badge className="bg-green-100 text-green-800 text-xs">Scheduled</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-purple-900">Chemistry</p>
                  <p className="text-sm text-purple-700">Grade 12 - Mike Johnson</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-purple-800">4:00 PM</p>
                  <Badge className="bg-purple-100 text-purple-800 text-xs">Scheduled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`p-1 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-100' :
                    activity.status === 'new' ? 'bg-blue-100' : 'bg-yellow-100'
                  }`}>
                    {activity.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : activity.status === 'new' ? (
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Monthly Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Monthly Goals Progress
            </CardTitle>
            <CardDescription>Track your teaching objectives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Classes Conducted</span>
                <span className="text-gray-600">18/25</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Student Satisfaction</span>
                <span className="text-gray-600">4.8/5.0</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Monthly Earnings</span>
                <span className="text-gray-600">$2,450/$3,000</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
