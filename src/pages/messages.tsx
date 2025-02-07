
import { MessagesView } from "src/pages/MessageView.tsx";
import { Header } from "@/components/Layout/Header";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Home, Users, FileText, Bell, Settings, LogOut, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <Sidebar>
        <SidebarHeader className="p-4">
          <h2 className="text-lg font-semibold">RuralCare AI</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="flex items-center"
                onClick={() => navigate("/dashboard")}
              >
                <Home className="mr-2" />
                <span>Dashboard</span>
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
                <MessageSquare className="mr-2" />
                <span>Messages</span>
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
          <MessagesView />
        </main>
      </div>
    </div>
  );
};

export default Messages;
