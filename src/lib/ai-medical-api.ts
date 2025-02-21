import { Diagnosis, TreatmentPlan, Prescription } from '@/types/medical';

// OpenAI API configuration
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface PatientAnalysisInput {
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
  medications?: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
}

interface TreatmentPlanInput {
  diagnosis: string;
  patientAge: number;
  currentMedications: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
}

interface PrescriptionValidationInput {
  diagnosis: string;
  treatmentPlan: string;
  currentMedications: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
}

/**
 * Analyzes patient data using GPT-4 to generate potential diagnoses
 */
export async function analyzePatientData(input: PatientAnalysisInput): Promise<Diagnosis[]> {
  try {
    const prompt = `
      As a medical AI assistant, analyze the following patient data and provide potential diagnoses:
      
      Patient Information:
      - Age: ${input.age}
      - Symptoms: ${input.symptoms.join(', ')}
      - Vitals:
        * Blood Pressure: ${input.vitals.bloodPressure}
        * Heart Rate: ${input.vitals.heartRate}
        * Temperature: ${input.vitals.temperature}
        * BMI: ${input.vitals.bmi}
      ${input.medications ? `- Current Medications: ${input.medications.map(m => `${m.name} ${m.dosage} ${m.frequency}`).join(', ')}` : ''}
      
      Please provide a list of potential diagnoses with:
      1. Condition name
      2. Confidence level (0-1)
      3. Supporting details
      4. Matching symptoms
      5. Risk factors
      
      Format as JSON array.
    `;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a highly skilled medical AI assistant trained to analyze patient data and provide diagnostic insights.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze patient data');
    }

    const result = await response.json();
    const diagnoses = JSON.parse(result.choices[0].message.content);
    return diagnoses;
  } catch (error) {
    console.error('Error analyzing patient data:', error);
    throw error;
  }
}

/**
 * Generates treatment plans based on diagnosis using GPT-4
 */
export async function generateTreatmentPlan(input: TreatmentPlanInput): Promise<TreatmentPlan[]> {
  try {
    const prompt = `
      As a medical AI assistant, generate comprehensive treatment plans for the following case:
      
      Diagnosis: ${input.diagnosis}
      Patient Age: ${input.patientAge}
      Current Medications: ${input.currentMedications.map(m => `${m.name} ${m.dosage} ${m.frequency}`).join(', ')}
      
      Please provide a list of treatment plans with:
      1. Plan name
      2. Description
      3. Duration
      4. Detailed steps
      5. Lifestyle changes
      6. Follow-up recommendations
      
      Format as JSON array.
    `;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a highly skilled medical AI assistant trained to generate comprehensive treatment plans.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate treatment plans');
    }

    const result = await response.json();
    const plans = JSON.parse(result.choices[0].message.content);
    return plans;
  } catch (error) {
    console.error('Error generating treatment plans:', error);
    throw error;
  }
}

/**
 * Validates prescriptions and checks for drug interactions using GPT-4
 */
export async function validatePrescription(input: PrescriptionValidationInput): Promise<Prescription[]> {
  try {
    const prompt = `
      As a medical AI assistant, suggest and validate prescriptions for the following case:
      
      Diagnosis: ${input.diagnosis}
      Treatment Plan: ${input.treatmentPlan}
      Current Medications: ${input.currentMedications.map(m => `${m.name} ${m.dosage} ${m.frequency}`).join(', ')}
      
      Please provide a list of prescriptions with:
      1. Medication name
      2. Recommended dosage
      3. Frequency
      4. Duration
      5. Contraindications
      6. Potential side effects
      7. Alternative options
      
      Consider drug interactions with current medications.
      Format as JSON array.
    `;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a highly skilled medical AI assistant trained to validate prescriptions and check drug interactions.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to validate prescriptions');
    }

    const result = await response.json();
    const prescriptions = JSON.parse(result.choices[0].message.content);
    return prescriptions;
  } catch (error) {
    console.error('Error validating prescriptions:', error);
    throw error;
  }
}
