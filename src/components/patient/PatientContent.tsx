import React from "react";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { AccessibilitySettings } from "./AccessibilitySettings";
import { HealthMetricsOverview } from "./HealthMetricsOverview";
import { TelehealthOptions } from "./TelehealthOptions";
import { MedicalHistory } from "./MedicalHistory";
import { MenuSection } from "@/pages/patient/PatientPortal";

interface PatientContentProps {
  activeSection: MenuSection;
  fontSize: number;
  showTooltips: boolean;
  voiceAssistant: boolean;
  setFontSize: (size: number) => void;
  setVoiceAssistant: (enabled: boolean) => void;
  setShowTooltips: (show: boolean) => void;
}

export const PatientContent = ({
  activeSection,
  fontSize,
  showTooltips,
  voiceAssistant,
  setFontSize,
  setVoiceAssistant,
  setShowTooltips,
}: PatientContentProps) => {
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <DashboardCard title="Welcome to Your Dashboard">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Quick Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <HealthMetricsOverview
                    fontSize={fontSize}
                    showTooltips={showTooltips}
                  />
                  <TelehealthOptions />
                </div>
              </div>
            </DashboardCard>
          </div>
        );
      case "settings":
        return (
          <DashboardCard title="Accessibility Settings">
            <AccessibilitySettings
              fontSize={fontSize}
              setFontSize={setFontSize}
              voiceAssistant={voiceAssistant}
              setVoiceAssistant={setVoiceAssistant}
              showTooltips={showTooltips}
              setShowTooltips={setShowTooltips}
            />
          </DashboardCard>
        );
      case "records":
        return <MedicalHistory />;
      case "patients":
        return (
          <DashboardCard title="Patient Management">
            <div className="space-y-4">
              <p>Patient management content will be displayed here.</p>
            </div>
          </DashboardCard>
        );
      case "alerts":
        return (
          <DashboardCard title="Alerts">
            <div className="space-y-4">
              <p>Alerts and notifications will be displayed here.</p>
            </div>
          </DashboardCard>
        );
      default:
        return <div>Section under development</div>;
    }
  };

  return (
    <main 
      className="container mx-auto px-4 pt-20 pb-8"
      style={{ fontSize: `${fontSize}px` }}
    >
      {renderContent()}
    </main>
  );
};