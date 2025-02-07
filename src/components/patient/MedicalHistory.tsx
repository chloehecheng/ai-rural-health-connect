import React, { useState } from "react";
import { format } from "date-fns";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";

// Mock data - would be replaced with real data from an API
const mockMedicalHistory = [
  {
    id: 1,
    date: new Date("2024-01-15"),
    doctorName: "Dr. Sarah Johnson",
    visitType: "Regular Checkup",
    notes: "Patient reports feeling well. Blood pressure slightly elevated. Recommended lifestyle changes and follow-up in 3 months.",
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        duration: "3 months",
        instructions: "Take once daily with food",
      },
    ],
  },
  {
    id: 2,
    date: new Date("2023-12-01"),
    doctorName: "Dr. Michael Chen",
    visitType: "Specialist Consultation",
    notes: "Reviewed recent lab results. Glucose levels stable. Continuing current treatment plan with minor adjustments.",
    medications: [
      {
        name: "Metformin",
        dosage: "500mg",
        duration: "6 months",
        instructions: "Take twice daily with meals",
      },
    ],
  },
];

export const MedicalHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = mockMedicalHistory.filter(
    (record) =>
      record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.visitType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      format(record.date, "MMM dd, yyyy")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <br />
      <DashboardCard title="Medical History">
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medical records..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Accordion type="single" collapsible className="w-full">
          {filteredHistory.map((record) => (
            <AccordionItem key={record.id} value={record.id.toString()}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium">
                    {format(record.date, "MMM dd, yyyy")} - {record.visitType}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {record.doctorName}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Visit Notes</h4>
                    <p className="text-sm text-muted-foreground">
                      {record.notes}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Prescribed Medications</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Medication</TableHead>
                          <TableHead>Dosage</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Instructions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {record.medications.map((medication, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {medication.name}
                            </TableCell>
                            <TableCell>{medication.dosage}</TableCell>
                            <TableCell>{medication.duration}</TableCell>
                            <TableCell>{medication.instructions}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </DashboardCard>
    </div>
  );
};