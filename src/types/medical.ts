export interface Diagnosis {
  condition: string;
  confidence: number;
  details: string;
  symptoms: string[];
  risk_factors: string[];
}

export interface TreatmentPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  steps: string[];
  lifestyle_changes: string[];
  follow_up: string;
}

export interface Prescription {
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
}
