import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthenticationModal } from "@/components/auth/AuthenticationModal";
import { Video, Mic, MicOff, VideoOff, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const VirtualVisit = () => {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [selectedTab, setSelectedTab] = useState("check");

  const handleJoinCall = () => {
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    // Here you would actually start the virtual visit
    console.log("Starting virtual visit with settings:", {
      video: videoEnabled,
      audio: audioEnabled
    });
    // Navigate to video call interface or show connection screen
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white px-6 py-10">
      <Card className="max-w-5xl mx-auto">
        <CardHeader className="space-y-2">
          <CardTitle className="text-4xl font-bold text-primary">
            Virtual Visit
          </CardTitle>
          <CardDescription className="text-xl">
            Connect with your healthcare provider from the comfort of your home
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                        onClick={handleJoinCall}
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
            <Button
              variant="outline"
              className="text-2xl px-8 py-6"
              onClick={() => navigate("/auth/login?step=features")}
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              Back
            </Button>
          </div>
        </CardContent>
      </Card>

      <AuthenticationModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={handleAuthSuccess}
        actionName="Join Your Virtual Visit"
      />
    </div>
  );
};
