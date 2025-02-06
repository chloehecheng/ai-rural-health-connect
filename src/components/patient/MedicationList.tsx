
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Clock, Package, Pill, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Medication {
  id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  prescribed_date: string;
  refill_date: string | null;
  status: string;
}

export const MedicationList = () => {
  const { toast } = useToast();

  const { data: medications, isLoading } = useQuery({
    queryKey: ['medications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .order('prescribed_date', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching medications",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data as Medication[];
    },
  });

  const handleDeliveryRequest = async (medicationId: string) => {
    // We'll implement this in the next step
    console.log("Request delivery for:", medicationId);
  };

  if (isLoading) {
    return <div>Loading medications...</div>;
  }

  return (
    <div className="space-y-4">
      {medications?.map((medication) => (
        <DashboardCard key={medication.id}>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{medication.medication_name}</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Dosage: {medication.dosage}</p>
                <p className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Frequency: {medication.frequency}
                </p>
                {medication.refill_date && (
                  <p className="text-orange-600">
                    Refill needed by: {new Date(medication.refill_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handleDeliveryRequest(medication.id)}
            >
              <Package className="h-4 w-4" />
              Request Delivery
            </Button>
          </div>
        </DashboardCard>
      ))}
      {medications?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No medications found
        </div>
      )}
    </div>
  );
};
