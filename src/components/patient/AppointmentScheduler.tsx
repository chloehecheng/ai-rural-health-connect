
import React,  { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { addDays, format, isSameDay } from "date-fns";

export const AppointmentScheduler = ({patientId, onAppointmentScheduled }:{
  patientId: number;
  onAppointmentScheduled: () => void;
}) => {
  const [date, setDate] = React.useState<Date>();
  const [timeSlot, setTimeSlot] = React.useState<string>();
  const [doctor, setDoctor] = React.useState<string>();
  const [visitType, setVisitType] = React.useState<'in-person' | 'telemedicine'>();
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<{ id: number; name: string }[]>([]);
  const [visitTypes, setVisitTypes] = useState<{ id: number; type: string }[]>([]);


  // Simulated existing appointments
  const existingAppointments = [
    { date: new Date(2024, 2, 20), time: "10:00 AM", doctor: "Dr. Smith - General Practice" },
    { date: new Date(2024, 2, 20), time: "02:00 PM", doctor: "Dr. Johnson - Cardiology" },
  ];

  const availableDoctors = [
    "Dr. Smith - General Practice",
    "Dr. Johnson - Cardiology",
    "Dr. Williams - Pediatrics",
  ];

  // Fetch doctors from Supabase
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase.from("doctors").select("id, first_name, last_name");
      if (error) console.error("Error fetching doctors:", error);
      else setDoctors(data.map(doc => ({ id: doc.id, name: `Dr. ${doc.first_name} ${doc.last_name}` })));
    };

    const fetchVisitTypes = async () => {
      const { data, error } = await supabase.from("appointment_types").select("id, type");
      if (error) console.error("Error fetching visit types:", error);
      else setVisitTypes(data);
    };

    fetchDoctors();
    fetchVisitTypes();
  }, []);
  
  // Generate available time slots based on date and existing appointments
  const getAvailableTimeSlots = (selectedDate: Date | undefined) => {
    const baseTimeSlots = [
      "09:00 AM", "10:00 AM", "11:00 AM",
      "02:00 PM", "03:00 PM", "04:00 PM"
    ];

    if (!selectedDate) return baseTimeSlots;

    return baseTimeSlots.filter(slot => {
      const isBooked = existingAppointments.some(appointment => 
        isSameDay(appointment.date, selectedDate) && 
        appointment.time === slot &&
        (!doctor || appointment.doctor === doctor)
      );
      return !isBooked;
    });
  };

/*   const handleSchedule = () => {
    if (!date || !timeSlot || !doctor || !visitType) {
      toast({
        title: "Missing Information",
        description: "Please select a date, time, doctor, and visit type.",
        variant: "destructive",
      });
      return;
    }

    // Check for overlapping appointments
    const hasOverlap = existingAppointments.some(
      appointment => 
        isSameDay(appointment.date, date) && 
        appointment.time === timeSlot && 
        appointment.doctor === doctor
    );

    if (hasOverlap) {
      toast({
        title: "Time Slot Unavailable",
        description: "This time slot is already booked. Please select another time.",
        variant: "destructive",
      });
      return;
    } */

      const handleSchedule = async () => {
        if (!date || !timeSlot || !doctor || !visitType) {
          toast({ title: "Missing Information", description: "Please select all fields.", variant: "destructive" });
          return;
        }
    
        const formattedDate = format(date, "yyyy-MM-dd");
    
        const { error } = await supabase.from("appointments").insert([
          {
            patient_id: 1,
            doctor_id: doctor,
            appointment_type_id: visitType,
            appointment_date: formattedDate,
            appointment_time: timeSlot,
            status: "Scheduled",
          },
        ]);
    
        if (error) {
          console.error("Error scheduling appointment:", error);
          toast({ title: "Error", description: "Could not schedule appointment.", variant: "destructive" });
          return;
        }
    
        toast({
          title: "Appointment Scheduled",
          description: `Your appointment has been scheduled for ${format(date, "MMMM do, yyyy")} at ${timeSlot}.`,
        });

    // Schedule the appointment
    toast({
      title: "Appointment Scheduled",
      description: `Your ${visitType} appointment has been scheduled for ${format(date, 'MMMM do, yyyy')} at ${timeSlot} with ${doctor}.`,
    });

    onAppointmentScheduled();

    // Simulate sending automated reminders
    const reminderDate = addDays(date, -1);
    console.log(`Reminder scheduled for: ${format(reminderDate, 'MMMM do, yyyy')}`);

    // Reset form
    setDate(undefined);
    setTimeSlot(undefined);
    setDoctor(undefined);
    setVisitType(undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule New Appointment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Visit Type</label>
          <Select onValueChange={(value) => setVisitType(Number(value))} value={visitType?.toString()}>
            <SelectTrigger>
              <SelectValue placeholder="Select visit type" />
            </SelectTrigger>
            <SelectContent>
              {visitTypes.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>{type.type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Date</label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(date) => 
              date < new Date() || 
              date.getDay() === 0 || 
              date.getDay() === 6
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Doctor</label>
          <Select onValueChange={(value) => setDoctor(Number(value))} value={doctor?.toString()}>
            <SelectTrigger><SelectValue placeholder="Select doctor" /></SelectTrigger>
            <SelectContent>
              {doctors.map((doc) => (
                <SelectItem key={doc.id} value={doc.id.toString()}>{doc.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Time</label>
          <Select 
            onValueChange={setTimeSlot} 
            value={timeSlot}
            disabled={!date}
          >
            <SelectTrigger>
              <SelectValue placeholder={date ? "Select time slot" : "Please select a date first"} />
            </SelectTrigger>
            <SelectContent>
              {getAvailableTimeSlots(date).map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleSchedule} 
          className="w-full"
          disabled={!date || !timeSlot || !doctor || !visitType}
        >
          Schedule Appointment
        </Button>
      </CardContent>
    </Card>
  );
};
