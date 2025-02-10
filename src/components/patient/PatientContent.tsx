
import { useState, useEffect } from "react";
import { fetchUpcomingAppointments } from "@/api/appointments";
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
import { UpcomingAppointments } from "./UpcomingAppointments";
import { useTranslation } from "react-i18next";

interface PatientContentProps {
  activeSection: MenuSection;
  fontSize: number;
  showTooltips: boolean;
  voiceAssistant: boolean;
  setFontSize: (size: number) => void;
  setVoiceAssistant: (enabled: boolean) => void;
  setShowTooltips: (show: boolean) => void;
  patientId: number;
}

export const PatientContent = ({
  activeSection,
  fontSize,
  showTooltips,
  voiceAssistant,
  setFontSize,
  setVoiceAssistant,
  setShowTooltips,
  patientId,
}: PatientContentProps) => {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Function to refresh appointments after scheduling
  const refreshAppointments = async () => {
    const data = await fetchUpcomingAppointments(1);
    setAppointments(data);
  };

  // Fetch upcoming appointments when component mounts
  useEffect(() => {
    refreshAppointments();
  }, [patientId]); 

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <br />
            <DashboardCard title={t("dashboard.welcome")}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DashboardCard title={t("appointments.schedule")}>
                    <AppointmentScheduler
                      patientId={1}
                      onAppointmentScheduled={refreshAppointments} />
                  </DashboardCard>
                  <div className="space-y-4">
                    <TelehealthOptions />
                    <UpcomingAppointments 
                      patientId={1}
                      appointments={appointments}
                     />
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
        );
      case "health-metrics":
        return (
          <div className="space-y-6">
            <br />
            <HealthMetricsOverview 
              fontSize={fontSize}
              showTooltips={showTooltips}
            />
            <DashboardCard title={t("healthMetrics.record")}>
              <HealthMetricsInput />
            </DashboardCard>
          </div>
        );
      case "appointments":
        return (
          <DashboardCard title={t("appointments.title")}>
            <AppointmentScheduler />
          </DashboardCard>
        );
      case "records":
        return <MedicalHistory />;
      case "settings":
        return (
          <DashboardCard title={t("settings.accessibility")}>
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
            <br />
            <DashboardCard title={t("medications.yourMedications")}>
              <MedicationList />
            </DashboardCard>
            <DashboardCard title={t("medications.deliveryStatus")}>
              <DeliveryStatus />
            </DashboardCard>
          </div>
        );
      case "messages":
        return <MessagesView />;
      default:
        return <div>{t("common.selectSection")}</div>;
    }
  };

  return (
    <main className="container mx-auto p-6">
      {renderContent()}
    </main>
  );
};
