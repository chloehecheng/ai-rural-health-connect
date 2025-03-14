import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const [showPolicies, setShowPolicies] = useState<'agreement' | 'hipaa' | 'telehealth' | 'ai' | null>(null);

  return (
    <>
      <footer className="w-full border-t bg-white py-4 px-8">
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <button 
            onClick={() => setShowPolicies('agreement')} 
            className="hover:text-blue-600 hover:underline"
          >
            Provider Agreement
          </button>
          <button 
            onClick={() => setShowPolicies('hipaa')} 
            className="hover:text-blue-600 hover:underline"
          >
            HIPAA Compliance Agreement
          </button>
          <button 
            onClick={() => setShowPolicies('telehealth')} 
            className="hover:text-blue-600 hover:underline"
          >
            Telehealth Licensing Agreement
          </button>
          <button 
            onClick={() => setShowPolicies('ai')} 
            className="hover:text-blue-600 hover:underline"
          >
            AI Transparency & Liability
          </button>
        </div>
      </footer>

      {/* Policy Modals */}
      <Dialog open={showPolicies !== null} onOpenChange={() => setShowPolicies(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">
              {showPolicies === 'agreement' && "Provider Agreement"}
              {showPolicies === 'hipaa' && "HIPAA Compliance Agreement"}
              {showPolicies === 'telehealth' && "Telehealth Licensing Agreement"}
              {showPolicies === 'ai' && "AI Transparency and Liability Agreement"}
            </DialogTitle>
            <DialogDescription className="text-lg space-y-6">
              {showPolicies === 'agreement' && (
                <div className="max-h-[400px] overflow-y-auto bg-gray-50 p-6 rounded-lg">
                  <p className="mb-4">As a healthcare provider on our platform, you agree to:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Maintain current and valid professional licensure in your practicing jurisdiction</li>
                    <li>Provide healthcare services in accordance with professional standards of care</li>
                    <li>Maintain appropriate professional liability insurance</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Participate in required training and orientation programs</li>
                  </ul>
                </div>
              )}

              {showPolicies === 'hipaa' && (
                <div className="max-h-[400px] overflow-y-auto bg-gray-50 p-6 rounded-lg">
                  <p className="mb-4">As a covered entity under HIPAA, you agree to:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Protect and maintain the confidentiality of all Protected Health Information (PHI)</li>
                    <li>Use appropriate safeguards to prevent unauthorized disclosure of PHI</li>
                    <li>Report any unauthorized use or disclosure of PHI</li>
                    <li>Ensure that all staff members complete HIPAA training</li>
                    <li>Maintain detailed records of all PHI access and transfers</li>
                  </ul>
                </div>
              )}

              {showPolicies === 'telehealth' && (
                <div className="max-h-[400px] overflow-y-auto bg-gray-50 p-6 rounded-lg">
                  <p className="mb-4">For telehealth services, you acknowledge and agree that:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>You hold valid licenses in all jurisdictions where you provide telehealth services</li>
                    <li>You will comply with state-specific telehealth practice requirements</li>
                    <li>You will maintain appropriate documentation for all telehealth encounters</li>
                    <li>You will use only approved secure platforms for telehealth services</li>
                    <li>You will establish appropriate emergency protocols for telehealth patients</li>
                  </ul>
                </div>
              )}

              {showPolicies === 'ai' && (
                <div className="max-h-[400px] overflow-y-auto bg-gray-50 p-6 rounded-lg">
                  <p className="mb-4">Regarding AI-assisted features, you understand and agree that:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>AI technology is used as a support tool and does not replace professional medical judgment</li>
                    <li>You maintain full responsibility for all medical decisions, regardless of AI suggestions</li>
                    <li>You will inform patients about the use of AI technology when appropriate</li>
                    <li>You will report any concerns about AI system performance</li>
                    <li>You understand the limitations and potential biases of AI systems</li>
                  </ul>
                </div>
              )}

              <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                <Button
                  onClick={() => setShowPolicies(null)}
                >
                  Close
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
