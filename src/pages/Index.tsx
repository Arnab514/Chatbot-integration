import { useState } from "react";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { Registration } from "@/components/onboarding/Registration";
import { EmailVerification } from "@/components/onboarding/EmailVerification";
import { OrganizationSetup } from "@/components/onboarding/OrganizationSetup";
import { WebsiteScanner } from "@/components/onboarding/WebsiteScanner";
import { Integration } from "@/components/onboarding/Integration";
import { Success } from "@/components/onboarding/Success";

const STEPS = [
  "Account",
  "Verification",
  "Organization",
  "Scanner",
  "Integration",
  "Complete",
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleComplete = () => {
    // Handle completion
    console.log("Setup completed!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <ProgressBar steps={STEPS} currentStep={currentStep} />
        
        <div className="mt-8 animate-fade-in">
          {currentStep === 0 && (
            <Registration onNext={() => setCurrentStep(1)} />
          )}
          {currentStep === 1 && (
            <EmailVerification onNext={() => setCurrentStep(2)} />
          )}
          {currentStep === 2 && (
            <OrganizationSetup onNext={() => setCurrentStep(3)} />
          )}
          {currentStep === 3 && (
            <WebsiteScanner onNext={() => setCurrentStep(4)} />
          )}
          {currentStep === 4 && (
            <Integration onNext={() => setCurrentStep(5)} />
          )}
          {currentStep === 5 && (
            <Success onComplete={handleComplete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;