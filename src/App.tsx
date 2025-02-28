import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Patients from "./pages/Patients";
import Records from "./pages/Records";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import Login from "./pages/auth/Login";
import ProviderLogin from "./pages/auth/ProviderLogin"; // Added import statement
import PatientPortal from "./pages/patient/PatientPortal";
import PatientDetails from "./pages/PatientDetails";
import Messages from './pages/messages';
import Features from './pages/Features';
import { ScheduleAppointment } from "./pages/features/ScheduleAppointment";
import { VirtualVisit } from "./pages/features/VirtualVisit";
import { PrescriptionDelivery } from "./pages/features/PrescriptionDelivery";
import { MedicationReminders } from "./pages/features/MedicationReminders";
import { HealthRecords } from "./pages/features/HealthRecords";
import { FamilyAccess } from "./pages/features/FamilyAccess";
import { Transportation } from "./pages/features/Transportation";
import { HealthMonitoring } from "./pages/features/HealthMonitoring";
import { MessageCareTeam } from "./pages/features/MessageCareTeam";
import { MedicationManagement } from "./pages/features/MedicationManagement";
import { CareReminders } from "./pages/features/CareReminders";
import { Support } from "./pages/features/Support";
import { MeetOurDoctors } from "./pages/features/MeetOurDoctors";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <I18nextProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <Routes>
                <Route path="/" element={<Navigate to="/auth/login" replace />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/provider-login" element={<ProviderLogin />} />
                <Route path="/patient-portal" element={<PatientPortal />} />
                <Route path="/dashboard" element={<Index />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/patient/:id" element={<PatientDetails />} />
                <Route path="/records" element={<Records />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/settings" element={<Settings />} />
                
                {/* Feature Routes */}
                <Route path="/features" element={<Features />} />
                <Route path="/features/schedule-appointment" element={<ScheduleAppointment />} />
                <Route path="/features/virtual-visit" element={<VirtualVisit />} />
                <Route path="/features/prescription-delivery" element={<PrescriptionDelivery />} />
                <Route path="/features/medication-reminders" element={<MedicationReminders />} />
                <Route path="/features/health-records" element={<HealthRecords />} />
                <Route path="/features/family-access" element={<FamilyAccess />} />
                <Route path="/features/transportation" element={<Transportation />} />
                <Route path="/features/health-monitoring" element={<HealthMonitoring />} />
                <Route path="/features/message-care-team" element={<MessageCareTeam />} />
                <Route path="/features/medication-management" element={<MedicationManagement />} />
                <Route path="/features/care-reminders" element={<CareReminders />} />
                <Route path="/features/meet-our-doctors" element={<MeetOurDoctors />} />
                <Route path="/features/support" element={<Support />} />
              </Routes>
              <Toaster />
              <Sonner />
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </I18nextProvider>
);

export default App;
