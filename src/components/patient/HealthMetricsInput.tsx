import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Activity, Thermometer } from "lucide-react";

const formSchema = z.object({
  metricType: z.string(),
  value: z.string().min(1, "Value is required"),
  unit: z.string(),
  notes: z.string().optional(),
});

const metricTypes = [
  { value: "blood_pressure", label: "Blood Pressure", unit: "mmHg", icon: Heart },
  { value: "heart_rate", label: "Heart Rate", unit: "bpm", icon: Activity },
  { value: "temperature", label: "Temperature", unit: "°F", icon: Thermometer },
];

export const HealthMetricsInput = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metricType: "",
      value: "",
      unit: "",
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase.from("health_metrics").insert({
        metric_type: values.metricType,
        value: parseFloat(values.value),
        unit: values.unit,
        notes: values.notes,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Health metric recorded successfully",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record health metric",
        variant: "destructive",
      });
      console.error("Error recording health metric:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="metricType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metric Type</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  const selectedMetric = metricTypes.find(
                    (type) => type.value === value
                  );
                  if (selectedMetric) {
                    form.setValue("unit", selectedMetric.unit);
                  }
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select metric type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {metricTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Record Metric
        </Button>
      </form>
    </Form>
  );
};