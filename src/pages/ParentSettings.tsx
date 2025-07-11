
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
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, User, Bell, Shield, Languages, Camera, Save, Trash2, Users, CreditCard, Eye } from "lucide-react";

const ParentSettings = () => {
  const navigate = useNavigate();
  const [isArabic, setIsArabic] = useState(true);
  const [notifications, setNotifications] = useState({
    childProgress: true,
    sessionApprovals: true,
    teacherMessages: true,
    paymentUpdates: true,
    systemUpdates: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareProgressWithTeachers: true,
    receiveRecommendations: true,
    allowDirectContact: false
  });

  const content = {
    ar: {
      title: "الإعدادات",
      profile: "الملف الشخصي",
      children: "إعدادات الأطفال",
      notifications: "الإشعارات",
      privacy: "الخصوصية والأمان",
      language: "اللغة",
      account: "إعدادات الحساب",
      back: "العودة للوحة التحكم",
      save: "حفظ التغييرات",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      relationship: "علاقة القرابة",
      childProgress: "تقدم الأطفال",
      sessionApprovals: "موافقات الجلسات",
      teacherMessages: "رسائل المعلمين",
      paymentUpdates: "تحديثات الدفع",
      systemUpdates: "تحديثات النظام",
      changePassword: "تغيير كلمة المرور",
      deleteAccount: "حذف الحساب",
      currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      profilePicture: "صورة الملف الشخصي",
      shareProgress: "مشاركة التقدم مع المعلمين",
      receiveRecommendations: "تلقي التوصيات",
      allowDirectContact: "السماح بالتواصل المباشر",
      paymentMethods: "طرق الدفع",
      monitoringSettings: "إعدادات المراقبة"
    },
    en: {
      title: "Settings",
      profile: "Profile",
      children: "Children Settings",
      notifications: "Notifications",
      privacy: "Privacy & Security",
      language: "Language",
      account: "Account Settings",
      back: "Back to Dashboard",
      save: "Save Changes",
      name: "Name",
      email: "Email",
      phone: "Phone",
      relationship: "Relationship",
      childProgress: "Child Progress",
      sessionApprovals: "Session Approvals",
      teacherMessages: "Teacher Messages",
      paymentUpdates: "Payment Updates",
      systemUpdates: "System Updates",
      changePassword: "Change Password",
      deleteAccount: "Delete Account",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      profilePicture: "Profile Picture",
      shareProgress: "Share Progress with Teachers",
      receiveRecommendations: "Receive Recommendations",
      allowDirectContact: "Allow Direct Contact",
      paymentMethods: "Payment Methods",
      monitoringSettings: "Monitoring Settings"
    }
  };

  const t = isArabic ? content.ar : content.en;

  const children = [
    { name: "أحمد محمد", grade: "الصف العاشر", avatar: "أح" },
    { name: "فاطمة محمد", grade: "الصف الثامن", avatar: "ف" }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-accent-yellow/5 to-light-gray ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/parent-dashboard')}
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
                    <AvatarFallback className="bg-accent-yellow/20 text-accent-yellow text-xl">أب</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Button variant="outline" className="mb-2">
                      <Camera className="h-4 w-4 mr-2" />
                      {t.profilePicture}
                    </Button>
                    <p className="text-sm text-medium-gray">صورة شخصية واضحة</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t.name}</Label>
                    <Input id="name" defaultValue="محمد أحمد" />
                  </div>
                  <div>
                    <Label htmlFor="email">{t.email}</Label>
                    <Input id="email" type="email" defaultValue="mohammed@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t.phone}</Label>
                    <Input id="phone" defaultValue="+964 750 123 4567" />
                  </div>
                  <div>
                    <Label htmlFor="relationship">{t.relationship}</Label>
                    <Input id="relationship" defaultValue="والد" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Children Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-dark-gray">
                  <Users className="h-5 w-5 mr-2 text-secondary-turquoise" />
                  {t.children}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {children.map((child, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-light-gray rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary-green/20 text-primary-green">
                          {child.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-dark-gray">{child.name}</h4>
                        <p className="text-sm text-medium-gray">{child.grade}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      تعديل الإعدادات
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Monitoring Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-dark-gray">
                  <Eye className="h-5 w-5 mr-2 text-primary-blue" />
                  {t.monitoringSettings}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'shareProgressWithTeachers', label: t.shareProgress },
                  { key: 'receiveRecommendations', label: t.receiveRecommendations },
                  { key: 'allowDirectContact', label: t.allowDirectContact }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <Label htmlFor={item.key}>{item.label}</Label>
                    <Switch
                      id={item.key}
                      checked={privacySettings[item.key as keyof typeof privacySettings]}
                      onCheckedChange={(checked) => 
                        setPrivacySettings(prev => ({ ...prev, [item.key]: checked }))
                      }
                    />
                  </div>
                ))}
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
                  { key: 'childProgress', label: t.childProgress },
                  { key: 'sessionApprovals', label: t.sessionApprovals },
                  { key: 'teacherMessages', label: t.teacherMessages },
                  { key: 'paymentUpdates', label: t.paymentUpdates },
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

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-dark-gray">
                  <CreditCard className="h-5 w-5 mr-2 text-primary-green" />
                  {t.paymentMethods}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-5 bg-accent-orange rounded"></div>
                    <span className="text-sm">ZainCash</span>
                  </div>
                  <Badge variant="secondary">الافتراضي</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  إضافة طريقة دفع
                </Button>
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

export default ParentSettings;
