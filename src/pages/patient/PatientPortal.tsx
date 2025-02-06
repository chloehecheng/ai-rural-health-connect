import React, { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { PatientPortalSidebar } from "@/components/patient/PatientPortalSidebar";
import { PatientContent } from "@/components/patient/PatientContent";

export type MenuSection = "dashboard" | "health-metrics" | "appointments" | "records" | "medications" | "messages" | "settings";

const PatientPortal = () => {
  const [activeSection, setActiveSection] = useState<MenuSection>("dashboard");
  const [fontSize, setFontSize] = useState(16);
  const [voiceAssistant, setVoiceAssistant] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <PatientPortalSidebar
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