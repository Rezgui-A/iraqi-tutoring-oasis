
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Bell, Shield, Languages, Camera, Save, Trash2 } from "lucide-react";

const StudentSettings = () => {
  const navigate = useNavigate();
  const [isArabic, setIsArabic] = useState(true);
  const [notifications, setNotifications] = useState({
    sessionReminders: true,
    progressUpdates: true,
    teacherMessages: true,
    systemUpdates: false
  });

  const content = {
    ar: {
      title: "الإعدادات",
      profile: "الملف الشخصي",
      notifications: "الإشعارات",
      privacy: "الخصوصية والأمان",
      language: "اللغة",
      account: "إعدادات الحساب",
      back: "العودة للوحة التحكم",
      save: "حفظ التغييرات",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      grade: "الصف الدراسي",
      bio: "نبذة شخصية",
      sessionReminders: "تذكير الجلسات",
      progressUpdates: "تحديثات التقدم",
      teacherMessages: "رسائل المعلمين",
      systemUpdates: "تحديثات النظام",
      changePassword: "تغيير كلمة المرور",
      deleteAccount: "حذف الحساب",
      currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      profilePicture: "صورة الملف الشخصي"
    },
    en: {
      title: "Settings",
      profile: "Profile",
      notifications: "Notifications",
      privacy: "Privacy & Security",
      language: "Language",
      account: "Account Settings",
      back: "Back to Dashboard",
      save: "Save Changes",
      name: "Name",
      email: "Email",
      phone: "Phone",
      grade: "Grade Level",
      bio: "Bio",
      sessionReminders: "Session Reminders",
      progressUpdates: "Progress Updates",
      teacherMessages: "Teacher Messages",
      systemUpdates: "System Updates",
      changePassword: "Change Password",
      deleteAccount: "Delete Account",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      profilePicture: "Profile Picture"
    }
  };

  const t = isArabic ? content.ar : content.en;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-primary-blue/5 to-light-gray ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/student-dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>{t.back}</span>
              </Button>
            </div>
            <h1 className="text-xl font-bold text-dark-gray">{t.title}</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-dark-gray">
                  <User className="h-5 w-5 mr-2 text-primary-green" />
                  {t.profile}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                    <AvatarFallback className="bg-primary-green/20 text-primary-green text-xl">أح</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Button variant="outline" className="mb-2">
                      <Camera className="h-4 w-4 mr-2" />
                      {t.profilePicture}
                    </Button>
                    <p className="text-sm text-medium-gray">يُفضل صورة واضحة للوجه</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t.name}</Label>
                    <Input id="name" defaultValue="أحمد محمد" />
                  </div>
                  <div>
                    <Label htmlFor="email">{t.email}</Label>
                    <Input id="email" type="email" defaultValue="ahmed@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t.phone}</Label>
                    <Input id="phone" defaultValue="+964 750 123 4567" />
                  </div>
                  <div>
                    <Label htmlFor="grade">{t.grade}</Label>
                    <Select defaultValue="grade-10">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grade-9">الصف التاسع</SelectItem>
                        <SelectItem value="grade-10">الصف العاشر</SelectItem>
                        <SelectItem value="grade-11">الصف الحادي عشر</SelectItem>
                        <SelectItem value="grade-12">الصف الثاني عشر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">{t.bio}</Label>
                  <Input id="bio" placeholder="أخبرنا عن نفسك وأهدافك التعليمية..." />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-dark-gray">
                  <Bell className="h-5 w-5 mr-2 text-accent-yellow" />
                  {t.notifications}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'sessionReminders', label: t.sessionReminders },
                  { key: 'progressUpdates', label: t.progressUpdates },
                  { key: 'teacherMessages', label: t.teacherMessages },
                  { key: 'systemUpdates', label: t.systemUpdates }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <Label htmlFor={item.key}>{item.label}</Label>
                    <Switch
                      id={item.key}
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, [item.key]: checked }))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-dark-gray">
                  <Shield className="h-5 w-5 mr-2 text-primary-blue" />
                  {t.privacy}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="current-password">{t.currentPassword}</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="new-password">{t.newPassword}</Label>
                    <Input id="new-password" type="password" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirm-password">{t.confirmPassword}</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button variant="outline" className="w-full">
                  {t.changePassword}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Language Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-dark-gray">
                  <Languages className="h-5 w-5 mr-2 text-secondary-turquoise" />
                  {t.language}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label>العربية / English</Label>
                  <Switch
                    checked={isArabic}
                    onCheckedChange={setIsArabic}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-dark-gray">{t.account}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-primary-green hover:bg-primary-green/90">
                  <Save className="h-4 w-4 mr-2" />
                  {t.save}
                </Button>
                <Separator />
                <Button variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t.deleteAccount}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;
