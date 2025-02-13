import { useState } from "react";
import { BaseFeature } from "@/components/features/BaseFeature";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, ArrowLeft, FileText, Calendar, Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const HealthRecords = () => {
  const [step, setStep] = useState<"selection" | "review" | "confirmed">("selection");
  const [showAuth, setShowAuth] = useState(false);
  const [recordType, setRecordType] = useState("");
  const [date, setDate] = useState("");
  const [provider, setProvider] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleReview = () => {
    if (!recordType || !date || !provider || !file) {
      toast({
        title: "Please Fill All Fields",
        description: "We need all the information to upload your health record.",
        variant: "destructive",
      });
      return;
    }
    setStep("review");
  };

  const handleConfirm = () => {
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("Health record upload confirmed:", {
      recordType,
      date,
      provider,
      fileName: file?.name,
      user
    });
    setStep("confirmed");
  };

  const SelectionScreen = () => (
    <div className="space-y-8">
      <div className="grid gap-6">
        <div className="space-y-4">
          <Label className="text-2xl">Record Type</Label>
          <Select value={recordType} onValueChange={setRecordType}>
            <SelectTrigger className="text-xl p-6">
              <SelectValue placeholder="Choose record type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lab-results" className="text-xl">Lab Results</SelectItem>
              <SelectItem value="imaging" className="text-xl">Imaging Reports</SelectItem>
              <SelectItem value="visit-summary" className="text-xl">Visit Summary</SelectItem>
              <SelectItem value="prescription" className="text-xl">Prescription</SelectItem>
              <SelectItem value="other" className="text-xl">Other Documents</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label className="text-2xl">Record Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-xl p-6"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-2xl">Healthcare Provider</Label>
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger className="text-xl p-6">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="provider1" className="text-xl">Dr. Smith</SelectItem>
              <SelectItem value="provider2" className="text-xl">Dr. Johnson</SelectItem>
              <SelectItem value="provider3" className="text-xl">Dr. Williams</SelectItem>
              <SelectItem value="other" className="text-xl">Other Provider</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label className="text-2xl">Upload Document</Label>
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <Input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            <Label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-xl mb-2">Click to upload or drag and drop</p>
              <p className="text-gray-500">PDF, Images, or Documents</p>
            </Label>
            {file && (
              <p className="mt-4 text-xl text-primary">{file.name}</p>
            )}
          </div>
        </div>
      </div>

      <Button
        className="w-full text-2xl p-8"
        onClick={handleReview}
        disabled={!recordType || !date || !provider || !file}
      >
        Review Upload Details
      </Button>
    </div>
  );

  const ReviewScreen = () => (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <FileText className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-2xl font-semibold">Upload Details</h3>
              <p className="text-xl text-gray-600">Please review your health record information</p>
            </div>
          </div>

          <div className="grid gap-4 text-xl">
            <div className="p-4 bg-gray-50 rounded-lg flex gap-3">
              <FileText className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">Record Type:</div>
                <div>{recordType}</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg flex gap-3">
              <Calendar className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">Record Date:</div>
                <div>{date}</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg flex gap-3">
              <Download className="w-6 h-6 text-gray-500" />
              <div>
                <div className="font-semibold">File:</div>
                <div>{file?.name}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button
          variant="outline"
          className="flex-1 text-xl p-6"
          onClick={() => setStep("selection")}
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Go Back
        </Button>
        <Button
          className="flex-1 text-xl p-6"
          onClick={handleConfirm}
        >
          Upload Record
        </Button>
      </div>
    </div>
  );

  const ConfirmedScreen = () => (
    <div className="text-center space-y-8 py-8">
      <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-green-600">Upload Complete!</h2>
        <p className="text-2xl text-gray-600">
          Your health record has been securely uploaded
        </p>
        <div className="text-3xl font-semibold">
          {recordType}
        </div>
        <p className="text-2xl">
          Date: {date}
        </p>
      </div>
      <div className="pt-8 space-y-4">
        <p className="text-xl text-gray-600">
          Your healthcare team will be notified of this new record.
        </p>
        <Button
          className="text-2xl px-8 py-6"
          onClick={() => window.location.href = "/features"}
        >
          Return to Features
        </Button>
      </div>
    </div>
  );

  return (
    <BaseFeature
      title="Health Records"
      description="Securely upload and manage your health records"
      showAuth={showAuth}
      onCloseAuth={() => setShowAuth(false)}
      onAuthSuccess={handleAuthSuccess}
      actionName="Upload Health Record"
    >
      {step === "selection" && <SelectionScreen />}
      {step === "review" && <ReviewScreen />}
      {step === "confirmed" && <ConfirmedScreen />}
    </BaseFeature>
  );
};
