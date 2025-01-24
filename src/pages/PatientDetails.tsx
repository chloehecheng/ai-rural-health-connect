import { useParams } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockBloodSugarData = [
  { date: "Mon", level: 120 },
  { date: "Tue", level: 115 },
  { date: "Wed", level: 125 },
  { date: "Thu", level: 118 },
  { date: "Fri", level: 122 },
  { date: "Sat", level: 116 },
  { date: "Sun", level: 119 },
];

const PatientDetails = () => {
  const { id } = useParams();

  // Mock patient data - in a real app, this would be fetched from an API
  const patientData = {
    id,
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
              <LineChart data={mockBloodSugarData}>
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