import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleAlert, CircleX, Eye, FileText, Users, Bell, Settings, LogOut } from "lucide-react";
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
    lastUpdated: "2024-01-30 10:00 AM",
    type: "Medical Record",
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Jane Smith",
    visitType: "Routine Checkup",
    status: "pending",
    date: "2024-01-29",
    lastUpdated: "2024-01-29 03:00 PM",
    type: "Lab Result",
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Mike Johnson",
    visitType: "Urgent Care Visit",
    status: "urgent",
    date: "2024-01-28",
    lastUpdated: "2024-01-28 11:00 AM",
    type: "Imaging Report",
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
        <div className="min-h-screen flex flex-col md:flex-row w-full bg-gray-50">
          <Sidebar className="md:w-64 w-full bg-white border-r">
            <SidebarHeader className="p-6 border-b">
              <h2 className="text-3xl font-bold text-primary">Provider Dashboard</h2>
            </SidebarHeader>
            <SidebarContent className="p-3">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="flex items-center p-4 text-xl rounded-lg hover:bg-primary/5 transition-colors duration-200 font-medium"
                    onClick={() => navigate("/dashboard")}
                  >
                    <FileText className="w-7 h-7 mr-4 text-primary" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="flex items-center p-4 text-xl rounded-lg hover:bg-primary/5 transition-colors duration-200 font-medium"
                    onClick={() => navigate("/patients")}
                  >
                    <Users className="w-7 h-7 mr-4 text-primary" />
                    <span>Patients</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="flex items-center p-4 text-xl rounded-lg hover:bg-primary/5 transition-colors duration-200 font-medium"
                    onClick={() => navigate("/messages")}
                  >
                    <FileText className="w-7 h-7 mr-4 text-primary" />
                    <span>Messages</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="flex items-center p-4 text-xl rounded-lg hover:bg-primary/5 transition-colors duration-200 font-medium"
                    onClick={() => navigate("/alerts")}
                  >
                    <Bell className="w-7 h-7 mr-4 text-primary" />
                    <span>Alerts</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="flex items-center p-4 text-xl rounded-lg hover:bg-primary/5 transition-colors duration-200 font-medium"
                    onClick={() => navigate("/settings")}
                  >
                    <Settings className="w-7 h-7 mr-4 text-primary" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="flex items-center p-4 text-xl rounded-lg hover:bg-red-50 text-red-600 transition-colors duration-200 font-medium"
                    onClick={() => navigate("/auth/login")}
                  >
                    <LogOut className="w-7 h-7 mr-4" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
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
                          onClick={() => navigate(`/patient/${patient.id}`)}
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
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
                    >
                      <div>
                        <h3 
                          className="font-medium text-primary hover:underline cursor-pointer"
                          onClick={() => navigate(`/patient/${record.patientId}`)}
                        >
                          {record.patientName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Last Updated: {record.lastUpdated}
                        </p>
                      </div>
                      <div>
                        <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                          {record.type}
                        </span>
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
                            onClick={() => navigate(`/patient/${alert.patientId}`)}
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
