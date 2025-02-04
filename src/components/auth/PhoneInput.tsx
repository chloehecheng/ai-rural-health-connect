import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface PhoneInputProps {
  phoneNumber: string;
  countryCode: string;
  setPhoneNumber: (value: string) => void;
  setCountryCode: (value: string) => void;
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
  setPhoneNumber,
  setCountryCode,
  disabled = false,
}: PhoneInputProps) => {
  return (
    <div className="flex gap-2">
      <Select
        value={countryCode}
        onValueChange={setCountryCode}
        disabled={disabled}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          {countryCodes.map((code) => (
            <SelectItem key={code.value} value={code.value}>
              {code.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        placeholder="Enter your mobile number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
        className="flex-1"
        maxLength={10}
        disabled={disabled}
      />
    </div>
  );
};