import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Eye, EyeOff, UserPlus, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Create schema with dynamic validation messages
const createSignupSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z.string().min(2, t("signup.validation.nameRequired")),
      email: z.string().email(t("signup.validation.emailRequired")),
      phone: z.string().min(10, t("signup.validation.phoneRequired")),
      password: z.string().min(6, t("signup.validation.passwordRequired")),
      confirmPassword: z.string().min(6, t("signup.validation.confirmPasswordRequired")),
      role: z.enum(["student", "teacher", "parent"], {
        required_error: t("signup.validation.roleRequired"),
      }),
      language: z.string().min(1, t("signup.validation.languageRequired")),
      grade_level: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("signup.validation.passwordMismatch"),
      path: ["confirmPassword"],
    })
    .refine(
      (data) => {
        if (data.role === "student" && !data.grade_level) {
          return false;
        }
        return true;
      },
      {
        message: t("signup.validation.gradeLevelRequired"),
        path: ["grade_level"],
      }
    );

type SignupFormData = z.infer<ReturnType<typeof createSignupSchema>>;

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isConfirmingOtp, setIsConfirmingOtp] = useState(false);
  const { register, confirmOtp } = useAuth();
  const { isRTL, t } = useLanguage();

  const signupSchema = createSignupSchema(t);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: undefined,
      language: "en",
      grade_level: "",
    },
  });

  const role = form.watch("role");

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const { userId: newUserId, otpCode: receivedOtp } = await register({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
        language: data.language,
        grade_level: data.grade_level,
      });

      setUserId(newUserId);
      setUserRole(data.role);
      setShowOtpForm(true);
      toast.success(t("signup.registrationSuccess"));
      // For development, show the OTP code
      toast.info(t("signup.otpCodeInfo", { code: receivedOtp }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("signup.registrationFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !otpCode) return;

    setIsConfirmingOtp(true);
    try {
      await confirmOtp(userId, otpCode);
      toast.success(t("otp.verificationSuccess"));

      // Redirect based on user role
      if (userRole === "teacher") {
        window.location.href = "/teacher-verification";
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("otp.verificationFailed"));
    } finally {
      setIsConfirmingOtp(false);
    }
  };

  if (showOtpForm) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">{t("otp.title")}</CardTitle>
            <CardDescription className="text-gray-600">{t("otp.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOtpConfirmation} className="space-y-4">
              <div>
                <Label htmlFor="otp" className={isRTL ? "text-right" : "text-left"}>
                  {t("otp.otpCode")}
                </Label>
                <Input id="otp" type="text" placeholder={t("otp.otpPlaceholder")} value={otpCode} onChange={(e) => setOtpCode(e.target.value)} disabled={isConfirmingOtp} className="text-center text-lg tracking-wider" maxLength={6} dir="ltr" />
              </div>

              <Button type="submit" className="w-full" disabled={isConfirmingOtp || otpCode.length !== 6}>
                {isConfirmingOtp ? (
                  <>
                    <div className={`animate-spin rounded-full h-4 w-4 border-b-2 border-white ${isRTL ? "ml-2" : "mr-2"}`}></div>
                    {t("otp.verifying")}
                  </>
                ) : (
                  <>
                    <CheckCircle className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t("otp.verifyButton")}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">{t("signup.title")}</CardTitle>
          <CardDescription className="text-gray-600">{t("signup.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={isRTL ? "text-right" : "text-left"}>{t("signup.fullName")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("signup.fullNamePlaceholder")} {...field} disabled={isLoading} className={isRTL ? "text-right" : "text-left"} dir={isRTL ? "rtl" : "ltr"} />
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
                    <FormLabel className={isRTL ? "text-right" : "text-left"}>{t("signup.email")}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t("signup.emailPlaceholder")} {...field} disabled={isLoading} className={isRTL ? "text-right" : "text-left"} dir={isRTL ? "rtl" : "ltr"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={isRTL ? "text-right" : "text-left"}>{t("signup.phone")}</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder={t("signup.phonePlaceholder")} {...field} disabled={isLoading} className={isRTL ? "text-right" : "text-left"} dir={isRTL ? "rtl" : "ltr"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={isRTL ? "text-right" : "text-left"}>{t("signup.role")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={isRTL ? "text-right" : "text-left"}>
                          <SelectValue placeholder={t("signup.rolePlaceholder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="student">{t("signup.roles.student")}</SelectItem>
                        <SelectItem value="teacher">{t("signup.roles.teacher")}</SelectItem>
                        <SelectItem value="parent">{t("signup.roles.parent")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {role === "student" && (
                <FormField
                  control={form.control}
                  name="grade_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={isRTL ? "text-right" : "text-left"}>{t("signup.gradeLevel")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={isRTL ? "text-right" : "text-left"}>
                            <SelectValue placeholder={t("signup.gradeLevelPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">{t("signup.grades.1")}</SelectItem>
                          <SelectItem value="2">{t("signup.grades.2")}</SelectItem>
                          <SelectItem value="3">{t("signup.grades.3")}</SelectItem>
                          <SelectItem value="4">{t("signup.grades.4")}</SelectItem>
                          <SelectItem value="5">{t("signup.grades.5")}</SelectItem>
                          <SelectItem value="6">{t("signup.grades.6")}</SelectItem>
                          <SelectItem value="7">{t("signup.grades.7")}</SelectItem>
                          <SelectItem value="8">{t("signup.grades.8")}</SelectItem>
                          <SelectItem value="9">{t("signup.grades.9")}</SelectItem>
                          <SelectItem value="10">{t("signup.grades.10")}</SelectItem>
                          <SelectItem value="11">{t("signup.grades.11")}</SelectItem>
                          <SelectItem value="12">{t("signup.grades.12")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={isRTL ? "text-right" : "text-left"}>{t("signup.preferredLanguage")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={isRTL ? "text-right" : "text-left"}>
                          <SelectValue placeholder={t("signup.languagePlaceholder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="en">{t("signup.languages.en")}</SelectItem>
                        <SelectItem value="ar">{t("signup.languages.ar")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={isRTL ? "text-right" : "text-left"}>{t("signup.password")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder={t("signup.passwordPlaceholder")} {...field} disabled={isLoading} className={`${isRTL ? "text-right pl-12 pr-4" : "text-left pr-12 pl-4"}`} dir={isRTL ? "rtl" : "ltr"} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700`}>
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={isRTL ? "text-right" : "text-left"}>{t("signup.confirmPassword")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showConfirmPassword ? "text" : "password"} placeholder={t("signup.confirmPasswordPlaceholder")} {...field} disabled={isLoading} className={`${isRTL ? "text-right pl-12 pr-4" : "text-left pr-12 pl-4"}`} dir={isRTL ? "rtl" : "ltr"} />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700`}>
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className={`animate-spin rounded-full h-4 w-4 border-b-2 border-white ${isRTL ? "ml-2" : "mr-2"}`}></div>
                    {t("signup.creatingAccount")}
                  </>
                ) : (
                  <>
                    <UserPlus className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t("signup.createAccountButton")}
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t("signup.haveAccount")}{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                {t("signup.signInLink")}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
