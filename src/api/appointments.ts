import { supabase } from "@/lib/supabase";
import { Appointment } from "../types/types";

// Fetch upcoming appointments
export const fetchUpcomingAppointments = async (patientId: number): Promise<Appointment[]> => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD

  const { data, error } = await supabase
    .from("appointments")
    .select("id, appointment_date, appointment_time, status, appointment_types(type), doctors(first_name, last_name)")
    .eq("patient_id", patientId)
    .gte("appointment_date", today) // Only future appointments
    .neq("status", "Cancelled") // exclude cancelled
    .order("appointment_date", { ascending: true });

  if (error) {
    console.error("Error fetching upcoming appointments:", error);
    return [];
  }

  return data as Appointment[];
};

// Cancel an appointment
export const cancelAppointment = async (appointmentId: number): Promise<boolean> => {
  const { error } = await supabase
    .from("appointments")
    .update({ status: "Cancelled" }) // Update status to "Cancelled"
    .eq("id", appointmentId)
    .select();

  if (error) {
    console.error("Error cancelling appointment:", error);
    return false;
  }

  return true;
};
