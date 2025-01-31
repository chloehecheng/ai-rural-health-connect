import React from "react";
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

export const AppointmentScheduler = () => {
  const [date, setDate] = React.useState<Date>();
  const [timeSlot, setTimeSlot] = React.useState<string>();
  const [doctor, setDoctor] = React.useState<string>();
  const { toast } = useToast();

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

  // Generate available time slots based on date and existing appointments
  const getAvailableTimeSlots = (selectedDate: Date | undefined) => {
    const baseTimeSlots = [
      "09:00 AM", "10:00 AM", "11:00 AM",
      "02:00 PM", "03:00 PM", "04:00 PM"
    ];

    if (!selectedDate) return baseTimeSlots;

    // Filter out time slots that are already booked for the selected date
    return baseTimeSlots.filter(slot => {
      const isBooked = existingAppointments.some(appointment => 
        isSameDay(appointment.date, selectedDate) && 
        appointment.time === slot &&
        (!doctor || appointment.doctor === doctor)
      );
      return !isBooked;
    });
  };

  const handleSchedule = () => {
    if (!date || !timeSlot || !doctor) {
      toast({
        title: "Missing Information",
        description: "Please select a date, time, and doctor.",
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
    }

    // Schedule the appointment
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment has been scheduled for ${format(date, 'MMMM do, yyyy')} at ${timeSlot} with ${doctor}.`,
    });

    // Simulate sending automated reminders
    const reminderDate = addDays(date, -1);
    console.log(`Reminder scheduled for: ${format(reminderDate, 'MMMM do, yyyy')}`);

    // Reset form
    setDate(undefined);
    setTimeSlot(undefined);
    setDoctor(undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule New Appointment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <Select onValueChange={setDoctor} value={doctor}>
            <SelectTrigger>
              <SelectValue placeholder="Select doctor" />
            </SelectTrigger>
            <SelectContent>
              {availableDoctors.map((doc) => (
                <SelectItem key={doc} value={doc}>
                  {doc}
                </SelectItem>
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
          disabled={!date || !timeSlot || !doctor}
        >
          Schedule Appointment
        </Button>
      </CardContent>
    </Card>
  );
};