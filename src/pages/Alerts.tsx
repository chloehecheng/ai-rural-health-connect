import { Header } from "@/components/Layout/Header";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Home, Users, FileText, Bell, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Alerts = () => {
  const navigate = useNavigate();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
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
                  <FileText className="w-7 h-7 mr-4 text-primary" />
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

        <div className="flex-1">
          <Header />
          <main className="container mx-auto px-4 pt-20 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard title="Recent Alerts">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <div>
                        <p className="font-medium">Alert #{i}</p>
                        <p className="text-sm text-gray-600">Priority: High</p>
                      </div>
                      <button className="text-primary hover:text-primary/80">View Alert</button>
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

export default Alerts;