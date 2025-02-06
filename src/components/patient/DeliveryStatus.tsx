
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { Package, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface DeliveryOrder {
  id: string;
  medication: {
    medication_name: string;
  };
  delivery_status: string;
  preferred_delivery_time: string | null;
  actual_delivery_time: string | null;
  delivery_address: string;
}

export const DeliveryStatus = () => {
  const { toast } = useToast();

  const { data: deliveries, isLoading } = useQuery({
    queryKey: ['medication_deliveries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('medication_deliveries')
        .select(`
          *,
          medication:medications(medication_name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching deliveries",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data as DeliveryOrder[];
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'in_transit':
        return 'text-blue-600';
      case 'delivered':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  if (isLoading) {
    return <div>Loading deliveries...</div>;
  }

  return (
    <div className="space-y-4">
      {deliveries?.map((delivery) => (
        <DashboardCard key={delivery.id} title={`Delivery for ${delivery.medication.medication_name}`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">
                  {delivery.medication.medication_name}
                </h3>
              </div>
              <span className={`font-medium ${getStatusColor(delivery.delivery_status)}`}>
                {delivery.delivery_status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Delivery Address: {delivery.delivery_address}</p>
              {delivery.preferred_delivery_time && (
                <p className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Preferred Time: {new Date(delivery.preferred_delivery_time).toLocaleString()}
                </p>
              )}
              {delivery.actual_delivery_time && (
                <p className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Delivered: {new Date(delivery.actual_delivery_time).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </DashboardCard>
      ))}
      {deliveries?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No delivery orders found
        </div>
      )}
    </div>
  );
};
