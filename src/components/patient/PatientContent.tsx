
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
            <DashboardCard title="Welcome to Your Dashboard">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DashboardCard title="Schedule Appointment">
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
            <br />
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
