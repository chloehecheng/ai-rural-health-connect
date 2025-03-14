import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Mic, MicOff, VideoOff, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BaseFeature } from "@/components/features/BaseFeature";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export const VirtualVisit = () => {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [selectedTab, setSelectedTab] = useState("check");
  const [showConsent, setShowConsent] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);

  const handleAuthSuccess = () => {
    // Here you would actually start the virtual visit
    console.log("Starting virtual visit with settings:", {
      video: videoEnabled,
      audio: audioEnabled
    });
    // Navigate to video call interface or show connection screen
  };

  const handleJoinClick = () => {
    if (!sessionStorage.getItem('telehealthConsent')) {
      setShowConsent(true);
    } else {
      setShowAuth(true);
    }
  };

  const handleConsentAccept = () => {
    sessionStorage.setItem('telehealthConsent', 'true');
    setShowConsent(false);
    setShowAuth(true);
  };

  const helpText = [
    "Click 'Connection Check' to ensure your internet is stable.",
    "View your camera in the 'Camera Preview' section. Ensure you can see yourself clearly.",
    "Check your microphone using the 'Audio Level Meter'. The bar should move when you speak.",
    "Use 'Turn Off Camera' or 'Turn Off Microphone' if you wish to disable them.",
    "Grant camera and microphone permissions if prompted by your browser.",
    "Once ready, click 'Join Visit' to enter your virtual appointment.",
    "Use the 'Back' button to return to the previous screen if needed."
  ];

  return (
    <BaseFeature
      title="Virtual Visit"
      description="Connect with your healthcare provider through secure video conferencing"
      showAuth={showAuth}
      onCloseAuth={() => setShowAuth(false)}
      onAuthSuccess={handleAuthSuccess}
      actionName="Join Virtual Visit"
      helpText={helpText}
    >
      <div className="space-y-4">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full text-lg h-14">
            <TabsTrigger value="check">Connection Check</TabsTrigger>
            <TabsTrigger value="join">Join Visit</TabsTrigger>
          </TabsList>

          <TabsContent value="check" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Camera Test</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                    {videoEnabled ? (
                      <div className="text-white text-xl">Camera Preview</div>
                    ) : (
                      <VideoOff className="w-12 h-12 text-slate-500" />
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 text-lg p-4"
                    onClick={() => setVideoEnabled(!videoEnabled)}
                  >
                    {videoEnabled ? (
                      <>
                        <VideoOff className="w-5 h-5 mr-2" />
                        Turn Off Camera
                      </>
                    ) : (
                      <>
                        <Video className="w-5 h-5 mr-2" />
                        Turn On Camera
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Microphone Test</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                    {audioEnabled ? (
                      <div className="text-white text-xl">Audio Level Meter</div>
                    ) : (
                      <MicOff className="w-12 h-12 text-slate-500" />
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 text-lg p-4"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                  >
                    {audioEnabled ? (
                      <>
                        <MicOff className="w-5 h-5 mr-2" />
                        Turn Off Microphone
                      </>
                    ) : (
                      <>
                        <Mic className="w-5 h-5 mr-2" />
                        Turn On Microphone
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="join" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-xl">
                    Your device is ready for the virtual visit. When you're ready to join:
                  </div>
                  <div className="grid gap-4">
                    <Button
                      size="lg"
                      className="w-full text-xl p-6"
                      onClick={handleJoinClick}
                    >
                      <Video className="w-6 h-6 mr-2" />
                      Join Virtual Visit
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full text-xl p-6"
                      onClick={() => setSelectedTab("check")}
                    >
                      ← Back to Connection Check
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="flex gap-4 justify-center">
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-lg">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back
          </Button>
        </div>

        <Dialog open={showConsent} onOpenChange={setShowConsent}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">Telehealth and AI Disclosure Consent</DialogTitle>
              <DialogDescription className="text-lg space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Telehealth Consent</h3>
                    <div className="max-h-[200px] overflow-y-auto bg-gray-50 p-4 rounded-lg">
                      {/* Replace with your actual telehealth consent */}
                      <p className="mb-3">By using our telehealth services, you understand and agree to the following:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Telehealth involves the use of electronic communications to enable healthcare providers to share individual patient medical information for the purpose of improving patient care.</li>
                        <li>The laws that protect privacy and confidentiality of medical information also apply to telehealth.</li>
                        <li>You understand that technical difficulties may occur before or during the telehealth session and your appointment cannot be started or ended as intended.</li>
                        <li>If you experience an emergency, you should call 911 or go to the nearest emergency room.</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI Technology Disclosure</h3>
                    <div className="max-h-[200px] overflow-y-auto bg-gray-50 p-4 rounded-lg">
                      {/* Replace with your actual AI disclosure */}
                      <p className="mb-3">Our platform utilizes artificial intelligence (AI) technology to enhance your healthcare experience:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>AI may be used to assist in analyzing your health information and providing recommendations to healthcare providers.</li>
                        <li>AI technology is used as a support tool and does not replace professional medical judgment.</li>
                        <li>Your data is processed securely and in compliance with HIPAA regulations.</li>
                        <li>You have the right to ask questions about how AI is used in your care.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox 
                      id="consent"
                      checked={consentAccepted}
                      onCheckedChange={(checked) => setConsentAccepted(checked as boolean)}
                    />
                    <label htmlFor="consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      I acknowledge that I have read, understand, and agree to the Telehealth Consent and AI Technology Disclosure
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowConsent(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={!consentAccepted}
                    onClick={handleConsentAccept}
                  >
                    Accept & Continue
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </BaseFeature>
  );
};
