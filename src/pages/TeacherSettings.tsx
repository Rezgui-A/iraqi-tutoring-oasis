
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
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, User, Bell, Shield, Languages, Camera, Save, Trash2, DollarSign, Clock, BookOpen } from "lucide-react";

const TeacherSettings = () => {
  const navigate = useNavigate();
  const [isArabic, setIsArabic] = useState(true);
  const [notifications, setNotifications] = useState({
    bookingRequests: true,
    studentMessages: true,
    paymentUpdates: true,
    systemUpdates: false
  });

  const content = {
    ar: {
      title: "الإعدادات",
      profile: "الملف الشخصي",
      teaching: "إعدادات التدريس",
      notifications: "الإشعارات",
      privacy: "الخصوصية والأمان",
      language: "اللغة",
      account: "إعدادات الحساب",
      back: "العودة للوحة التحكم",
      save: "حفظ التغييرات",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      bio: "نبذة شخصية",
      subjects: "المواد التي أدرسها",
      experience: "سنوات الخبرة",
      hourlyRate: "السعر بالساعة",
      availability: "أوقات التوفر",
      bookingRequests: "طلبات الحجز",
      studentMessages: "رسائل الطلاب",
      paymentUpdates: "تحديثات الدفع",
      systemUpdates: "تحديثات النظام",
      changePassword: "تغيير كلمة المرور",
      deleteAccount: "حذف الحساب",
      currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      profilePicture: "صورة الملف الشخصي",
      qualifications: "المؤهلات",
      teachingStyle: "أسلوب التدريس"
    },
    en: {
      title: "Settings",
      profile: "Profile",
      teaching: "Teaching Settings",
      notifications: "Notifications",
      privacy: "Privacy & Security",
      language: "Language",
      account: "Account Settings",
      back: "Back to Dashboard",
      save: "Save Changes",
      name: "Name",
      email: "Email",
      phone: "Phone",
      bio: "Bio",
      subjects: "Subjects I Teach",
      experience: "Years of Experience",
      hourlyRate: "Hourly Rate",
      availability: "Availability",
      bookingRequests: "Booking Requests",
      studentMessages: "Student Messages",
      paymentUpdates: "Payment Updates",
      systemUpdates: "System Updates",
      changePassword: "Change Password",
      deleteAccount: "Delete Account",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      profilePicture: "Profile Picture",
      qualifications: "Qualifications",
      teachingStyle: "Teaching Style"
    }
  };

  const t = isArabic ? content.ar : content.en;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-primary-green/5 to-light-gray ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/teacher-dashboard')}
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
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                    <AvatarFallback className="bg-primary-green/20 text-primary-green text-xl">أم</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Button variant="outline" className="mb-2">
                      <Camera className="h-4 w-4 mr-2" />
                      {t.profilePicture}
                    </Button>
                    <p className="text-sm text-medium-gray">صورة مهنية تُظهر الثقة والكفاءة</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t.name}</Label>
                    <Input id="name" defaultValue="د. أحمد محمد" />
                  </div>
                  <div>
                    <Label htmlFor="email">{t.email}</Label>
                    <Input id="email" type="email" defaultValue="dr.ahmed@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t.phone}</Label>
                    <Input id="phone" defaultValue="+964 750 123 4567" />
                  </div>
                  <div>
                    <Label htmlFor="experience">{t.experience}</Label>
                    <Input id="experience" defaultValue="8" type="number" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">{t.bio}</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="اكتب نبذة مهنية عن خبرتك وتخصصك..."
                    defaultValue="دكتور في الرياضيات مع 8 سنوات خبرة في التدريس الأكاديمي والخصوصي"
                  />
                </div>

                <div>
                  <Label htmlFor="qualifications">{t.qualifications}</Label>
                  <Textarea 
                    id="qualifications" 
                    placeholder="المؤهلات والشهادات الأكاديمية..."
                    defaultValue="دكتوراه في الرياضيات - جامعة بغداد، ماجستير في الرياضيات التطبيقية"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Teaching Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-dark-gray">
                  <BookOpen className="h-5 w-5 mr-2 text-secondary-turquoise" />
                  {t.teaching}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subjects">{t.subjects}</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">رياضيات</Badge>
                      <Badge variant="secondary">فيزياء</Badge>
                      <Badge variant="outline">+ إضافة مادة</Badge>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="hourly-rate">{t.hourlyRate}</Label>
                    <div className="flex">
                      <Input id="hourly-rate" defaultValue="25000" />
                      <span className="flex items-center px-3 bg-light-gray border border-l-0 rounded-r-md text-medium-gray">د.ع</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="teaching-style">{t.teachingStyle}</Label>
                  <Textarea 
                    id="teaching-style" 
                    placeholder="اشرح أسلوبك في التدريس وما يميزك..."
                    defaultValue="أركز على الفهم العملي والتطبيق، مع استخدام أمثلة من الواقع لتبسيط المفاهيم المعقدة"
                  />
                </div>

                <div>
                  <Label>{t.availability}</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Badge variant="outline">السبت: 9:00 - 17:00</Badge>
                    <Badge variant="outline">الأحد: 9:00 - 17:00</Badge>
                    <Badge variant="outline">الاثنين: 9:00 - 17:00</Badge>
                    <Badge variant="outline">الثلاثاء: 9:00 - 17:00</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Clock className="h-4 w-4 mr-2" />
                    تعديل الأوقات
                  </Button>
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
                  { key: 'bookingRequests', label: t.bookingRequests },
                  { key: 'studentMessages', label: t.studentMessages },
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

            {/* Earnings Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-dark-gray">
                  <DollarSign className="h-5 w-5 mr-2 text-primary-green" />
                  ملخص الأرباح
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-medium-gray">هذا الشهر:</span>
                  <span className="font-bold text-primary-green">2,450,000 د.ع</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-medium-gray">المعدل بالساعة:</span>
                  <span className="font-medium">25,000 د.ع</span>
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

export default TeacherSettings;
