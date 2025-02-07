import { Header } from "@/components/Layout/Header";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { AIAssistant } from "@/components/Dashboard/AIAssistant";
import { StructuredTemplates } from "@/components/Dashboard/StructuredTemplates";
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
        <Sidebar className="md:w-64 w-full">
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">Provider Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center"
                  onClick={() => navigate("/Index")}
                >
                  <FileText className="mr-2" />
                  <span>Dashboard</span>\
                </SidebarMenuButton>
              </SidebarMenuItem>
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
                  onClick={() => navigate("/messages")}
                >
                  <FileText className="mr-2" />
                  <span>Messages</span>\
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

        <div className="flex-1 min-h-screen">
          <Header />
          <main className="container mx-auto px-4 pt-20 pb-8">
            <div className="mb-6 w-full flex justify-center md:justify-start">
              <SearchBar />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              <DashboardCard title="Recent Patients" className="min-h-[400px] overflow-y-auto">
                <div className="space-y-3">
                  {mockPatientData.slice(0, 3).map((patient) => (
                    <div
                      key={patient.id}
                      className="p-3 md:p-4 bg-primary/5 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
                      onClick={() => navigate(`/patients/${patient.id}`)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-sm md:text-base">{patient.name}</p>
                        {patient.alerts.length > 0 && (
                          <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs md:text-sm text-gray-600">
                        Next Appointment: {patient.nextAppointment}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600">
                        Condition: {patient.condition}
                      </p>
                      <div className="mt-2 flex gap-2 flex-wrap">
                        <button
                          onClick={(e: { stopPropagation: () => void; }) => {
                            e.stopPropagation();
                            navigate(`/patients/${patient.id}/notes`);
                          }}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          <ClipboardList className="h-3 w-3 inline mr-1" />
                          Notes
                        </button>
                        <button
                          onClick={(e: { stopPropagation: () => void; }) => {
                            e.stopPropagation();
                            navigate(`/patients/${patient.id}/medications`);
                          }}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full hover:bg-green-200 transition-colors"
                        >
                          <Pill className="h-3 w-3 inline mr-1" />
                          Meds ({patient.medications.length})
                        </button>
                        {patient.alerts.length > 0 && (
                          <button
                            onClick={(e: { stopPropagation: () => void; }) => {
                              e.stopPropagation();
                              navigate(`/patients/${patient.id}/alerts`);
                            }}
                            className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full hover:bg-red-200 transition-colors"
                          >
                            <AlertCircle className="h-3 w-3 inline mr-1" />
                            Alerts ({patient.alerts.length})
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>

              <DashboardCard title="Weekly Appointments" className="min-h-[400px]">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockAppointmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        width={30}
                      />
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

              <DashboardCard title="Quick Actions" className="min-h-[400px]">
                <div className="space-y-3 md:space-y-4">
                  <button
                    onClick={() => navigate("/patients/new")}
                    className="w-full p-3 md:p-4 text-left bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    Add New Patient
                  </button>
                  <button
                    onClick={() => navigate("/records/new")}
                    className="w-full p-3 md:p-4 text-left bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    Create Medical Record
                  </button>
                  <button
                    onClick={() => navigate("/alerts")}
                    className="w-full p-3 md:p-4 text-left bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    View Patient Alerts
                  </button>
                </div>
              </DashboardCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DashboardCard title="AI Documentation">
                <AIAssistant />
              </DashboardCard>
              <DashboardCard title="Structured Templates">
                <StructuredTemplates />
              </DashboardCard>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;