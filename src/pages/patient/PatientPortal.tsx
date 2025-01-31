import React, { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { PatientSidebar } from "@/components/patient/PatientSidebar";
import { PatientContent } from "@/components/patient/PatientContent";

type MenuSection = "dashboard" | "appointments" | "medical-history" | "health-metrics" | "profile" | "settings";

const PatientPortal = () => {
  const [activeSection, setActiveSection] = useState<MenuSection>("dashboard");
  const [fontSize, setFontSize] = useState(16);
  const [voiceAssistant, setVoiceAssistant] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <PatientSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            fontSize={fontSize}
          />
        </Sidebar>

        <div className="flex-1">
          <Header />
          <PatientContent
            activeSection={activeSection}
            fontSize={fontSize}
            showTooltips={showTooltips}
            voiceAssistant={voiceAssistant}
            setFontSize={setFontSize}
            setVoiceAssistant={setVoiceAssistant}
            setShowTooltips={setShowTooltips}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PatientPortal;