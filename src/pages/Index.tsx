import { Header } from "@/components/Layout/Header";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { AIAssistant } from "@/components/Dashboard/AIAssistant";
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
  Users,
  FileText,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockPatientData = [
  { id: 1, name: "John Doe", lastVisit: "2024-02-15", nextAppointment: "2024-03-01", condition: "Diabetes" },
  { id: 2, name: "Jane Smith", lastVisit: "2024-02-14", nextAppointment: "2024-03-05", condition: "Hypertension" },
  { id: 3, name: "Mike Johnson", lastVisit: "2024-02-10", nextAppointment: "2024-02-28", condition: "Asthma" },
];

const mockAppointmentData = [
  { date: "Mon", count: 8 },
  { date: "Tue", count: 12 },
  { date: "Wed", count: 10 },
  { date: "Thu", count: 15 },
  { date: "Fri", count: 9 },
  { date: "Sat", count: 6 },
  { date: "Sun", count: 4 },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">Provider Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center"
                  onClick={() => navigate("/patients")}
                >
                  <Users className="mr-2" />
                  <span>Patients</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center"
                  onClick={() => navigate("/records")}
                >
                  <FileText className="mr-2" />
                  <span>Records</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center"
                  onClick={() => navigate("/alerts")}
                >
                  <Bell className="mr-2" />
                  <span>Alerts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center"
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="mr-2" />
                  <span>Settings</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <DashboardCard title="Recent Patients">
                <div className="space-y-4">
                  {mockPatientData.slice(0, 3).map((patient) => (
                    <div
                      key={patient.id}
                      className="p-4 bg-primary/5 rounded-lg cursor-pointer hover:bg-primary/10"
                      onClick={() => navigate(`/patients/${patient.id}`)}
                    >
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-gray-600">
                        Next Appointment: {patient.nextAppointment}
                      </p>
                      <p className="text-sm text-gray-600">
                        Condition: {patient.condition}
                      </p>
                    </div>
                  ))}
                </div>
              </DashboardCard>

              <DashboardCard title="Weekly Appointments">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockAppointmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DashboardCard>

              <DashboardCard title="Quick Actions">
                <div className="space-y-4">
                  <button
                    onClick={() => navigate("/patients/new")}
                    className="w-full p-3 text-left bg-primary/5 rounded-lg hover:bg-primary/10"
                  >
                    Add New Patient
                  </button>
                  <button
                    onClick={() => navigate("/records/new")}
                    className="w-full p-3 text-left bg-primary/5 rounded-lg hover:bg-primary/10"
                  >
                    Create Medical Record
                  </button>
                  <button
                    onClick={() => navigate("/alerts")}
                    className="w-full p-3 text-left bg-primary/5 rounded-lg hover:bg-primary/10"
                  >
                    View Patient Alerts
                  </button>
                </div>
              </DashboardCard>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <AIAssistant />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;