
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
  AlertCircle,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { MenuSection } from "@/pages/patient/PatientPortal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PatientSidebarProps {
  activeSection: MenuSection;
  setActiveSection: React.Dispatch<React.SetStateAction<MenuSection>>;
  fontSize: number;
}

// Mock data for patient details - would come from API in real app
const recentNotes = [
  { id: 1, patient: "John Doe", note: "Follow-up required for blood pressure", date: "2024-01-30" },
  { id: 2, patient: "Jane Smith", note: "Medication adjustment needed", date: "2024-01-29" },
  { id: 3, patient: "Mike Johnson", note: "Lab results reviewed", date: "2024-01-28" },
];

const recentRecords = [
  { id: 1, patient: "John Doe", type: "Blood Test", date: "2024-01-30" },
  { id: 2, patient: "Jane Smith", type: "X-Ray Results", date: "2024-01-29" },
  { id: 3, patient: "Mike Johnson", type: "Annual Check-up", date: "2024-01-28" },
];

const activeAlerts = [
  { id: 1, patient: "John Doe", message: "Critical lab results", urgency: "high" },
  { id: 2, patient: "Jane Smith", message: "Medication reminder", urgency: "medium" },
  { id: 3, patient: "Mike Johnson", message: "Follow-up needed", urgency: "low" },
];

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
      description: "Patient management",
      hasDropdown: true
    },
    { 
      icon: MessageSquare, 
      label: "Messages", 
      value: "messages" as MenuSection,
      description: "Patient communications"
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

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
              {item.hasDropdown ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      className="flex items-center gap-3 w-full"
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
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-80 bg-popover"
                    align="center"
                    side="right"
                  >
                    <DropdownMenuGroup>
                      <div className="p-2">
                        <h3 className="mb-2 text-sm font-medium">Recent Notes</h3>
                        {recentNotes.map((note) => (
                          <DropdownMenuItem key={note.id} className="flex flex-col items-start">
                            <span className="font-medium">{note.patient}</span>
                            <span className="text-sm text-muted-foreground">{note.note}</span>
                            <span className="text-xs text-muted-foreground">{note.date}</span>
                          </DropdownMenuItem>
                        ))}
                        <button 
                          onClick={() => navigate('/patients/notes')}
                          className="w-full text-sm text-primary hover:text-primary/80 mt-1 text-right"
                        >
                          View More →
                        </button>
                      </div>

                      <div className="p-2 border-t">
                        <h3 className="mb-2 text-sm font-medium">Recent Records</h3>
                        {recentRecords.map((record) => (
                          <DropdownMenuItem key={record.id} className="flex flex-col items-start">
                            <span className="font-medium">{record.patient}</span>
                            <span className="text-sm text-muted-foreground">{record.type}</span>
                            <span className="text-xs text-muted-foreground">{record.date}</span>
                          </DropdownMenuItem>
                        ))}
                      </div>

                      <div className="p-2 border-t">
                        <h3 className="mb-2 text-sm font-medium">Active Alerts</h3>
                        {activeAlerts.map((alert) => (
                          <DropdownMenuItem key={alert.id} className="flex flex-col items-start">
                            <div className="flex items-center gap-2">
                              <AlertCircle className={`h-4 w-4 ${getUrgencyColor(alert.urgency)}`} />
                              <span className="font-medium">{alert.patient}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{alert.message}</span>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
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
              )}
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
