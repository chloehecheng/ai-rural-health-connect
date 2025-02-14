
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneOTPLogin } from "@/components/auth/PhoneOTPLogin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Login = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem("language", value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-primary">
      <div className="absolute top-4 right-4">
        <Select
          value={i18n.language}
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
            <SelectValue placeholder={t("accessibility.language")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">{t("languages.en")}</SelectItem>
            <SelectItem value="es">{t("languages.es")}</SelectItem>
            <SelectItem value="ru">{t("languages.ru")}</SelectItem>
            <SelectItem value="it">{t("languages.it")}</SelectItem>
            <SelectItem value="ko">{t("languages.ko")}</SelectItem>
            <SelectItem value="zh">{t("languages.zh")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {t("auth.welcome")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("auth.enterPhone")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PhoneOTPLogin />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
