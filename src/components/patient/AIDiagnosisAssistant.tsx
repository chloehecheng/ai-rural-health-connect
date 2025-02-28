import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, ArrowRight, RefreshCw, AlertTriangle } from "lucide-react";
import { analyzePatientData, generateTreatmentPlan, validatePrescription } from "@/lib/ai-medical-api";
import { useToast } from "@/components/ui/use-toast";

interface PatientData {
  symptoms: string[];
  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
    height: string;
    bmi: string;
  };
  age: number;
  condition?: string;
  medications?: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
}

interface Diagnosis {
  condition: string;
  confidence: number;
  details: string;
  symptoms: string[];
  risk_factors: string[];
}

interface TreatmentPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  steps: string[];
  lifestyle_changes: string[];
  follow_up: string;
  notes?: string;
}

interface Prescription {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  contraindications?: string[];
  side_effects?: string[];
  alternatives?: Array<{
    name: string;
    reason: string;
  }>;
  aiAnalysis?: {
    interactionRisk: 'low' | 'moderate' | 'high';
    interactionDetails: string[];
    recommendations: string[];
    safetyScore: number;
  };
}

const mockDiagnoses: Diagnosis[] = [
  {
    condition: "Type 2 Diabetes",
    confidence: 0.89,
    details: "Based on elevated blood glucose levels, family history, and presenting symptoms. Patient shows classic signs of Type 2 Diabetes with multiple risk factors.",
    symptoms: [
      "Increased thirst",
      "Frequent urination",
      "Unexplained weight loss",
      "Fatigue",
      "Blurred vision",
      "Slow-healing sores"
    ],
    risk_factors: [
      "Age > 45",
      "BMI > 25",
      "Family history",
      "Sedentary lifestyle",
      "High blood pressure"
    ]
  },
  {
    condition: "Hypertension",
    confidence: 0.75,
    details: "Consistently elevated blood pressure readings over multiple visits. Patient exhibits several risk factors and symptoms consistent with hypertension.",
    symptoms: [
      "Headaches",
      "Shortness of breath",
      "Chest pain",
      "Dizziness",
      "Visual changes"
    ],
    risk_factors: [
      "Age",
      "Obesity",
      "Family history",
      "High sodium diet",
      "Stress"
    ]
  },
  {
    condition: "Metabolic Syndrome",
    confidence: 0.68,
    details: "Multiple related conditions present including high blood pressure, high blood sugar, and obesity. This combination suggests metabolic syndrome.",
    symptoms: [
      "Central obesity",
      "High blood pressure",
      "High blood sugar",
      "Fatigue",
      "Increased thirst"
    ],
    risk_factors: [
      "Obesity",
      "Sedentary lifestyle",
      "Poor diet",
      "Family history",
      "Age"
    ]
  }
];

const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: "t1",
    name: "Comprehensive Diabetes Management",
    description: "A holistic approach combining medication, lifestyle changes, and monitoring for effective diabetes management",
    duration: "Initial 3 months, then ongoing",
    steps: [
      "Daily blood glucose monitoring",
      "Regular exercise routine - 30 minutes, 5 days per week",
      "Dietary modifications - low carb, high fiber",
      "Regular check-ups every 3 months",
      "HbA1c testing every 3 months",
      "Annual eye examination",
      "Regular foot examinations"
    ],
    lifestyle_changes: [
      "Reduce carbohydrate intake to 45-60g per meal",
      "30 minutes daily moderate exercise",
      "Regular sleep schedule - 7-8 hours per night",
      "Stress management techniques",
      "Regular blood sugar monitoring",
      "Weight management program"
    ],
    follow_up: "Monthly check-ups for the first 3 months, then quarterly"
  },
  {
    id: "t2",
    name: "Intensive Lifestyle Modification",
    description: "Focus on lifestyle changes and preventive measures before starting medication",
    duration: "6 months initial program",
    steps: [
      "Weekly dietary counseling",
      "Supervised exercise program",
      "Stress management workshops",
      "Regular blood sugar monitoring",
      "Monthly progress evaluations",
      "Support group participation"
    ],
    lifestyle_changes: [
      "Mediterranean diet adoption",
      "Daily 45-minute exercise routine",
      "Stress reduction techniques",
      "Sleep hygiene improvement",
      "Social support group participation"
    ],
    follow_up: "Bi-weekly for first month, then monthly"
  },
  {
    id: "t3",
    name: "Medication-First Approach",
    description: "Immediate medication intervention with supporting lifestyle changes",
    duration: "Ongoing with quarterly evaluation",
    steps: [
      "Start medication regimen",
      "Weekly blood sugar monitoring",
      "Monthly medication review",
      "Dietary guidelines",
      "Exercise recommendations"
    ],
    lifestyle_changes: [
      "Moderate carbohydrate restriction",
      "Light daily exercise",
      "Regular medication schedule",
      "Blood sugar monitoring routine"
    ],
    follow_up: "Monthly for first 3 months, then quarterly"
  }
];

const mockPrescriptions: Prescription[] = [
  {
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily with meals",
    duration: "3 months initial prescription",
    contraindications: [
      "Severe kidney disease",
      "Liver disease",
      "Heart failure",
      "Alcohol abuse"
    ],
    side_effects: [
      "Nausea",
      "Diarrhea",
      "Loss of appetite",
      "Stomach pain",
      "Lactic acidosis (rare but serious)"
    ],
    alternatives: [
      {
        name: "Sulfonylureas",
        reason: "If metformin is not tolerated or contraindicated"
      },
      {
        name: "DPP-4 inhibitors",
        reason: "For patients at risk of hypoglycemia"
      }
    ],
    aiAnalysis: {
      interactionRisk: "low",
      interactionDetails: [
        "No significant interactions with current medications",
        "Safe to use with Lisinopril",
        "Monitor blood sugar levels more frequently initially"
      ],
      recommendations: [
        "Start with low dose and titrate up",
        "Take with meals to minimize GI side effects",
        "Regular kidney function monitoring recommended"
      ],
      safetyScore: 0.92
    }
  },
  {
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "3 months initial prescription",
    contraindications: [
      "Pregnancy",
      "History of angioedema",
      "Bilateral renal artery stenosis"
    ],
    side_effects: [
      "Dry cough",
      "Dizziness",
      "Headache",
      "High potassium levels"
    ],
    alternatives: [
      {
        name: "Losartan",
        reason: "If ACE inhibitor cough develops"
      },
      {
        name: "Amlodipine",
        reason: "For patients who need additional BP lowering"
      }
    ],
    aiAnalysis: {
      interactionRisk: "moderate",
      interactionDetails: [
        "Potential interaction with NSAIDs",
        "May enhance blood pressure lowering effects",
        "Monitor potassium levels with other medications"
      ],
      recommendations: [
        "Monitor blood pressure closely",
        "Check kidney function and potassium regularly",
        "Consider lower initial dose if on diuretics"
      ],
      safetyScore: 0.85
    }
  }
];

export const AIDiagnosisAssistant = ({ 
  patientData,
  onDiagnosisSelect 
}: { 
  patientData: PatientData;
  onDiagnosisSelect: (diagnosis: { condition: string; confidence: number }) => void;
}) => {
  const [step, setStep] = useState<'diagnosis' | 'treatment' | 'prescription' | 'summary'>('diagnosis');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentPlan | null>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [diagnosesLoaded, setDiagnosesLoaded] = useState(false);
  const [showingAlternatives, setShowingAlternatives] = useState<string | null>(null);
  const [treatmentNotes, setTreatmentNotes] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const analyzeDiagnosis = () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setDiagnosesLoaded(true);
    }, 1500);
  };

  const handleDiagnosisSelect = (diagnosis: Diagnosis) => {
    setSelectedDiagnosis(diagnosis);
    onDiagnosisSelect({ condition: diagnosis.condition, confidence: diagnosis.confidence });
    setStep('treatment');
  };

  const handleTreatmentSelect = (treatment: TreatmentPlan) => {
    setSelectedTreatment(treatment);
    setStep('prescription');
  };

  const handlePrescriptionSelect = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setShowConfirmation(true);
  };

  const handleConfirmTreatment = () => {
    setStep('summary');
  };

  const handleBack = () => {
    switch (step) {
      case 'treatment':
        setStep('diagnosis');
        break;
      case 'prescription':
        setStep('treatment');
        break;
      case 'summary':
        setStep('prescription');
        break;
    }
  };

  const handleStartOver = () => {
    setStep('diagnosis');
    setSelectedDiagnosis(null);
    setSelectedTreatment(null);
    setSelectedPrescription(null);
    setDiagnosesLoaded(false);
  };

  return (
    <div className="space-y-6">
      <Tabs value={step} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger 
            value="diagnosis" 
            disabled={step !== 'diagnosis'}
            className="data-[state=active]:bg-blue-100"
          >
            1. Diagnosis
          </TabsTrigger>
          <TabsTrigger 
            value="treatment" 
            disabled={step !== 'treatment'}
            className="data-[state=active]:bg-blue-100"
          >
            2. Treatment Plan
          </TabsTrigger>
          <TabsTrigger 
            value="prescription" 
            disabled={step !== 'prescription'}
            className="data-[state=active]:bg-blue-100"
          >
            3. Prescription
          </TabsTrigger>
          <TabsTrigger 
            value="summary" 
            disabled={step !== 'summary'}
            className="data-[state=active]:bg-blue-100"
          >
            4. Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="diagnosis" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">AI Diagnosis Analysis</h3>
              {!diagnosesLoaded && (
                <Button
                  onClick={analyzeDiagnosis}
                  disabled={isAnalyzing}
                  variant="outline"
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  {isAnalyzing ? (
                    <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                  ) : (
                    <>Analyze Patient Data</>
                  )}
                </Button>
              )}
            </div>

            <div className="grid gap-4">
              {diagnosesLoaded && mockDiagnoses.map((diagnosis, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-slate-900">{diagnosis.condition}</h4>
                      <p className="text-sm text-slate-600 mt-1">{diagnosis.details}</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {Math.round(diagnosis.confidence * 100)}% confidence
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="text-sm font-medium text-slate-700 mb-2">Matching Symptoms</h5>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {diagnosis.symptoms.map((symptom, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-slate-700 mb-2">Risk Factors</h5>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {diagnosis.risk_factors.map((factor, i) => (
                          <li key={i} className="flex items-center">
                            <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleDiagnosisSelect(diagnosis)}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Select Diagnosis <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              ))}
              
              {!isAnalyzing && !diagnosesLoaded && (
                <div className="text-center py-8 text-slate-500">
                  Click "Analyze Patient Data" to start AI diagnosis
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="treatment" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  size="sm"
                  className="h-8"
                >
                  ← Back
                </Button>
                <h3 className="text-lg font-medium">AI Treatment Planning</h3>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                For: {selectedDiagnosis?.condition}
              </Badge>
            </div>

            <div className="grid gap-4">
              {mockTreatmentPlans.map((plan, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="mb-4">
                    <h4 className="text-lg font-medium text-slate-900">{plan.name}</h4>
                    <p className="text-sm text-slate-600 mt-1">{plan.description}</p>
                    <div className="flex items-center mt-2">
                      <Badge variant="outline" className="mr-2">Duration: {plan.duration}</Badge>
                      <Badge variant="outline">Follow-up: {plan.follow_up}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="text-sm font-medium text-slate-700 mb-2">Treatment Steps</h5>
                      <ul className="text-sm text-slate-600 space-y-2">
                        {plan.steps.map((step, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-slate-700 mb-2">Lifestyle Changes</h5>
                      <ul className="text-sm text-slate-600 space-y-2">
                        {plan.lifestyle_changes.map((change, i) => (
                          <li key={i} className="flex items-center">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2" />
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-slate-700 mb-2">Doctor's Notes</h5>
                    <textarea
                      className="w-full p-2 border rounded-md text-sm text-slate-600"
                      rows={3}
                      placeholder="Add any additional notes about this treatment plan..."
                      value={treatmentNotes[plan.id] || ''}
                      onChange={(e) => setTreatmentNotes(prev => ({
                        ...prev,
                        [plan.id]: e.target.value
                      }))}
                    />
                  </div>

                  <Button
                    onClick={() => {
                      const updatedPlan = {
                        ...plan,
                        notes: treatmentNotes[plan.id] || ''
                      };
                      handleTreatmentSelect(updatedPlan);
                    }}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Select Treatment Plan <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              ))}
              
              {mockTreatmentPlans.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  Select a diagnosis to view treatment plans
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="prescription" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  size="sm"
                  className="h-8"
                >
                  ← Back
                </Button>
                <h3 className="text-lg font-medium">AI Prescription Management</h3>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {selectedDiagnosis?.condition}
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {selectedTreatment?.name}
                </Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {mockPrescriptions.map((prescription, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-slate-900">{prescription.name}</h4>
                        <p className="text-sm text-slate-600 mt-1">{prescription.dosage} - {prescription.frequency}</p>
                      </div>
                      <Badge variant="outline">Duration: {prescription.duration}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="text-sm font-medium text-slate-700 mb-2">Contraindications</h5>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {prescription.contraindications?.map((item, i) => (
                          <li key={i} className="flex items-center">
                            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-slate-700 mb-2">Side Effects</h5>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {prescription.side_effects?.map((effect, i) => (
                          <li key={i} className="flex items-center">
                            <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                            {effect}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {prescription.aiAnalysis && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-slate-700 mb-2">AI Interaction Analysis</h5>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Badge 
                            variant={prescription.aiAnalysis.interactionRisk === "low" ? "outline" : "destructive"} 
                            className="mr-2"
                          >
                            Interaction Risk: {prescription.aiAnalysis.interactionRisk}
                          </Badge>
                          <Badge variant="outline">
                            Safety Score: {prescription.aiAnalysis.safetyScore}
                          </Badge>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-slate-700 mb-1">Interaction Details:</h6>
                          <ul className="text-sm text-slate-600 space-y-1">
                            {prescription.aiAnalysis.interactionDetails.map((detail, i) => (
                              <li key={i}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-slate-700 mb-1">Recommendations:</h6>
                          <ul className="text-sm text-slate-600 space-y-1">
                            {prescription.aiAnalysis.recommendations.map((rec, i) => (
                              <li key={i}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {showingAlternatives === prescription.name && prescription.alternatives && (
                    <div className="mb-4 mt-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <h5 className="text-sm font-medium text-slate-700 mb-3">Alternative Options</h5>
                      <div className="space-y-3">
                        {prescription.alternatives.map((alt, index) => (
                          <div key={index} className="p-3 bg-white rounded-md shadow-sm">
                            <h6 className="font-medium text-blue-600">{alt.name}</h6>
                            <p className="text-sm text-slate-600 mt-1">{alt.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Button
                      className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => handlePrescriptionSelect(prescription)}
                    >
                      Prescribe Medication
                    </Button>
                    {prescription.alternatives && (
                      <Button
                        variant="outline"
                        onClick={() => setShowingAlternatives(
                          showingAlternatives === prescription.name ? null : prescription.name
                        )}
                      >
                        {showingAlternatives === prescription.name ? 'Hide' : 'View'} Alternatives
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
              
              {mockPrescriptions.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  Select a treatment plan to view prescriptions
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="mt-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  size="sm"
                  className="h-8"
                >
                  ← Back
                </Button>
                <h3 className="text-xl font-semibold">Treatment Summary</h3>
              </div>
            </div>
            
            {selectedDiagnosis && (
              <div className="mb-6">
                <h4 className="text-lg font-medium text-slate-900">Selected Diagnosis</h4>
                <div className="mt-2 p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{selectedDiagnosis.condition}</p>
                      <p className="text-sm text-slate-600 mt-1">{selectedDiagnosis.details}</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">
                      {Math.round(selectedDiagnosis.confidence * 100)}% confidence
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {selectedTreatment && (
              <div className="mb-6">
                <h4 className="text-lg font-medium text-slate-900">Selected Treatment Plan</h4>
                <div className="mt-2 p-4 bg-green-50 rounded-lg">
                  <p className="font-medium">{selectedTreatment.name}</p>
                  <p className="text-sm text-slate-600 mt-1">{selectedTreatment.description}</p>
                  <div className="mt-2">
                    <Badge variant="outline" className="mr-2">Duration: {selectedTreatment.duration}</Badge>
                    <Badge variant="outline">Follow-up: {selectedTreatment.follow_up}</Badge>
                  </div>
                  {selectedTreatment.notes && (
                    <div className="mt-4 p-3 bg-white rounded-md">
                      <h5 className="text-sm font-medium text-slate-700 mb-2">Doctor's Notes</h5>
                      <p className="text-sm text-slate-600">{selectedTreatment.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedPrescription && (
              <div className="mb-6">
                <h4 className="text-lg font-medium text-slate-900">Selected Prescription</h4>
                <div className="mt-2 p-4 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{selectedPrescription.name}</p>
                      <p className="text-sm text-slate-600 mt-1">
                        {selectedPrescription.dosage} - {selectedPrescription.frequency}
                      </p>
                    </div>
                    <Badge variant="outline">Duration: {selectedPrescription.duration}</Badge>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleStartOver}
                variant="outline"
                className="flex-1"
              >
                Start New Analysis
              </Button>
              <Button
                className="flex-1 bg-green-600 text-white hover:bg-green-700"
                onClick={() => {
                  // Here you would typically save the treatment plan to the patient's record
                  toast({
                    title: "Treatment Plan Saved",
                    description: "Successfully saved the treatment plan for the patient.",
                    duration: 3000,
                  });
                }}
              >
                Save Treatment Plan
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-[500px] p-6">
            <h3 className="text-lg font-medium mb-4">Confirm Treatment Plan</h3>
            <p className="text-slate-600 mb-4">
              Are you sure you want to proceed with this treatment plan? Please review the details below:
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-medium">Diagnosis</h4>
                <p className="text-sm text-slate-600">{selectedDiagnosis?.condition}</p>
              </div>
              <div>
                <h4 className="font-medium">Treatment Plan</h4>
                <p className="text-sm text-slate-600">{selectedTreatment?.name}</p>
              </div>
              <div>
                <h4 className="font-medium">Prescription</h4>
                <p className="text-sm text-slate-600">
                  {selectedPrescription?.name} - {selectedPrescription?.dosage} {selectedPrescription?.frequency}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConfirmation(false)}
              >
                Review Again
              </Button>
              <Button
                className="flex-1 bg-green-600 text-white hover:bg-green-700"
                onClick={() => {
                  setShowConfirmation(false);
                  handleConfirmTreatment();
                }}
              >
                Confirm & Continue
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
