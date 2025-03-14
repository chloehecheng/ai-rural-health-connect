import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileText,
  Activity,
  Calendar,
  Settings,
  LogOut,
  MessageSquare,
  Pill,
} from "lucide-react";
import { MenuSection } from "@/pages/patient/PatientPortal";

interface PatientPortalSidebarProps {
  activeSection: MenuSection;
  setActiveSection: React.Dispatch<React.SetStateAction<MenuSection>>;
  fontSize: number;
}

export const PatientPortalSidebar = ({
  activeSection,
  setActiveSection,
  fontSize,
}: PatientPortalSidebarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: t("sidebar.dashboard"),
      value: "dashboard" as MenuSection,
      description: "Your health overview"
    },
    { 
      icon: Activity, 
      label: t("sidebar.healthMetrics"), 
      value: "health-metrics" as MenuSection,
      description: "Track your vital signs"
    },
    { 
      icon: Calendar, 
      label: t("sidebar.appointments"), 
      value: "appointments" as MenuSection,
      description: "Schedule and manage appointments"
    },
    { 
      icon: FileText, 
      label: t("sidebar.records"),
      value: "records" as MenuSection,
      description: "View your medical records"
    },
    { 
      icon: Pill, 
      label: t("sidebar.medications"),
      value: "medications" as MenuSection,
      description: "Manage your medications"
    },
    { 
      icon: MessageSquare, 
      label: t("sidebar.messages"), 
      value: "messages" as MenuSection,
      description: "Contact your healthcare team"
    },
    { 
      icon: Settings, 
      label: t("sidebar.settings"), 
      value: "settings" as MenuSection,
      description: "Manage your preferences"
    },
  ];

  return (
    <>
      <SidebarHeader className="p-4 bg-white">
        <h2 
          className="text-lg font-semibold" 
          style={{ fontSize: `${fontSize}px` }}>
           {t("sidebar.patientPortal")}
        </h2>
      </SidebarHeader>
      <SidebarContent className="bg-white">
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
                {t("sidebar.logout")}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </>
  );
};