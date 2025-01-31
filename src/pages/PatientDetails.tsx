import { useParams } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for different patients
const mockPatients = {
  "1": {
    name: "John Doe",
    age: 45,
    condition: "Diabetes Type 2",
    nextAppointment: "2024-03-01",
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "twice daily" },
      { name: "Lisinopril", dosage: "10mg", frequency: "once daily" },
    ],
    vitals: {
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      temperature: "98.6°F",
    },
    bloodSugarData: [
      { date: "Mon", level: 120 },
      { date: "Tue", level: 115 },
      { date: "Wed", level: 125 },
      { date: "Thu", level: 118 },
      { date: "Fri", level: 122 },
      { date: "Sat", level: 116 },
      { date: "Sun", level: 119 },
    ]
  },
  "2": {
    name: "Jane Smith",
    age: 38,
    condition: "Asthma",
    nextAppointment: "2024-03-03",
    medications: [
      { name: "Albuterol", dosage: "90mcg", frequency: "as needed" },
      { name: "Fluticasone", dosage: "250mcg", frequency: "twice daily" },
    ],
    vitals: {
      bloodPressure: "118/75",
      heartRate: "68 bpm",
      temperature: "98.4°F",
    },
    bloodSugarData: [
      { date: "Mon", level: 95 },
      { date: "Tue", level: 98 },
      { date: "Wed", level: 92 },
      { date: "Thu", level: 96 },
      { date: "Fri", level: 94 },
      { date: "Sat", level: 97 },
      { date: "Sun", level: 95 },
    ]
  },
  "3": {
    name: "Mike Johnson",
    age: 52,
    condition: "Hypertension",
    nextAppointment: "2024-03-05",
    medications: [
      { name: "Amlodipine", dosage: "5mg", frequency: "once daily" },
      { name: "Hydrochlorothiazide", dosage: "25mg", frequency: "once daily" },
    ],
    vitals: {
      bloodPressure: "135/85",
      heartRate: "75 bpm",
      temperature: "98.8°F",
    },
    bloodSugarData: [
      { date: "Mon", level: 105 },
      { date: "Tue", level: 108 },
      { date: "Wed", level: 102 },
      { date: "Thu", level: 106 },
      { date: "Fri", level: 104 },
      { date: "Sat", level: 107 },
      { date: "Sun", level: 105 },
    ]
  }
};

const PatientDetails = () => {
  const { id } = useParams();
  
  // Get patient data based on ID, fallback to a default if ID not found
  const patientData = id && mockPatients[id as keyof typeof mockPatients] 
    ? mockPatients[id as keyof typeof mockPatients]
    : {
        name: "Patient Not Found",
        age: 0,
        condition: "N/A",
        nextAppointment: "N/A",
        medications: [],
        vitals: {
          bloodPressure: "N/A",
          heartRate: "N/A",
          temperature: "N/A",
        },
        bloodSugarData: []
      };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-8">
        <h1 className="text-2xl font-bold mb-6">{patientData.name}'s Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard title="Patient Information">
            <div className="space-y-2">
              <p><span className="font-medium">Age:</span> {patientData.age}</p>
              <p><span className="font-medium">Condition:</span> {patientData.condition}</p>
              <p><span className="font-medium">Next Appointment:</span> {patientData.nextAppointment}</p>
            </div>
          </DashboardCard>

          <DashboardCard title="Current Medications">
            <ul className="space-y-2">
              {patientData.medications.map((med, index) => (
                <li key={index} className="p-2 bg-primary/5 rounded">
                  <p className="font-medium">{med.name}</p>
                  <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                </li>
              ))}
            </ul>
          </DashboardCard>

          <DashboardCard title="Vital Signs">
            <div className="space-y-2">
              <p><span className="font-medium">Blood Pressure:</span> {patientData.vitals.bloodPressure}</p>
              <p><span className="font-medium">Heart Rate:</span> {patientData.vitals.heartRate}</p>
              <p><span className="font-medium">Temperature:</span> {patientData.vitals.temperature}</p>
            </div>
          </DashboardCard>
        </div>

        <DashboardCard title="Blood Sugar Levels">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patientData.bloodSugarData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="level"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </main>
    </div>
  );
};

export default PatientDetails;