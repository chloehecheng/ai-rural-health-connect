import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { AIDiagnosisAssistant } from "@/components/patient/AIDiagnosisAssistant";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  FileText, 
  Users, 
  Bell, 
  Settings, 
  LogOut 
} from "lucide-react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar";

// Mock data for different patients
const mockPatients = {
  "1": {
    name: "John Doe",
    age: 45,
    gender: "Male",
    dateOfBirth: "1979-05-15",
    condition: "Diabetes Type 2",
    nextAppointment: "2024-03-01",
    symptoms: [
      "Increased thirst",
      "Frequent urination",
      "Unexplained weight loss",
      "Fatigue",
      "Blurred vision"
    ],
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "twice daily" },
      { name: "Lisinopril", dosage: "10mg", frequency: "once daily" },
    ],
    vitals: {
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      weight: "180 lbs",
      height: "5'10\"",
      bmi: "25.8"
    },
    allergies: ["Penicillin"],
    immunizations: [
      { name: "Flu Shot", date: "2023-10-15" },
      { name: "COVID-19", date: "2023-05-20" },
      { name: "Tdap", date: "2022-03-10" }
    ],
    medicalHistory: [
      "Type 2 Diabetes diagnosed 2020",
      "Hypertension diagnosed 2019",
      "Appendectomy 2010"
    ]
  },
  "2": {
    name: "Jane Smith",
    age: 38,
    gender: "Female",
    dateOfBirth: "1985-02-12",
    condition: "Asthma",
    nextAppointment: "2024-03-03",
    symptoms: [
      "Wheezing",
      "Shortness of breath",
      "Chest tightness",
      "Coughing at night"
    ],
    medications: [
      { name: "Albuterol", dosage: "90mcg", frequency: "as needed" },
      { name: "Fluticasone", dosage: "250mcg", frequency: "twice daily" },
    ],
    vitals: {
      bloodPressure: "118/75",
      heartRate: "68 bpm",
      temperature: "98.4°F",
      weight: "140 lbs",
      height: "5'6\"",
      bmi: "22.5"
    },
    allergies: ["Sulfa"],
    immunizations: [
      { name: "Flu Shot", date: "2023-10-15" },
      { name: "COVID-19", date: "2023-05-20" },
      { name: "Tdap", date: "2022-03-10" }
    ],
    medicalHistory: [
      "Asthma diagnosed 2015",
      "Allergic Rhinitis diagnosed 2010"
    ]
  },
  "3": {
    name: "Mike Johnson",
    age: 52,
    gender: "Male",
    dateOfBirth: "1972-08-25",
    condition: "Hypertension",
    nextAppointment: "2024-03-05",
    symptoms: [
      "Headaches",
      "Shortness of breath",
      "Chest pain",
      "Dizziness"
    ],
    medications: [
      { name: "Amlodipine", dosage: "5mg", frequency: "once daily" },
      { name: "Hydrochlorothiazide", dosage: "25mg", frequency: "once daily" },
    ],
    vitals: {
      bloodPressure: "135/85",
      heartRate: "75 bpm",
      temperature: "98.8°F",
      weight: "200 lbs",
      height: "6'1\"",
      bmi: "27.5"
    },
    allergies: ["Penicillin"],
    immunizations: [
      { name: "Flu Shot", date: "2023-10-15" },
      { name: "COVID-19", date: "2023-05-20" },
      { name: "Tdap", date: "2022-03-10" }
    ],
    medicalHistory: [
      "Hypertension diagnosed 2018",
      "Hyperlipidemia diagnosed 2015"
    ]
  }
};

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<any>(null);
  
  const patientData = id && mockPatients[id as keyof typeof mockPatients] 
    ? mockPatients[id as keyof typeof mockPatients]
    : {
        name: "Patient Not Found",
        age: 0,
        gender: "N/A",
        dateOfBirth: "N/A",
        condition: "N/A",
        nextAppointment: "N/A",
        symptoms: [],
        medications: [],
        vitals: {
          bloodPressure: "N/A",
          heartRate: "N/A",
          temperature: "N/A",
          weight: "N/A",
          height: "N/A",
          bmi: "N/A"
        },
        allergies: [],
        immunizations: [],
        medicalHistory: []
      };

  const handleDiagnosisSelect = (diagnosis: any) => {
    setSelectedDiagnosis(diagnosis);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col md:flex-row w-full bg-gray-50">
        <Sidebar className="md:w-64 w-full">
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">Provider Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center"
                  onClick={() => navigate("/dashboard")}
                >
                  <FileText className="mr-2" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center"
                  onClick={() => navigate("/patients")}
                >
                  <Users className="mr-2" />
                  <span>Patients</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center"
                  onClick={() => navigate("/messages")}
                >
                  <FileText className="mr-2" />
                  <span>Messages</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center"
                  onClick={() => navigate("/records")}
                >
                  <FileText className="mr-2" />
                  <span>Records</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center"
                  onClick={() => navigate("/alerts")}
                >
                  <Bell className="mr-2" />
                  <span>Alerts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center"
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="mr-2" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center text-red-500"
                  onClick={() => navigate("/auth/login")}
                >
                  <LogOut className="mr-2" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1">
          <Header />
          <main className="container mx-auto px-4 pt-20 pb-8">
            <div className="mb-6 flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 flex items-center gap-2"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Patient Medical Record
              </h1>
              <p className="text-lg text-slate-600 mt-2 font-medium">{patientData.name} - ID #{id}</p>
            </div>

            {selectedDiagnosis && (
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl shadow-sm">
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-semibold text-blue-900">Current AI Diagnosis Suggestion</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-lg font-medium text-blue-800">{selectedDiagnosis.condition}</span>
                    <span className="px-3 py-1 bg-blue-100 rounded-full text-sm font-medium text-blue-800">
                      {Math.round(selectedDiagnosis.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-6">
              <DashboardCard title="Patient Demographics" className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <div>
                  <h3 className="text-lg font-medium mb-4 pb-2 border-b">{patientData.name}</h3>
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Age</p>
                      <p className="text-slate-900">{patientData.age}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Gender</p>
                      <p className="text-slate-900">{patientData.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">DOB</p>
                      <p className="text-slate-900">{patientData.dateOfBirth}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Next Visit</p>
                      <p className="text-slate-900">{patientData.nextAppointment}</p>
                    </div>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard title="Current Vitals" className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">BP</p>
                    <p className="text-slate-900">{patientData.vitals.bloodPressure}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">HR</p>
                    <p className="text-slate-900">{patientData.vitals.heartRate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Weight</p>
                    <p className="text-slate-900">{patientData.vitals.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Height</p>
                    <p className="text-slate-900">{patientData.vitals.height}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Temp</p>
                    <p className="text-slate-900">{patientData.vitals.temperature}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">BMI</p>
                    <p className="text-slate-900">{patientData.vitals.bmi}</p>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard title="Current Symptoms" className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <ul className="space-y-2">
                  {patientData.symptoms.map((symptom, index) => (
                    <li key={index} className="text-slate-700 py-1 px-3 bg-slate-50 rounded-md">{symptom}</li>
                  ))}
                </ul>
              </DashboardCard>

              <DashboardCard title="Current Medications" className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  {patientData.medications.map((med, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-md">
                      <p className="font-medium text-slate-900">{med.name}</p>
                      <p className="text-sm text-slate-600 mt-1">
                        {med.dosage} - {med.frequency}
                      </p>
                    </div>
                  ))}
                </div>
              </DashboardCard>

              <DashboardCard title="Allergies & Immunizations" className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Allergies</h4>
                    <ul className="space-y-2">
                      {patientData.allergies?.map((allergy, index) => (
                        <li key={index} className="text-slate-700 py-1 px-3 bg-slate-50 rounded-md">{allergy}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Recent Immunizations</h4>
                    <div className="space-y-2">
                      {patientData.immunizations?.map((immunization, index) => (
                        <div key={index} className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-md">
                          <span className="text-slate-900">{immunization.name}</span>
                          <span className="text-sm text-slate-500">{immunization.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard title="Medical History" className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <ul className="space-y-2">
                  {patientData.medicalHistory?.map((history, index) => (
                    <li key={index} className="text-slate-700 py-2 px-3 bg-slate-50 rounded-md">{history}</li>
                  ))}
                </ul>
              </DashboardCard>
            </div>

            <div className="mt-8">
              <DashboardCard title="AI Diagnosis Assistant" className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <AIDiagnosisAssistant
                  patientData={{
                    symptoms: patientData.symptoms,
                    vitals: patientData.vitals,
                    age: patientData.age,
                    condition: patientData.condition
                  }}
                  onDiagnosisSelect={handleDiagnosisSelect}
                />
              </DashboardCard>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PatientDetails;