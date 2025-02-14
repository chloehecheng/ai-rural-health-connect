import { useEffect, useState } from "react";
import { fetchUpcomingAppointments, cancelAppointment } from "@/api/appointments";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Appointment } from "../../types/types";

interface UpcomingAppointmentsProps {
  patientId: number;
}

export const UpcomingAppointments = ({ patientId }: {patientId: number, appointments: Appointment[] }) => {
 const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      const data = await fetchUpcomingAppointments(patientId);
      setAppointments(data);
      setLoading(false);
    };

    loadAppointments();
  }, [patientId]);

  //This needs more error handling
  const handleCancel = async (appointmentId: number) => {
    const success = await cancelAppointment(appointmentId);
    if (success) {
      setAppointments((prev) => prev.filter((a) => a.id !== appointmentId));
    }
  };

  return (
    <DashboardCard title="Upcoming Appointments">
      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="border-b pb-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{appointment.appointment_types?.type}</p>
                <p className="text-sm text-gray-600">
                  {appointment.appointment_date} at {appointment.appointment_time}
                </p>
                <p className="text-sm">Doctor: Dr. {appointment.doctors?.first_name} {appointment.doctors?.last_name}</p>
              </div>
              <Button onClick={() => handleCancel(appointment.id)} variant="danger">
                Cancel
              </Button>
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  );
};
