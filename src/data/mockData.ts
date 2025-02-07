import { Patient, Doctor, Appointment, Availability } from "../types/types";

export const mockSpecialties = [
  { id: 1, name: "Cardiology" },
  { id: 2, name: "Dermatology" },
];

export const mockDoctors: Doctor[] = [
  { id: 1, first_name: "Dr. Emma", last_name: "Brown", email: "emma@example.com", phone: "555-4321", specialty_id: 1 },
  { id: 2, first_name: "Dr. John", last_name: "Williams", email: "john@example.com", phone: "555-8765", specialty_id: 2 },
];

export const mockPatients: Patient[] = [
  { id: 1, first_name: "Alice", last_name: "Johnson", email: "alice@example.com", phone: "555-1234", date_of_birth: "1990-05-20" },
  { id: 2, first_name: "Bob", last_name: "Smith", email: "bob@example.com", phone: "555-5678", date_of_birth: "1985-11-10" },
];

export const mockAppointmentTypes = [
  { id: 1, type: "In-Person" },
  { id: 2, type: "Telemedicine" },
];

export const mockAvailability: Availability[] = [
  { id: 1, doctor_id: 1, day_of_week: "Monday", start_time: "09:00", end_time: "17:00" },
  { id: 2, doctor_id: 2, day_of_week: "Wednesday", start_time: "10:00", end_time: "15:00" },
];

export const mockAppointments: Appointment[] = [
  { id: 1, patient_id: 1, doctor_id: 1, appointment_type_id: 1, appointment_date: "2025-02-10", appointment_time: "10:00", status: "Scheduled" },
  { id: 2, patient_id: 2, doctor_id: 2, appointment_type_id: 2, appointment_date: "2025-02-12", appointment_time: "15:00", status: "Scheduled" },
];
