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

export const AppointmentScheduler = () => {
  const [date, setDate] = React.useState<Date>();
  const [timeSlot, setTimeSlot] = React.useState<string>();
  const [doctor, setDoctor] = React.useState<string>();
  const { toast } = useToast();

  const availableTimeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const availableDoctors = [
    "Dr. Smith - General Practice",
    "Dr. Johnson - Cardiology",
    "Dr. Williams - Pediatrics",
  ];

  const handleSchedule = () => {
    if (!date || !timeSlot || !doctor) {
      toast({
        title: "Missing Information",
        description: "Please select a date, time, and doctor.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Scheduled",
      description: `Your appointment has been scheduled for ${date.toLocaleDateString()} at ${timeSlot} with ${doctor}.`,
    });
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
            disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Time</label>
          <Select onValueChange={setTimeSlot}>
            <SelectTrigger>
              <SelectValue placeholder="Select time slot" />
            </SelectTrigger>
            <SelectContent>
              {availableTimeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Doctor</label>
          <Select onValueChange={setDoctor}>
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