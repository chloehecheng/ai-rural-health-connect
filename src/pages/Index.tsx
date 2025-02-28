import { Header } from "@/components/Layout/Header";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { ProviderDashboard } from "@/components/Dashboard/ProviderDashboard";
import { SearchBar } from "@/components/Dashboard/SearchBar";
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
  Pill,
  AlertCircle,
  ClipboardList,
  Calendar,
  MessageSquare,
  FolderOpen,
  BarChart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockPatientData = [
  {
    id: 1,
    name: "John Doe",
    lastVisit: "2024-02-15",
    nextAppointment: "2024-03-01",
    condition: "Diabetes",
    medications: ["Metformin 500mg", "Lisinopril 10mg"],
    alerts: ["Blood sugar trending high", "Missed last appointment"],
    lastNote: "Patient reported improved glucose control..."
  },
  {
    id: 2,
    name: "Jane Smith",
    lastVisit: "2024-02-14",
    nextAppointment: "2024-03-05",
    condition: "Hypertension",
    medications: ["Amlodipine 5mg", "Hydrochlorothiazide 25mg"],
    alerts: ["BP readings above target"],
    lastNote: "Medication adjusted due to persistent high BP..."
  },
  {
    id: 3,
    name: "Mike Johnson",
    lastVisit: "2024-02-10",
    nextAppointment: "2024-02-28",
    condition: "Asthma",
    medications: ["Albuterol inhaler", "Fluticasone inhaler"],
    alerts: [],
    lastNote: "Seasonal allergies well controlled..."
  },
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
                  <MessageSquare className="w-7 h-7 mr-4 text-primary" />
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

        <div className="flex-1 min-h-screen">
          <Header />
          <main className="container mx-auto px-4 pt-20 pb-8">
            <div className="mb-6 w-full flex justify-center md:justify-start">
              <SearchBar />
            </div>
            <ProviderDashboard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;