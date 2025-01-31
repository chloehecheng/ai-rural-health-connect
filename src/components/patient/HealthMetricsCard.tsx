import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HealthMetricsCardProps {
  data: any[];
  title: string;
  interpretation: string;
  normalRange: {
    min: number;
    max: number;
  };
  showTooltips: boolean;
  fontSize: number;
}

export const HealthMetricsCard = ({
  data,
  title,
  interpretation,
  normalRange,
  showTooltips,
  fontSize,
}: HealthMetricsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle style={{ fontSize: `${fontSize}px` }}>{title}</CardTitle>
        {showTooltips && (
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Normal range: {normalRange.min} - {normalRange.max}</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <ReferenceLine y={normalRange.max} stroke="red" strokeDasharray="3 3" />
              <ReferenceLine y={normalRange.min} stroke="green" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="level"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p 
          className="mt-4 text-muted-foreground"
          style={{ fontSize: `${fontSize - 2}px` }}
        >
          {interpretation}
        </p>
      </CardContent>
    </Card>
  );
};