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
    <header className="bg-gradient-primary border-b border-white/20 fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="text-white hover:text-white/80" />
          <h1 className="text-xl font-semibold text-white">{t("common.appName", "RuralCare AI")}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
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
          <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
            {t("common.signIn", "Sign In")}
          </Button>
        </div>
      </div>
    </header>
  );
};