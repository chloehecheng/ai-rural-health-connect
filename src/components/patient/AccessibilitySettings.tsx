import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface AccessibilitySettingsProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  voiceAssistant: boolean;
  setVoiceAssistant: (enabled: boolean) => void;
  showTooltips: boolean;
  setShowTooltips: (show: boolean) => void;
}

export const AccessibilitySettings = ({
  fontSize,
  setFontSize,
  voiceAssistant,
  setVoiceAssistant,
  showTooltips,
  setShowTooltips,
}: AccessibilitySettingsProps) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>{t("accessibility.fontSize")}</Label>
        <Slider
          value={[fontSize]}
          onValueChange={(value) => setFontSize(value[0])}
          min={14}
          max={24}
          step={2}
        />
        <p className="text-sm text-muted-foreground">
          {t("accessibility.fontSize")}: {fontSize}px
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="voice-assistant"
          checked={voiceAssistant}
          onCheckedChange={setVoiceAssistant}
        />
        <Label htmlFor="voice-assistant">{t("accessibility.voiceAssistant")}</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="show-tooltips"
          checked={showTooltips}
          onCheckedChange={setShowTooltips}
        />
        <Label htmlFor="show-tooltips">{t("accessibility.showTooltips")}</Label>
      </div>

      <div className="space-y-2">
        <Label>{t("accessibility.language")}</Label>
        <Select
          value={i18n.language}
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger className="w-full">
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
    </div>
  );
};