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
  Users,
  FileText,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { MenuSection } from "@/pages/patient/PatientPortal";

interface PatientSidebarProps {
  activeSection: MenuSection;
  setActiveSection: React.Dispatch<React.SetStateAction<MenuSection>>;
  fontSize: number;
}

export const PatientSidebar = ({
  activeSection,
  setActiveSection,
  fontSize,
}: PatientSidebarProps) => {
  const navigate = useNavigate();

  // Fixed order menu items with consistent values
  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: "Dashboard", 
      value: "dashboard" as MenuSection,
      description: "Overview and key metrics"
    },
    { 
      icon: Users, 
      label: "Patients", 
      value: "patients" as MenuSection,
      description: "Patient management"
    },
    { 
      icon: FileText, 
      label: "Records", 
      value: "records" as MenuSection,
      description: "Medical records and documents"
    },
    { 
      icon: Bell, 
      label: "Alerts", 
      value: "alerts" as MenuSection,
      description: "Important notifications"
    },
    { 
      icon: Settings, 
      label: "Settings", 
      value: "settings" as MenuSection,
      description: "System preferences"
    },
  ];

  return (
    <>
      <SidebarHeader className="p-4">
        <h2 
          className="text-lg font-semibold" 
          style={{ fontSize: `${fontSize}px` }}
        >
          Provider Portal
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.value}>
              <SidebarMenuButton
                className="flex items-center gap-3 w-full"
                onClick={() => setActiveSection(item.value)}
                isActive={activeSection === item.value}
                tooltip={item.description}
              >
                <item.icon className="shrink-0" />
                <span 
                  className="truncate"
                  style={{ fontSize: `${fontSize - 2}px` }}
                >
                  {item.label}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          
          <SidebarMenuItem>
            <SidebarMenuButton
              className="flex items-center gap-3 w-full text-red-500 hover:text-red-600"
              onClick={() => navigate("/auth/login")}
            >
              <LogOut className="shrink-0" />
              <span 
                className="truncate"
                style={{ fontSize: `${fontSize - 2}px` }}
              >
                Logout
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </>
  );
};