import { Header } from "@/components/Layout/Header";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { AIAssistant } from "@/components/Dashboard/AIAssistant";
import { Calendar, Users, Activity, Clock, Home, FileText, Bell, Settings } from "lucide-react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const Index = () => {
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
                    <Settings className="mr-2" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard title="Today's Appointments">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold">8</span>
                </div>
              </DashboardCard>
              
              <DashboardCard title="Active Patients">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold">124</span>
                </div>
              </DashboardCard>
              
              <DashboardCard title="Patient Alerts">
                <div className="flex items-center space-x-2">
                  <Activity className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold">3</span>
                </div>
              </DashboardCard>
              
              <DashboardCard title="Avg. Wait Time">
                <div className="flex items-center space-x-2">
                  <Clock className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold">12m</span>
                </div>
              </DashboardCard>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DashboardCard title="AI Documentation Assistant">
                <AIAssistant />
              </DashboardCard>
              
              <DashboardCard title="Upcoming Appointments">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <div>
                        <p className="font-medium">John Miller</p>
                        <p className="text-sm text-gray-600">Diabetes Check-up</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">2:30 PM</p>
                        <p className="text-sm text-gray-600">Today</p>
                      </div>
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

export default Index;