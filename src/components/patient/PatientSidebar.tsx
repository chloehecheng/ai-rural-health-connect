import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Activity,
  Calendar,
  FileText,
  User,
  Settings,
  LogOut,
} from "lucide-react";

interface PatientSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  fontSize: number;
}

export const PatientSidebar = ({
  activeSection,
  setActiveSection,
  fontSize,
}: PatientSidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", value: "dashboard" },
    { icon: Activity, label: "Health Metrics", value: "health-metrics" },
    { icon: Calendar, label: "Appointments", value: "appointments" },
    { icon: FileText, label: "Medical History", value: "medical-history" },
    { icon: User, label: "Profile", value: "profile" },
    { icon: Settings, label: "Settings", value: "settings" },
  ];

  return (
    <>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold" style={{ fontSize: `${fontSize}px` }}>
          Patient Portal
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.value}>
              <SidebarMenuButton
                className="flex items-center"
                onClick={() => setActiveSection(item.value)}
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
    </>
  );
};