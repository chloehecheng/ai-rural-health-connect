import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { PatientSidebar } from "@/components/patient/PatientSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleAlert, CircleX, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MenuSection } from "@/pages/patient/PatientPortal";

// Mock data - would come from API in real app
const activePatients = [
  {
    id: 1,
    name: "John Doe",
    conditions: ["Hypertension", "Type 2 Diabetes"],
    nextAppointment: "2024-02-01 09:30 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    conditions: ["Asthma", "Anxiety"],
    nextAppointment: "2024-02-02 02:15 PM",
  },
  {
    id: 3,
    name: "Mike Johnson",
    conditions: ["COPD", "Arthritis"],
    nextAppointment: "2024-02-03 11:00 AM",
  },
];

const recentRecords = [
  {
    id: 1,
    patientId: 1,
    patientName: "John Doe",
    visitType: "Follow-up for Diabetes",
    status: "finalized",
    date: "2024-01-30",
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Jane Smith",
    visitType: "Routine Checkup",
    status: "pending",
    date: "2024-01-29",
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Mike Johnson",
    visitType: "Urgent Care Visit",
    status: "urgent",
    date: "2024-01-28",
  },
];

const recentAlerts = [
  {
    id: 1,
    patientId: 1,
    patientName: "John Doe",
    description: "Critical Lab Result - High Blood Sugar",
    urgency: "high",
    timestamp: "2024-01-30 10:15 AM",
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Jane Smith",
    description: "Medication Review Required",
    urgency: "medium",
    timestamp: "2024-01-29 03:45 PM",
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Mike Johnson",
    description: "Follow-up Appointment Due",
    urgency: "low",
    timestamp: "2024-01-28 11:30 AM",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "finalized":
      return <CircleCheck className="h-4 w-4 text-green-500" />;
    case "pending":
      return <CircleAlert className="h-4 w-4 text-yellow-500" />;
    case "urgent":
      return <CircleX className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "high":
      return "destructive";
    case "medium":
      return "secondary";  // Changed from "warning" to "secondary"
    case "low":
      return "outline";    // Changed from "success" to "outline"
    default:
      return "default";
  }
};

const Patients = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<MenuSection>("dashboard");
  const [fontSize, setFontSize] = useState(16);

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
          <main className="container mx-auto px-4 pt-20 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Active Patients Card */}
              <DashboardCard title="Active Patients">
                <div className="space-y-4">
                  {activePatients.map((patient) => (
                    <div key={patient.id} className="p-4 bg-white rounded-lg shadow-sm border">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-lg">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {patient.conditions.join(", ")}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Next: {patient.nextAppointment}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/patients/${patient.id}`)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>

              {/* Recent Records Card */}
              <DashboardCard title="Recent Records">
                <div className="space-y-4">
                  {recentRecords.map((record) => (
                    <div key={record.id} className="p-4 bg-white rounded-lg shadow-sm border">
                      <div className="flex items-start justify-between">
                        <div>
                          <button
                            onClick={() => navigate(`/patients/${record.patientId}`)}
                            className="font-medium hover:underline"
                          >
                            {record.patientName}
                          </button>
                          <p className="text-sm text-muted-foreground">{record.visitType}</p>
                          <p className="text-sm text-muted-foreground">{record.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>

              {/* Recent Alerts Card */}
              <DashboardCard title="Recent Alerts">
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 bg-white rounded-lg shadow-sm border">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                          <button
                            onClick={() => navigate(`/patients/${alert.patientId}`)}
                            className="font-medium hover:underline"
                          >
                            {alert.patientName}
                          </button>
                          <Badge variant={getUrgencyColor(alert.urgency)}>
                            {alert.urgency.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm">{alert.description}</p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => console.log("Acknowledge clicked")}
                          >
                            Acknowledge
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => navigate(`/patients/${alert.patientId}/records`)}
                          >
                            Review Record
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Patients;
