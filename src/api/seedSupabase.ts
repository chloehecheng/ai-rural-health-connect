import { supabase } from "../lib/supabase";
import { mockPatients, mockDoctors, mockAppointments, mockSpecialties, mockAvailability, mockAppointmentTypes } from "../data/mockData";
import dotenv from "dotenv";

dotenv.config();

// Helper function to insert data
const insertData = async (table: string, data: any[]) => {
  const { error } = await supabase.from(table).insert(data);
  if (error) {
    console.error(`Error inserting into ${table}:`, error);
  } else {
    console.log(`Successfully inserted data into ${table}`);
  }
};

// Seed function
const seedDatabase = async () => {
  console.log("Seeding Supabase database...");

  await insertData("specialties", mockSpecialties);
  await insertData("doctors", mockDoctors);
  await insertData("patients", mockPatients);
  await insertData("appointment_types", mockAppointmentTypes);
  await insertData("doctor_availability", mockAvailability);
  await insertData("appointments", mockAppointments);

  console.log("Database seeding completed.");
};

// Run the seed function
seedDatabase();
