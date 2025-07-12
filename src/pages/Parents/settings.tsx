/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, User, Bell, Shield, Languages, 
  Camera, Save, Trash2, Users, CreditCard, 
  Eye, Plus, Lock, Mail, Phone, BookOpen,
  ChevronRight, AlertCircle, CheckCircle2,
  Settings
} from "lucide-react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ParentSettings = () => {
  const navigate = useNavigate();
  const { language, setLanguage, isRTL } = useLanguage();
  const [isArabic, setIsArabic] = useState(language === "ar");
  const [students, setStudents] = useState([]);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { isAuthenticated, user, isLoading } = useAuth();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

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

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [previewUrl, setPreviewUrl] = useState(
    user?.pic_url 
      ? `${API_BASE_URL}${user.pic_url.startsWith('/') ? '' : '/'}${user.pic_url}?t=${Date.now()}`
      : ''
  );

  const content = {
    ar: {
      title: "الإعدادات",
      profile: "الملف الشخصي",
      children: "إدارة الأبناء",
      notifications: "الإشعارات",
      privacy: "الخصوصية",
      security: "الأمان",
      account: "الحساب",
      back: "العودة",
      save: "حفظ التغييرات",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      changePhoto: "تغيير الصورة",
      upload: "رفع",
      cancel: "إلغاء",
      fileRequirements: "JPEG, PNG, GIF (بحد أقصى 5MB)",
      childProgress: "تقدم الأبناء",
      sessionApprovals: "موافقات الجلسات",
      teacherMessages: "رسائل المعلمين",
      paymentUpdates: "تحديثات الدفع",
      systemUpdates: "تحديثات النظام",
      shareProgress: "مشاركة التقدم",
      receiveRecommendations: "تلقي التوصيات",
      allowContact: "السماح بالتواصل",
      currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      changePassword: "تغيير كلمة المرور",
      deleteAccount: "حذف الحساب",
      deleteWarning: "هذا الإجراء لا يمكن التراجع عنه",
      confirmDelete: "تأكيد الحذف",
      addStudent: "إضافة ابن/ابنة",
      studentName: "اسم الطالب",
      studentEmail: "بريد الطالب",
      studentPassword: "كلمة مرور الطالب",
      gradeLevel: "الصف الدراسي",
      noStudents: "لا يوجد أبناء مسجلين",
      viewFeedback: "عرض التقييمات",
      paymentMethods: "طرق الدفع",
      defaultMethod: "الافتراضي",
      addPayment: "إضافة طريقة دفع",
      languageSettings: "إعدادات اللغة",
      selectLanguage: "اختر اللغة",
      english: "الإنجليزية",
      arabic: "العربية"
    },
    en: {
      title: "Settings",
      profile: "Profile",
      children: "Children Management",
      notifications: "Notifications",
      privacy: "Privacy",
      security: "Security",
      account: "Account",
      back: "Back",
      save: "Save Changes",
      name: "Full Name",
      email: "Email",
      phone: "Phone Number",
      changePhoto: "Change Photo",
      upload: "Upload",
      cancel: "Cancel",
      fileRequirements: "JPEG, PNG, GIF (Max 5MB)",
      childProgress: "Child Progress",
      sessionApprovals: "Session Approvals",
      teacherMessages: "Teacher Messages",
      paymentUpdates: "Payment Updates",
      systemUpdates: "System Updates",
      shareProgress: "Share Progress",
      receiveRecommendations: "Receive Recommendations",
      allowContact: "Allow Contact",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      changePassword: "Change Password",
      deleteAccount: "Delete Account",
      deleteWarning: "This action cannot be undone",
      confirmDelete: "Confirm Delete",
      addStudent: "Add Student",
      studentName: "Student Name",
      studentEmail: "Student Email",
      studentPassword: "Student Password",
      gradeLevel: "Grade Level",
      noStudents: "No students registered",
      viewFeedback: "View Feedback",
      paymentMethods: "Payment Methods",
      defaultMethod: "Default",
      addPayment: "Add Payment Method",
      languageSettings: "Language Settings",
      selectLanguage: "Select Language",
      english: "English",
      arabic: "Arabic"
    }
  };

  const t = isArabic ? content.ar : content.en;

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      const fetchStudents = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/parent/children`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          setStudents(response.data);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to fetch student data",
            variant: "destructive",
          });
        }
      }
      fetchStudents();
    }
  }, [isAuthenticated, user?.id]);

  const studentFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    grade_level: z.string().min(1, "Grade level is required"),
  });

  const form = useForm({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      grade_level: "",
    },
  });

  const handleAddStudent = async (values) => {
    setIsAddingStudent(true);
    try {
      const userResponse = await axios.post(`${API_BASE_URL}/api/users/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'student',
        status: 'active',
        grade_level: values.grade_level
      });

      await axios.post(
        `${API_BASE_URL}/api/parent/link-child`,
        { student_id: userResponse.data.studentId },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const updatedResponse = await axios.get(
        `${API_BASE_URL}/api/parent/children`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      setStudents(updatedResponse.data);
      toast({
        title: "Success",
        description: "Student added and linked successfully",
      });
      form.reset();

    } catch (error) {
      console.error('Error adding student:', error);
      let errorMessage = "Failed to add student";
      
      if (error.response) {
        if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.status === 400) {
          errorMessage = "Validation error - please check your inputs";
        }
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAddingStudent(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/users/profile`, profileData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({ title: "Error", description: "Passwords don't match", variant: "destructive" });
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/api/users/change-password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      toast({ title: "Success", description: "Password changed successfully" });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Password change error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to change password",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image (JPEG, PNG, GIF, WEBP)",
          variant: "destructive",
        });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || isUploading) return;

    setIsUploading(true);
    setUploadProgress(0);
    
    const formData = new FormData();
    formData.append('profilePic', selectedFile);
    formData.append('name', profileData.name);
    formData.append('email', profileData.email);
    formData.append('phone', profileData.phone);

    try {
      const response = await axios.put(`${API_BASE_URL}/api/users/profile`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        }
      });

      if (!response.data.pic_url) {
        throw new Error('Server did not return image URL');
      }

      setPreviewUrl(`${API_BASE_URL}${response.data.pic_url}?t=${Date.now()}`);
      setSelectedFile(null);
      
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error) {
      console.error('Upload error:', error);
      
      let errorMessage = "Failed to upload profile picture";
      if (error.response) {
        errorMessage = error.response.data?.error || 
                      error.response.data?.message || 
                      error.response.statusText;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

return (
  <div className={`min-h-screen bg-gray-50 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
    {/* Header */}
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/parent')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{t.back}</span>
          </Button>
          <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
          <div className="w-32"></div>
        </div>
      </div>
    </header>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                {t.profile}
              </CardTitle>
              <CardDescription>
                {isArabic ? "إدارة معلومات ملفك الشخصي" : "Manage your profile information"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center relative border-2 border-blue-100">
                    {previewUrl ? (
                      <>
                        <img
                          src={previewUrl}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `${API_BASE_URL}/uploads/profile-pics/default-profile.png`;
                            e.currentTarget.onerror = null;
                          }}
                        />
                        {isUploading && (
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <div className="w-16 h-1 bg-white rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-400 transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="bg-blue-100 text-blue-600 text-xl font-bold h-full w-full flex items-center justify-center">
                        {user?.name?.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <input
                    type="file"
                    id="profile-upload"
                    accept="image/jpeg, image/png, image/gif, image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex space-x-2">
                    <label htmlFor="profile-upload" className="flex-1">
                      <Button variant="outline" className="w-full" asChild>
                        <div className="flex items-center cursor-pointer">
                          <Camera className="h-4 w-4 mr-2" />
                          {t.changePhoto}
                        </div>
                      </Button>
                    </label>
                    
                    <Button 
                      onClick={handleUpload}
                      disabled={!selectedFile || isUploading}
                      className="flex-1"
                    >
                      {isUploading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {isArabic ? "جاري الرفع" : "Uploading"}
                        </span>
                      ) : (
                        t.upload
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    {t.fileRequirements}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    {t.name}
                  </Label>
                  <Input 
                    id="name" 
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    {t.email}
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    {t.phone}
                  </Label>
                  <Input 
                    id="phone" 
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  />
                </div>
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleSaveProfile}
              >
                <Save className="h-4 w-4 mr-2" />
                {t.save}
              </Button>
            </CardContent>
          </Card>

          {/* Children Management Card */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  {t.children}
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      {t.addStudent}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t.addStudent}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleAddStudent)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.studentName}</FormLabel>
                              <FormControl>
                                <Input placeholder={t.studentName} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.studentEmail}</FormLabel>
                              <FormControl>
                                <Input placeholder={t.studentEmail} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.studentPassword}</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder={t.studentPassword} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="grade_level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.gradeLevel}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t.gradeLevel} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[...Array(12)].map((_, i) => (
                                    <SelectItem key={i+1} value={`${i+1}`}>
                                      {isArabic ? `الصف ${i+1}` : `Grade ${i+1}`}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" disabled={isAddingStudent}>
                          {isAddingStudent ? (isArabic ? "جاري الإضافة..." : "Adding...") : t.addStudent}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : students.length > 0 ? (
                students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                        {student.pic_url ? (
                          <img 
                            src={`${API_BASE_URL}${student.pic_url.startsWith('/') ? '' : '/'}${student.pic_url}?t=${Date.now()}`}
                            alt={student.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : null}
                        <span className="text-blue-600 font-medium absolute">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-500">
                          {isArabic ? `الصف ${student.grade_level}` : `Grade ${student.grade_level}`}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/parent/child/${student.id}/feedback`)}
                      className="flex items-center"
                    >
                      {t.viewFeedback}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Users className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">{t.noStudents}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          {/* Password Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-blue-600" />
                {t.changePassword}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current-password" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-gray-500" />
                  {t.currentPassword}
                </Label>
                <Input 
                  id="current-password" 
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="new-password" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-gray-500" />
                  {t.newPassword}
                </Label>
                <Input 
                  id="new-password" 
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="confirm-password" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-gray-500" />
                  {t.confirmPassword}
                </Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                />
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleChangePassword}
              >
                {t.changePassword}
              </Button>
            </CardContent>
          </Card>

          {/* Payment Methods Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                {t.paymentMethods}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-5 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    ZC
                  </div>
                  <div>
                    <p className="text-sm font-medium">ZainCash</p>
                    <p className="text-xs text-gray-500">•••• •••• •••• 4242</p>
                  </div>
                </div>
                <Badge variant="secondary">{t.defaultMethod}</Badge>
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                {t.addPayment}
              </Button>
            </CardContent>
          </Card>

          {/* Language Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Languages className="h-5 w-5 mr-2 text-blue-600" />
                {t.languageSettings}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label>{t.selectLanguage}</Label>
                <div className="flex space-x-2">
                  <Button 
                    variant={isArabic ? "default" : "outline"} 
                    onClick={() => {
                      setIsArabic(true);
                      setLanguage("ar");
                    }}
                  >
                    {t.arabic}
                  </Button>
                  <Button 
                    variant={!isArabic ? "default" : "outline"} 
                    onClick={() => {
                      setIsArabic(false);
                      setLanguage("en");
                    }}
                  >
                    {t.english}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          
        </div>
      </div>
    </div>
  </div>
);}

export default ParentSettings;