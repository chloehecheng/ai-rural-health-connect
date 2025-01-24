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

const mockBloodSugarData = [
  { date: "Mon", level: 120 },
  { date: "Tue", level: 115 },
  { date: "Wed", level: 125 },
  { date: "Thu", level: 118 },
  { date: "Fri", level: 122 },
  { date: "Sat", level: 116 },
  { date: "Sun", level: 119 },
];

const PatientPortal = () => {
  const navigate = useNavigate();

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
                <SidebarMenuButton className="flex items-center">
                  <Calendar className="mr-2" />
                  <span>Appointments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center">
                  <FileText className="mr-2" />
                  <span>Medical History</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center">
                  <Activity className="mr-2" />
                  <span>Health Metrics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <DashboardCard title="Next Appointment">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="font-medium">Dr. Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Tomorrow at 10:00 AM</p>
                  <p className="text-sm text-gray-600">Regular Checkup</p>
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PatientPortal;