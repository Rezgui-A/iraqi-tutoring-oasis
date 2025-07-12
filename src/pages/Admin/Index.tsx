import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X, FileText, User, Users, DollarSign, BookOpen, Star, Languages, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const AdminDashboard = () => {
  const { language, setLanguage, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState("teachers");
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [approvedTeachers, setApprovedTeachers] = useState([]);
  const [rejectedTeachers, setRejectedTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { logout } = useAuth();

  const content = {
    en: {
      title: "Admin Dashboard",
      tabs: {
        teachers: "Teachers",
        students: "Students",
        parents: "Parents",
        reports: "Reports",
      },
      pendingTeachers: {
        title: "Teacher Applications Pending Review",
        headers: ["Teacher", "Subjects", "Experience", "Documents", "Application Date", "Actions"],
      },
      approvedTeachers: {
        title: "Approved Teachers",
        headers: ["Teacher", "Subjects", "Earnings", "Sessions", "Rating", "Actions"],
      },
      rejectedTeachers: {
        title: "Rejected Teachers",
        headers: ["Teacher", "Subjects", "Application Date", "Rejection Date", "Actions"],
      },
      students: {
        title: "Students",
        headers: ["Student", "Grade", "Parent", "Joined Date", "Active Sessions"],
      },
      parents: {
        title: "Parents",
        headers: ["Parent", "Email", "Children", "Joined Date"],
      },
      actions: {
        approve: "Approve",
        reject: "Reject",
        viewDetails: "View Details",
        back: "Back to List",
        logout: "Logout",
        reactivate: "Reactivate",
      },
      teacherDetails: {
        title: "Teacher Details",
        earnings: "Total Earnings",
        sessions: "Total Sessions",
        subjects: "Subjects Taught",
        history: "Earnings History",
      },
    },
    ar: {
      title: "لوحة التحكم",
      tabs: {
        teachers: "المعلمون",
        students: "الطلاب",
        parents: "أولياء الأمور",
        reports: "التقارير",
      },
      pendingTeachers: {
        title: "طلبات المعلمين قيد المراجعة",
        headers: ["المعلم", "المواد", "الخبرة", "المستندات", "تاريخ التقديم", "الإجراءات"],
      },
      approvedTeachers: {
        title: "المعلمون المعتمدون",
        headers: ["المعلم", "المواد", "الأرباح", "الجلسات", "التقييم", "الإجراءات"],
      },
      rejectedTeachers: {
        title: "المعلمون المرفوضون",
        headers: ["المعلم", "المواد", "تاريخ التقديم", "تاريخ الرفض", "الإجراءات"],
      },
      students: {
        title: "الطلاب",
        headers: ["الطالب", "الصف", "ولي الأمر", "تاريخ الانضمام", "الجلسات النشطة"],
      },
      parents: {
        title: "أولياء الأمور",
        headers: ["ولي الأمر", "البريد الإلكتروني", "الأبناء", "تاريخ الانضمام"],
      },
      actions: {
        approve: "موافقة",
        reject: "رفض",
        viewDetails: "عرض التفاصيل",
        back: "العودة للقائمة",
        logout: "تسجيل الخروج",
        reactivate: "إعادة تفعيل",
      },
      teacherDetails: {
        title: "تفاصيل المعلم",
        earnings: "إجمالي الأرباح",
        sessions: "إجمالي الجلسات",
        subjects: "المواد المُدرَّسة",
        history: "سجل الأرباح",
      },
    },
  };

  const t = content[language];

  // API functions
  const fetchPendingTeachers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log("fetchPendingTeachers: Starting request with token:", token ? "present" : "missing");

      const response = await fetch("http://localhost:3001/api/admin/pending-teachers", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("fetchPendingTeachers: Response status:", response.status);
      console.log("fetchPendingTeachers: Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("fetchPendingTeachers: Error response:", errorText);
        throw new Error("Failed to fetch pending teachers");
      }

      const data = await response.json();
      console.log("fetchPendingTeachers: Received data:", data);
      setPendingTeachers(data);
    } catch (error) {
      toast.error("Failed to load pending teachers");
      console.error("Error fetching pending teachers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApprovedTeachers = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("fetchApprovedTeachers: Starting request with token:", token ? "present" : "missing");

      const response = await fetch("http://localhost:3001/api/admin/approved-teachers", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("fetchApprovedTeachers: Response status:", response.status);
      console.log("fetchApprovedTeachers: Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("fetchApprovedTeachers: Error response:", errorText);
        throw new Error("Failed to fetch approved teachers");
      }

      const data = await response.json();
      console.log("fetchApprovedTeachers: Received data:", data);
      setApprovedTeachers(data);
    } catch (error) {
      toast.error("Failed to load approved teachers");
      console.error("Error fetching approved teachers:", error);
    }
  };

  const fetchRejectedTeachers = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("fetchRejectedTeachers: Starting request with token:", token ? "present" : "missing");

      const response = await fetch("http://localhost:3001/api/admin/rejected-teachers", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("fetchRejectedTeachers: Response status:", response.status);
      console.log("fetchRejectedTeachers: Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("fetchRejectedTeachers: Error response:", errorText);
        throw new Error("Failed to fetch rejected teachers");
      }

      const data = await response.json();
      console.log("fetchRejectedTeachers: Received data:", data);
      setRejectedTeachers(data);
    } catch (error) {
      toast.error("Failed to load rejected teachers");
      console.error("Error fetching rejected teachers:", error);
    }
  };

  const handleTeacherStatus = async (teacherId, status, comments = "") => {
    setIsProcessing(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/admin/teacher-status", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacher_id: teacherId,
          status,
          comments,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${status} teacher`);
      }

      const data = await response.json();
      toast.success(data.message);

      // Refresh the pending teachers list
      fetchPendingTeachers();
      // Also refresh approved teachers list
      fetchApprovedTeachers();
      // Also refresh rejected teachers list
      fetchRejectedTeachers();
    } catch (error) {
      toast.error(`Failed to ${status} teacher`);
      console.error(`Error ${status} teacher:`, error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Load pending, approved, and rejected teachers on component mount
  useEffect(() => {
    fetchPendingTeachers();
    fetchApprovedTeachers();
    fetchRejectedTeachers();
  }, []);

  const students = [
    {
      id: 1,
      name: language === "en" ? "Youssef Ahmed" : "يوسف أحمد",
      grade: language === "en" ? "10th Grade" : "الصف العاشر",
      parent: language === "en" ? "Ali Ahmed" : "علي أحمد",
      joinedDate: "2023-03-10",
      activeSessions: 3,
    },
    // ... more students
  ];

  const parents = [
    {
      id: 1,
      name: language === "en" ? "Ali Ahmed" : "علي أحمد",
      email: "ali@example.com",
      children: language === "en" ? ["Youssef Ahmed", "Mariam Ahmed"] : ["يوسف أحمد", "مريم أحمد"],
      joinedDate: "2023-03-10",
    },
    // ... more parents
  ];

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleApproveTeacher = (teacherId) => {
    handleTeacherStatus(teacherId, "approved");
  };

  const handleRejectTeacher = (teacherId) => {
    handleTeacherStatus(teacherId, "rejected");
  };

  const handleReactivateTeacher = (teacherId) => {
    handleTeacherStatus(teacherId, "approved");
  };

  return (
    <div className={`min-h-screen bg-gray-50 p-6 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full md:w-[500px] mb-6 bg-gray-100">
            <TabsTrigger value="teachers" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {t.tabs.teachers}
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              {t.tabs.students}
            </TabsTrigger>
            <TabsTrigger value="parents" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              {t.tabs.parents}
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              {t.tabs.reports}
            </TabsTrigger>
          </TabsList>

          {/* Teachers Tab */}
          <TabsContent value="teachers">
            {selectedTeacher ? (
              <TeacherDetails teacher={selectedTeacher} onBack={() => setSelectedTeacher(null)} t={t.teacherDetails} language={language} />
            ) : (
              <div className="space-y-6">
                {/* Pending Approvals */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      {t.pendingTeachers.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {t.pendingTeachers.headers.map((header) => (
                            <TableHead key={header}>{header}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                              <div className="flex items-center justify-center">
                                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                                Loading pending teachers...
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : pendingTeachers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                              No pending teacher applications
                            </TableCell>
                          </TableRow>
                        ) : (
                          pendingTeachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center space-x-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                      {teacher.user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p>{teacher.user.name}</p>
                                    <p className="text-sm text-gray-600">{teacher.user.email}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {teacher.subjects && teacher.subjects.length > 0 ? (
                                    teacher.subjects.map((subject) => (
                                      <Badge key={subject} variant="outline">
                                        {subject}
                                      </Badge>
                                    ))
                                  ) : (
                                    <span className="text-gray-500 text-sm">No subjects specified</span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="text-gray-500 text-sm">To be reviewed</span>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  {teacher.certificates && teacher.certificates.length > 0 ? (
                                    teacher.certificates.map((cert, index) => (
                                      <div key={index} className="flex items-center text-blue-600 text-sm">
                                        <FileText className="h-3 w-3 mr-1" />
                                        Certificate {index + 1}
                                      </div>
                                    ))
                                  ) : (
                                    <span className="text-gray-500 text-sm">No documents uploaded</span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>{new Date(teacher.user.created_at).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproveTeacher(teacher.id)} disabled={isProcessing}>
                                    {isProcessing ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Check className="h-4 w-4 mr-1" />}
                                    {t.actions.approve}
                                  </Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleRejectTeacher(teacher.id)} disabled={isProcessing}>
                                    {isProcessing ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <X className="h-4 w-4 mr-1" />}
                                    {t.actions.reject}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Approved Teachers */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      {t.approvedTeachers.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {t.approvedTeachers.headers.map((header) => (
                            <TableHead key={header}>{header}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                              <div className="flex items-center justify-center">
                                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                                Loading approved teachers...
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : approvedTeachers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                              No approved teachers found
                            </TableCell>
                          </TableRow>
                        ) : (
                          approvedTeachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center space-x-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                      {teacher.user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p>{teacher.user.name}</p>
                                    <p className="text-sm text-gray-600">{teacher.user.email}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {teacher.subjects && teacher.subjects.length > 0 ? (
                                    teacher.subjects.map((subject, index) => (
                                      <Badge key={index} variant="outline">
                                        {subject}
                                      </Badge>
                                    ))
                                  ) : (
                                    <span className="text-gray-500">No subjects</span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>$0</TableCell>
                              <TableCell>0</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                  {teacher.rating || "N/A"}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline" onClick={() => setSelectedTeacher(teacher)}>
                                  {t.actions.viewDetails}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Rejected Teachers */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="bg-red-50">
                    <CardTitle className="flex items-center">
                      <X className="h-5 w-5 mr-2" />
                      {t.rejectedTeachers.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {t.rejectedTeachers.headers.map((header) => (
                            <TableHead key={header}>{header}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">
                              <div className="flex items-center justify-center">
                                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                                Loading rejected teachers...
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : rejectedTeachers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                              No rejected teachers found
                            </TableCell>
                          </TableRow>
                        ) : (
                          rejectedTeachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center space-x-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                      {teacher.user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p>{teacher.user.name}</p>
                                    <p className="text-sm text-gray-600">{teacher.user.email}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {teacher.subjects && teacher.subjects.length > 0 ? (
                                    teacher.subjects.map((subject, index) => (
                                      <Badge key={index} variant="outline">
                                        {subject}
                                      </Badge>
                                    ))
                                  ) : (
                                    <span className="text-gray-500">No subjects</span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>{new Date(teacher.user.created_at).toLocaleDateString()}</TableCell>
                              <TableCell>{new Date(teacher.updated_at || teacher.user.created_at).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline" className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200" onClick={() => handleReactivateTeacher(teacher.id)} disabled={isProcessing}>
                                  {isProcessing ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Check className="h-4 w-4 mr-1" />}
                                  {t.actions.reactivate}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Students</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Parent</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead>Active Sessions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p>{student.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>{student.parent}</TableCell>
                        <TableCell>{student.joinedDate}</TableCell>
                        <TableCell>
                          <Badge>{student.activeSessions}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Parents Tab */}
          <TabsContent value="parents">
            <Card>
              <CardHeader>
                <CardTitle>Parents</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parent</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Children</TableHead>
                      <TableHead>Joined Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parents.map((parent) => (
                      <TableRow key={parent.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {parent.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p>{parent.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{parent.email}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {parent.children.map((child) => (
                              <Badge key={child} variant="outline">
                                {child}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{parent.joinedDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const TeacherDetails = ({ teacher, onBack, t, language }) => {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="bg-blue-50">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            {t.title}
          </CardTitle>
          <Button variant="outline" onClick={onBack}>
            {t.back}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">
                  {teacher.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{teacher.name}</h2>
              <p className="text-gray-600">{teacher.email}</p>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-medium">{teacher.rating}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-500">{t.earnings}</h3>
                <p className="text-2xl font-bold">${teacher.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-500">{t.sessions}</h3>
                <p className="text-2xl font-bold">{teacher.totalSessions}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">{t.subjects}</h3>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((subject) => (
                  <Badge key={subject} className="text-sm">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">{t.history}</h3>
              <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center text-gray-400">{language === "en" ? "Earnings Chart" : "رسم بياني للأرباح"}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
