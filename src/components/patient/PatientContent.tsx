import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  const navigate = useNavigate();
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  className="text-xl p-6"
                  onClick={() => navigate("/features/schedule-appointment")}
                >
                  Schedule Appointment
                </Button>
                <Button
                  className="text-xl p-6"
                  onClick={() => navigate("/features/virtual-visit")}
                >
                  Virtual Visit
                </Button>
                <Button
                  className="text-xl p-6"
                  onClick={() => navigate("/features/prescription-delivery")}
                >
                  Prescription Delivery
                </Button>
                <Button
                  className="text-xl p-6"
                  onClick={() => navigate("/features/medication-reminders")}
                >
                  Medication Reminders
                </Button>
                <Button
                  className="text-xl p-6"
                  onClick={() => navigate("/features/health-records")}
                >
                  Health Records
                </Button>
                <Button
                  className="text-xl p-6"
                  onClick={() => navigate("/features/family-access")}
                >
                  Family Access
                </Button>
                <Button
                  className="text-xl p-6"
                  onClick={() => navigate("/features/transportation")}
                >
                  Transportation
                </Button>
                <Button
                  className="text-xl p-6"
                  onClick={() => navigate("/features/health-monitoring")}
                >
                  Health Monitoring
                </Button>
                <Button
                  className="text-xl p-6"
                  onClick={() => navigate("/features/message-care-team")}
                >
                  Message Care Team
                </Button>
                <Button
                  className="text-xl p-6"
                  onClick={() => navigate("/features/medication-management")}
                >
                  Medication Management
                </Button>
                <Button
                  className="text-xl p-6"
                  onClick={() => navigate("/features/care-reminders")}
                >
                  Care Reminders
                </Button>
                <Button
                  className="text-xl p-6"
                  onClick={() => navigate("/features/support")}
                >
                  Support
                </Button>
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
