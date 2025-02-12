import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhoneInputProps {
  phoneNumber: string;
  countryCode: string;
  onPhoneChange: (value: string) => void;
  onCountryCodeChange: (value: string) => void;
  disabled?: boolean;
}

const countryCodes = [
  { value: "+1", label: "USA (+1)" },
  { value: "+44", label: "UK (+44)" },
  { value: "+91", label: "India (+91)" },
  { value: "+61", label: "Australia (+61)" },
  { value: "+86", label: "China (+86)" },
];

export const PhoneInput = ({
  phoneNumber,
  countryCode,
  onPhoneChange,
  onCountryCodeChange,
  disabled = false,
}: PhoneInputProps) => {
  return (
    <div className="space-y-6">
      <Label className="text-3xl font-medium">Phone Number</Label>
      <div className="flex gap-4">
        <Select
          value={countryCode}
          onValueChange={onCountryCodeChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-[160px] text-2xl h-20 border-2">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countryCodes.map((code) => (
              <SelectItem key={code.value} value={code.value} className="text-2xl">
                {code.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="tel"
          placeholder="Please enter your phone number"
          value={phoneNumber}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="flex-1 h-20 border-2 text-3xl text-left placeholder:text-3xl placeholder:text-muted-foreground/50"
          style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            lineHeight: '5rem',
            paddingTop: '0',
            paddingBottom: '0',
            paddingLeft: '1rem'
          }}
          disabled={disabled}
        />
      </div>
    </div>
  );
};