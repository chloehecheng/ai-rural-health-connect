import { BaseFeature } from "@/components/features/BaseFeature";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  education: string;
  experience: string;
  description: string;
  imageUrl?: string;
}

export const MeetOurDoctors = () => {
  const [showAuth, setShowAuth] = useState(false);

  const doctors: Doctor[] = [
    {
      id: "dr-smith",
      name: "Dr. Smith",
      specialty: "Primary Care",
      education: "MD from Stanford University",
      experience: "15+ years of experience",
      description: "Dr. Smith specializes in family medicine and preventive care. She is dedicated to building long-term relationships with her patients and providing comprehensive healthcare for the entire family.",
    },
    {
      id: "dr-jones",
      name: "Dr. Jones",
      specialty: "Cardiology",
      education: "MD from Harvard Medical School",
      experience: "20+ years of experience",
      description: "Dr. Jones is a board-certified cardiologist with expertise in heart disease prevention and treatment. He is committed to providing personalized cardiac care using the latest medical advances.",
    },
    {
      id: "dr-wilson",
      name: "Dr. Wilson",
      specialty: "Neurology",
      education: "MD from Johns Hopkins University",
      experience: "12+ years of experience",
      description: "Dr. Wilson specializes in diagnosing and treating complex neurological conditions. She takes a patient-centered approach to care and stays current with the latest neurological treatments.",
    },
    {
      id: "dr-brown",
      name: "Dr. Brown",
      specialty: "Orthopedics",
      education: "MD from Yale School of Medicine",
      experience: "18+ years of experience",
      description: "Dr. Brown is an experienced orthopedic surgeon specializing in joint replacement and sports medicine. He is passionate about helping patients regain mobility and improve their quality of life.",
    }
  ];

  return (
    <BaseFeature
      title="Meet Our Doctors"
      description="Learn more about our experienced healthcare providers"
      showAuth={showAuth}
      onCloseAuth={() => setShowAuth(false)}
      onAuthSuccess={() => {}}
      actionName=""
    >
      <div className="space-y-6">
        <Card className="p-6 border-2 border-primary">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl text-primary">Our Healthcare Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl">
              Our team of experienced doctors is committed to providing high-quality, personalized care
              to every patient. Each doctor brings unique expertise and a dedication to improving
              health outcomes in our rural community.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-2xl bg-primary/10">
                      {doctor.name.split(' ')[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl text-primary">{doctor.name}</CardTitle>
                    <p className="text-xl font-medium text-muted-foreground">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-lg font-medium text-foreground">Education</p>
                  <p className="text-xl">{doctor.education}</p>
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">Experience</p>
                  <p className="text-xl">{doctor.experience}</p>
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">About</p>
                  <p className="text-xl">{doctor.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </BaseFeature>
  );
};
