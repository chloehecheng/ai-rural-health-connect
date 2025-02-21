import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { DashboardCard } from './DashboardCard';
import { Button } from '@/components/ui/button';
import { 
  Plus, FileText, Calendar as CalendarIcon, UserPlus, 
  Clock, Bell, ChevronRight, Stethoscope, Activity 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Patient {
  id: string;
  name: string;
  lastAppointment: string;
  condition: string;
  status: 'Active' | 'Pending' | 'Cancelled';
  avatar?: string;
  vitals?: {
    bp: string;
    temp: string;
  };
}

interface Appointment {
  id: string;
  patientName: string;
  dateTime: string;
  type: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  avatar?: string;
}

export const ProviderDashboard = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  const recentPatients: Patient[] = [
    {
      id: '1',
      name: 'John Doe',
      lastAppointment: '2024-02-20',
      condition: 'Type 2 Diabetes',
      status: 'Active',
      vitals: {
        bp: '120/80',
        temp: '98.6°F'
      }
    },
    {
      id: '2',
      name: 'Jane Smith',
      lastAppointment: '2024-02-19',
      condition: 'Hypertension',
      status: 'Active',
      vitals: {
        bp: '140/90',
        temp: '98.4°F'
      }
    },
    {
      id: '3',
      name: 'Mike Johnson',
      lastAppointment: '2024-02-18',
      condition: 'Annual Check-up',
      status: 'Pending',
      vitals: {
        bp: '118/76',
        temp: '98.8°F'
      }
    }
  ];

  const upcomingAppointments: Appointment[] = [
    {
      id: '1',
      patientName: 'John Doe',
      dateTime: '9:00 AM',
      type: 'Follow-up',
      status: 'Scheduled'
    },
    {
      id: '2',
      patientName: 'Sarah Wilson',
      dateTime: '10:30 AM',
      type: 'New Patient',
      status: 'In Progress'
    },
    {
      id: '3',
      patientName: 'Mike Johnson',
      dateTime: '2:00 PM',
      type: 'Check-up',
      status: 'Scheduled'
    }
  ];

  const quickActions = [
    { 
      icon: <UserPlus className="w-5 h-5" />, 
      label: 'New Patient',
      description: 'Register a new patient',
      action: () => {},
      color: 'bg-blue-50 text-blue-700'
    },
    { 
      icon: <CalendarIcon className="w-5 h-5" />, 
      label: 'Schedule',
      description: 'Book an appointment',
      action: () => {},
      color: 'bg-purple-50 text-purple-700'
    },
    { 
      icon: <FileText className="w-5 h-5" />, 
      label: 'Records',
      description: 'Create medical record',
      action: () => {},
      color: 'bg-green-50 text-green-700'
    },
    { 
      icon: <Bell className="w-5 h-5" />, 
      label: 'Alerts',
      description: 'View patient alerts',
      action: () => {},
      color: 'bg-orange-50 text-orange-700'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome, Dr. Smith</h1>
          <p className="text-muted-foreground">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:flex">
            <Activity className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button>
            <Stethoscope className="mr-2 h-4 w-4" />
            Start Consultation
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <DashboardCard title="Quick Actions" className="col-span-1">
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "flex items-center justify-between h-16 px-4",
                  "hover:shadow-md transition-all",
                  action.color
                )}
                onClick={action.action}
              >
                <div className="flex items-center gap-3">
                  {action.icon}
                  <div className="text-left">
                    <div className="font-medium">{action.label}</div>
                    <div className="text-xs opacity-70">{action.description}</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Button>
            ))}
          </div>
        </DashboardCard>

        {/* Calendar Widget */}
        <DashboardCard 
          title="Calendar" 
          className="col-span-1"
          action={
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Event
            </Button>
          }
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </DashboardCard>

        {/* Upcoming Appointments */}
        <DashboardCard 
          title="Today's Schedule" 
          className="col-span-1"
          action={
            <Button variant="ghost" size="sm">View All</Button>
          }
        >
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-card hover:bg-accent rounded-lg border transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    appointment.status === 'In Progress' ? 'bg-green-500' :
                    appointment.status === 'Completed' ? 'bg-blue-500' : 'bg-orange-500'
                  )} />
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {appointment.dateTime}
                      <span className="mx-2">•</span>
                      {appointment.type}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Recent Patients */}
      <DashboardCard 
        title="Recent Patients" 
        className="col-span-1"
        action={
          <Button variant="ghost" size="sm">View All Patients</Button>
        }
      >
        <div className="space-y-4">
          {recentPatients.map((patient) => (
            <div
              key={patient.id}
              className="flex items-center justify-between p-4 bg-card hover:bg-accent rounded-lg border transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">Last visit: {patient.lastAppointment}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      BP: {patient.vitals?.bp}
                    </span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      Temp: {patient.vitals?.temp}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs",
                  patient.status === 'Active' ? 'bg-green-100 text-green-800' :
                  patient.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                )}>
                  {patient.status}
                </span>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
};
