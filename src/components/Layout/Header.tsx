import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Header = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem("language", value);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white sticky top-0 z-50">
      <div className="w-full py-4">
        <div className="mx-auto max-w-[1200px] flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="text-white hover:text-white/90" />
            <h1 className="text-xl font-semibold">{t("common.appName", "Rural Health Connect")}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select
              value={i18n.language}
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white hover:bg-white/20">
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
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};