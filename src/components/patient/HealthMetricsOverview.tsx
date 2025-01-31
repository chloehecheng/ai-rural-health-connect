import React from "react";
import { HealthMetricsCard } from "./HealthMetricsCard";
import { DashboardCard } from "../Dashboard/DashboardCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const mockBloodPressureData = [
  { date: "Mon", level: 120 },
  { date: "Tue", level: 118 },
  { date: "Wed", level: 122 },
  { date: "Thu", level: 125 },
  { date: "Fri", level: 121 },
  { date: "Sat", level: 119 },
  { date: "Sun", level: 120 },
];

const mockGlucoseData = [
  { date: "Mon", level: 95 },
  { date: "Tue", level: 100 },
  { date: "Wed", level: 98 },
  { date: "Thu", level: 102 },
  { date: "Fri", level: 97 },
  { date: "Sat", level: 99 },
  { date: "Sun", level: 98 },
];

const mockHeartRateData = [
  { date: "Mon", level: 72 },
  { date: "Tue", level: 75 },
  { date: "Wed", level: 70 },
  { date: "Thu", level: 73 },
  { date: "Fri", level: 71 },
  { date: "Sat", level: 74 },
  { date: "Sun", level: 72 },
];

interface HealthMetricsOverviewProps {
  fontSize: number;
  showTooltips: boolean;
}

export const HealthMetricsOverview = ({
  fontSize,
  showTooltips,
}: HealthMetricsOverviewProps) => {
  return (
    <DashboardCard title="Health Metrics Overview">
      <div className="space-y-6">
        {/* Critical Alerts Section */}
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Critical Changes Detected</AlertTitle>
          <AlertDescription>
            Blood pressure readings show an upward trend. Please consult your healthcare provider.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Blood Pressure Metrics */}
          <HealthMetricsCard
            data={mockBloodPressureData}
            title="Blood Pressure"
            interpretation="Your blood pressure shows slight elevation. Consider lifestyle adjustments."
            normalRange={{ min: 90, max: 120 }}
            showTooltips={showTooltips}
            fontSize={fontSize}
          />

          {/* Glucose Levels */}
          <HealthMetricsCard
            data={mockGlucoseData}
            title="Glucose Levels"
            interpretation="Your glucose levels are within normal range."
            normalRange={{ min: 70, max: 100 }}
            showTooltips={showTooltips}
            fontSize={fontSize}
          />

          {/* Heart Rate */}
          <HealthMetricsCard
            data={mockHeartRateData}
            title="Heart Rate"
            interpretation="Your heart rate is stable and healthy."
            normalRange={{ min: 60, max: 100 }}
            showTooltips={showTooltips}
            fontSize={fontSize}
          />
        </div>
      </div>
    </DashboardCard>
  );
};