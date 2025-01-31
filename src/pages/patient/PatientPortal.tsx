import React, { useState } from "react";
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
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AccessibilitySettings } from "@/components/patient/AccessibilitySettings";
import { HealthMetricsCard } from "@/components/patient/HealthMetricsCard";
import { TelehealthOptions } from "@/components/patient/TelehealthOptions";

const mockBloodSugarData = [
  { date: "Mon", level: 120 },
  { date: "Tue", level: 115 },
  { date: "Wed", level: 125 },
  { date: "Thu", level: 118 },
  { date: "Fri", level: 122 },
  { date: "Sat", level: 116 },
  { date: "Sun", level: 119 },
];

type MenuSection = "dashboard" | "appointments" | "medical-history" | "health-metrics" | "profile" | "settings";

const PatientDetails = {
  appointments: [
    { date: "2024-03-15", time: "10:00 AM", doctor: "Dr. Smith", type: "Check-up" },
    { date: "2024-03-28", time: "2:30 PM", doctor: "Dr. Johnson", type: "Follow-up" },
  ],
  medicalHistory: [
    { date: "2024-02-01", type: "Annual Physical", notes: "All vitals normal" },
    { date: "2024-01-15", type: "Blood Work", notes: "Cholesterol slightly elevated" },
  ],
  profile: {
    name: "John Doe",
    dob: "1979-05-15",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    emergencyContact: "Jane Doe - (555) 987-6543",
  },
};

const PatientPortal = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<MenuSection>("dashboard");
  
  const [fontSize, setFontSize] = useState(16);
  const [voiceAssistant, setVoiceAssistant] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);

  const getBloodSugarInterpretation = (data: typeof mockBloodSugarData) => {
    const lastReading = data[data.length - 1].level;
    if (lastReading < 70) return "Your blood sugar is below normal range. Please eat something sweet.";
    if (lastReading > 180) return "Your blood sugar is high. Consider checking with your provider.";
    return "Your blood sugar is within normal range.";
  };

  const renderContent = () => {
    switch (activeSection) {
      case "health-metrics":
        return (
          <div className="space-y-6">
            <HealthMetricsCard
              data={mockBloodSugarData}
              title="Blood Sugar Levels"
              interpretation={getBloodSugarInterpretation(mockBloodSugarData)}
              normalRange={{ min: 70, max: 180 }}
              showTooltips={showTooltips}
              fontSize={fontSize}
            />
            <TelehealthOptions />
          </div>
        );
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
      case "dashboard":
        return (
          <div className="space-y-6">
            <DashboardCard title="Welcome to Your Dashboard">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Quick Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <HealthMetricsCard
                    data={mockBloodSugarData}
                    title="Blood Sugar Levels"
                    interpretation={getBloodSugarInterpretation(mockBloodSugarData)}
                    normalRange={{ min: 70, max: 180 }}
                    showTooltips={showTooltips}
                    fontSize={fontSize}
                  />
                  <TelehealthOptions />
                </div>
              </div>
            </DashboardCard>
          </div>
        );
      case "appointments":
        return (
          <div className="space-y-6">
            <DashboardCard title="Your Appointments">
              <div className="grid gap-4">
                {PatientDetails.appointments.map((appointment, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-primary/5 rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <h3 className="font-medium">{appointment.doctor}</h3>
                      <span className="text-sm text-muted-foreground">{appointment.type}</span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span>{appointment.date}</span>
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        );
      case "medical-history":
        return (
          <div className="space-y-6">
            <DashboardCard title="Medical History">
              <div className="grid gap-4">
                {PatientDetails.medicalHistory.map((record, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-primary/5 rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <h3 className="font-medium">{record.type}</h3>
                      <span className="text-sm text-muted-foreground">{record.date}</span>
                    </div>
                    <p className="text-sm">{record.notes}</p>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        );
      case "profile":
        return (
          <div className="space-y-6">
            <DashboardCard title="Profile Information">
              <div className="grid gap-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Name</h3>
                    <p className="text-sm">{PatientDetails.profile.name}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Date of Birth</h3>
                    <p className="text-sm">{PatientDetails.profile.dob}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm">{PatientDetails.profile.email}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm">{PatientDetails.profile.phone}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Emergency Contact</h3>
                  <p className="text-sm">{PatientDetails.profile.emergencyContact}</p>
                </div>
              </div>
            </DashboardCard>
          </div>
        );
      default:
        return <div> {/* Placeholder for other sections */} </div>;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold" style={{ fontSize: `${fontSize}px` }}>
              Patient Portal
            </h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {[
                { icon: LayoutDashboard, label: "Dashboard", value: "dashboard" },
                { icon: Activity, label: "Health Metrics", value: "health-metrics" },
                { icon: Calendar, label: "Appointments", value: "appointments" },
                { icon: FileText, label: "Medical History", value: "medical-history" },
                { icon: User, label: "Profile", value: "profile" },
                { icon: Settings, label: "Settings", value: "settings" },
              ].map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    className="flex items-center"
                    onClick={() => setActiveSection(item.value as MenuSection)}
                    isActive={activeSection === item.value}
                  >
                    <item.icon className="mr-2" />
                    <span style={{ fontSize: `${fontSize - 2}px` }}>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center text-red-500"
                  onClick={() => navigate("/auth/login")}
                >
                  <LogOut className="mr-2" />
                  <span style={{ fontSize: `${fontSize - 2}px` }}>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1">
          <Header />
          <main 
            className="container mx-auto px-4 pt-20 pb-8"
            style={{ fontSize: `${fontSize}px` }}
          >
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PatientPortal;
