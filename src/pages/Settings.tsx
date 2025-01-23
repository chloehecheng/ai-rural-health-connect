import { Header } from "@/components/Layout/Header";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Home, Users, FileText, Bell, Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
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
                <SidebarMenuButton asChild>
                  <a href="/" className="flex items-center">
                    <Home className="mr-2" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/patients" className="flex items-center">
                    <Users className="mr-2" />
                    <span>Patients</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/records" className="flex items-center">
                    <FileText className="mr-2" />
                    <span>Records</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/alerts" className="flex items-center">
                    <Bell className="mr-2" />
                    <span>Alerts</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/settings" className="flex items-center">
                    <SettingsIcon className="mr-2" />
                    <span>Settings</span>
                  </a>
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