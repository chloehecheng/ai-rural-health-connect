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
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Text Size</Label>
        <Slider
          value={[fontSize]}
          onValueChange={(value) => setFontSize(value[0])}
          min={14}
          max={24}
          step={2}
        />
        <p className="text-sm text-muted-foreground">
          Current size: {fontSize}px
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="voice-assistant"
          checked={voiceAssistant}
          onCheckedChange={setVoiceAssistant}
        />
        <Label htmlFor="voice-assistant">Voice Assistant Guidance</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="show-tooltips"
          checked={showTooltips}
          onCheckedChange={setShowTooltips}
        />
        <Label htmlFor="show-tooltips">Show Helpful Tips</Label>
      </div>
    </div>
  );
};