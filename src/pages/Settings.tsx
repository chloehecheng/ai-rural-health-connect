import { Header } from "@/components/Layout/Header";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Home, Users, FileText, Bell, Settings as SettingsIcon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <SidebarProvider>
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
                  <FileText className="mr-2" />
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
                  <FileText className="mr-2" />
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
                  <SettingsIcon className="mr-2" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard title="Application Settings">
                <div className="space-y-4">
                  {['Profile', 'Notifications', 'Privacy', 'Security'].map((setting) => (
                    <div key={setting} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <div>
                        <p className="font-medium">{setting}</p>
                        <p className="text-sm text-gray-600">Manage your {setting.toLowerCase()} settings</p>
                      </div>
                      <button className="text-primary hover:text-primary/80">Configure</button>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;