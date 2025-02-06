
import React from "react";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { AccessibilitySettings } from "./AccessibilitySettings";
import { TelehealthOptions } from "./TelehealthOptions";
import { MenuSection } from "@/pages/patient/PatientPortal";
import { AppointmentScheduler } from "./AppointmentScheduler";
import { HealthMetricsOverview } from "./HealthMetricsOverview";
import { HealthMetricsInput } from "./HealthMetricsInput";
import { MedicationList } from "./MedicationList";
import { DeliveryStatus } from "./DeliveryStatus";
import { MessagesView } from "./MessagesView";
import { MedicalHistory } from "./MedicalHistory";

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DashboardCard title="Schedule Appointment">
                    <AppointmentScheduler />
                  </DashboardCard>
                  <div className="space-y-4">
                    <TelehealthOptions />
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
        );
      case "health-metrics":
        return (
          <div className="space-y-6">
            <HealthMetricsOverview 
              fontSize={fontSize}
              showTooltips={showTooltips}
            />
            <DashboardCard title="Record New Metric">
              <HealthMetricsInput />
            </DashboardCard>
          </div>
        );
      case "appointments":
        return (
          <DashboardCard title="Appointments">
            <AppointmentScheduler />
          </DashboardCard>
        );
      case "records":
        return <MedicalHistory />;
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
      case "medications":
        return (
          <div className="space-y-6">
            <DashboardCard title="Your Medications">
              <MedicationList />
            </DashboardCard>
            <DashboardCard title="Delivery Status">
              <DeliveryStatus />
            </DashboardCard>
          </div>
        );
      case "messages":
        return <MessagesView />;
      default:
        return <div>Select a section from the menu</div>;
    }
  };

  return (
    <main className="container mx-auto p-6">
      {renderContent()}
    </main>
  );
};
