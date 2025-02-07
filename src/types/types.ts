export interface Patient {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string; // YYYY-MM-DD format
    created_at?: string;
  }
  
  export interface Doctor {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    specialty_id: number;
    created_at?: string;
  }
  
/*   export interface Appointment {
    id: number;
    patient_id: number;
    doctor_id: number;
    appointment_type_id: number;
    appointment_date: string;
    appointment_time: string;
    status: "Scheduled" | "Completed" | "Cancelled";
    created_at?: string;
  } */

  export interface Appointment {
    id: number;
    patient_id: number;
    doctor_id: number;
    appointment_type_id: number;
    appointment_date: string;
    appointment_time: string;
    status: "Scheduled" | "Completed" | "Cancelled";
    appointment_types?: { type: string }; // Related appointment type
    doctors?: { first_name: string; last_name: string }; // Related doctor
  }
  
  
  export interface Availability {
    id: number;
    doctor_id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
  }
  