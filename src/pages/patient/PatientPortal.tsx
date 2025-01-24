import { Header } from "@/components/Layout/Header";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Calendar,
  FileText,
  Activity,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from "react";

const mockBloodSugarData = [
  { date: "Mon", level: 120 },
  { date: "Tue", level: 115 },
  { date: "Wed", level: 125 },
  { date: "Thu", level: 118 },
  { date: "Fri", level: 122 },
  { date: "Sat", level: 116 },
  { date: "Sun", level: 119 },
];

const mockAppointments = [
  { doctor: "Dr. Sarah Johnson", date: "Tomorrow at 10:00 AM", type: "Regular Checkup" },
  { doctor: "Dr. Michael Chen", date: "Next Week, Monday at 2:00 PM", type: "Follow-up" },
];

const mockMedicalHistory = [
  { date: "2023-12-15", condition: "Hypertension", notes: "Diagnosed and started medication" },
  { date: "2023-11-20", condition: "Annual Physical", notes: "All results normal" },
];

type MenuSection = "dashboard" | "appointments" | "medical-history" | "health-metrics" | "profile";

const PatientPortal = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<MenuSection>("dashboard");

  const renderDashboardContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <DashboardCard title="Next Appointment">
        <div className="p-4 bg-primary/5 rounded-lg">
          <p className="font-medium">{mockAppointments[0].doctor}</p>
          <p className="text-sm text-gray-600">{mockAppointments[0].date}</p>
          <p className="text-sm text-gray-600">{mockAppointments[0].type}</p>
        </div>
      </DashboardCard>

      <DashboardCard title="Recent Medications">
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>Metformin</span>
            <span className="text-sm text-gray-600">500mg daily</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Lisinopril</span>
            <span className="text-sm text-gray-600">10mg daily</span>
          </li>
        </ul>
      </DashboardCard>

      <DashboardCard title="Latest Vitals">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Blood Pressure:</span>
            <span>120/80</span>
          </div>
          <div className="flex justify-between">
            <span>Heart Rate:</span>
            <span>72 bpm</span>
          </div>
          <div className="flex justify-between">
            <span>Temperature:</span>
            <span>98.6°F</span>
          </div>
        </div>
      </DashboardCard>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <DashboardCard title="Upcoming Appointments">
        {mockAppointments.map((appointment, index) => (
          <div key={index} className="p-4 bg-primary/5 rounded-lg mb-4">
            <p className="font-medium">{appointment.doctor}</p>
            <p className="text-sm text-gray-600">{appointment.date}</p>
            <p className="text-sm text-gray-600">{appointment.type}</p>
          </div>
        ))}
      </DashboardCard>
    </div>
  );

  const renderMedicalHistory = () => (
    <div className="space-y-6">
      <DashboardCard title="Medical History">
        {mockMedicalHistory.map((record, index) => (
          <div key={index} className="p-4 border-b last:border-b-0">
            <p className="font-medium">{record.date}</p>
            <p className="text-sm font-medium text-primary">{record.condition}</p>
            <p className="text-sm text-gray-600">{record.notes}</p>
          </div>
        ))}
      </DashboardCard>
    </div>
  );

  const renderHealthMetrics = () => (
    <div className="space-y-6">
      <DashboardCard title="Blood Sugar Levels">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockBloodSugarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="level"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <DashboardCard title="Personal Information">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium">John Doe</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="font-medium">January 15, 1980</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">john.doe@example.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">(555) 123-4567</p>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboardContent();
      case "appointments":
        return renderAppointments();
      case "medical-history":
        return renderMedicalHistory();
      case "health-metrics":
        return renderHealthMetrics();
      case "profile":
        return renderProfile();
      default:
        return renderDashboardContent();
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">Patient Portal</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="flex items-center"
                  onClick={() => setActiveSection("appointments")}
                  isActive={activeSection === "appointments"}
                >
                  <Calendar className="mr-2" />
                  <span>Appointments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="flex items-center"
                  onClick={() => setActiveSection("medical-history")}
                  isActive={activeSection === "medical-history"}
                >
                  <FileText className="mr-2" />
                  <span>Medical History</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="flex items-center"
                  onClick={() => setActiveSection("health-metrics")}
                  isActive={activeSection === "health-metrics"}
                >
                  <Activity className="mr-2" />
                  <span>Health Metrics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="flex items-center"
                  onClick={() => setActiveSection("profile")}
                  isActive={activeSection === "profile"}
                >
                  <User className="mr-2" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center text-red-500"
                  onClick={() => navigate("/auth/login")}
                >
                  <LogOut className="mr-2" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1">
          <Header />
          <main className="container mx-auto px-4 pt-20 pb-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PatientPortal;