import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

// Create schema with dynamic validation messages
const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("login.validation.emailRequired")),
    password: z.string().min(6, t("login.validation.passwordRequired")),
  });

type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { isRTL, t } = useLanguage();

  const loginSchema = createLoginSchema(t);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success(t("login.loginSuccess"));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("login.loginFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">{t("login.title")}</CardTitle>
          <CardDescription className="text-gray-600">{t("login.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={isRTL ? "text-right" : "text-left"}>{t("login.email")}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t("login.emailPlaceholder")} {...field} disabled={isLoading} className={`w-full ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"} />
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
                    <FormLabel className={isRTL ? "text-right" : "text-left"}>{t("login.password")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder={t("login.passwordPlaceholder")} {...field} disabled={isLoading} className={`w-full ${isRTL ? "text-right pl-12 pr-4" : "text-left pr-12 pl-4"}`} dir={isRTL ? "rtl" : "ltr"} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700`}>
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                    {t("login.signingIn")}
                  </>
                ) : (
                  <>
                    <LogIn className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t("login.signInButton")}
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t("login.noAccount")}{" "}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                {t("login.signUpLink")}
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
              {t("login.forgotPassword")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
