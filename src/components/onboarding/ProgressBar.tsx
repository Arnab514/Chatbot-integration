// import { cn } from "@/lib/utils";

// interface ProgressBarProps {
//   steps: string[];
//   currentStep: number;
// }

// export const ProgressBar = ({ steps, currentStep }: ProgressBarProps) => {
//   return (
//     <div className="w-full max-w-3xl mx-auto mb-8 px-4">
//       <div className="flex flex-col md:flex-row justify-between">
//         {steps.map((step, index) => (
//           <div
//             key={step}
//             className={cn(
//               "flex items-center",
//               "relative mb-4 md:mb-0",
//               index < steps.length - 1 ? "md:flex-1" : "",
//               "flex-row md:flex-col"
//             )}
//           >
//             <div className="relative flex items-center justify-center">
//               {index > 0 && (
//                 <div
//                   className={cn(
//                     "absolute hidden md:block h-0.5 w-full right-1/2 top-4 -translate-y-1/2",
//                     index <= currentStep
//                       ? "bg-primary"
//                       : "bg-gray-200"
//                   )}
//                 />
//               )}
//               <div
//                 className={cn(
//                   "w-8 h-8 rounded-full flex items-center justify-center relative z-10",
//                   "border-2",
//                   index < currentStep
//                     ? "bg-primary border-primary text-white"
//                     : index === currentStep
//                     ? "bg-white border-primary text-primary"
//                     : "bg-white border-gray-200 text-gray-400"
//                 )}
//               >
//                 {index < currentStep ? "✓" : index + 1}
//               </div>
//             </div>
//             <span
//               className={cn(
//                 "text-sm ml-3 md:ml-0 md:mt-2",
//                 "whitespace-nowrap px-1",
//                 index <= currentStep
//                   ? "text-primary font-medium"
//                   : "text-gray-400"
//               )}
//             >
//               {step}
//             </span>
//             {index < steps.length - 1 && (
//               <div
//                 className={cn(
//                   "md:hidden h-12 w-0.5 absolute -bottom-8 left-4",
//                   index <= currentStep
//                     ? "bg-primary"
//                     : "bg-gray-200"
//                 )}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import React from 'react';
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}

export const ProgressBar = ({ steps, currentStep }: ProgressBarProps) => {
  if (currentStep === steps.length - 1) {
    return null;
  }

  const getMobileSteps = () => {
    const lastStepIndex = steps.length - 1;
    
    if (currentStep <= 1) {
      return [0, 1, 2, lastStepIndex];
    } else if (currentStep >= steps.length - 3) {
      return steps.map((_, i) => i).slice(-3);
    } else {
      return [0, currentStep - 1, currentStep, currentStep + 1, lastStepIndex];
    }
  };

  const mobileSteps = getMobileSteps();

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 px-4">
      {/* Desktop View */}
      <div className="hidden md:flex justify-between items-center">
        {steps.map((step, index) => {
          const isLastStep = index === steps.length - 1;
          const isSecondToLast = index === steps.length - 2;
          
          return (
            <div
              key={step}
              className={cn(
                "relative flex flex-col items-center",
                !isLastStep && "flex-1"
              )}
            >
              {/* Progress Line - only for steps before the second to last */}
              {index < steps.length - 2 && (
                <div
                  className={cn(
                    "absolute h-0.5 w-full left-1/2 top-4 -translate-y-1/2",
                    index < currentStep ? "bg-primary" : "bg-gray-200"
                  )}
                />
              )}
              
              {/* Special connecting line for second to last step */}
              {isSecondToLast && (
                <div
                  className={cn(
                    "absolute h-0.5 w-1/2 left-1/2 top-4 -translate-y-1/2",
                    index < currentStep ? "bg-primary" : "bg-gray-200"
                  )}
                />
              )}
              
              {/* Step Circle */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center relative z-10",
                  "border-2",
                  index < currentStep
                    ? "bg-primary border-primary text-white"
                    : index === currentStep
                    ? "bg-white border-primary text-primary"
                    : "bg-white border-gray-200 text-gray-400"
                )}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>
              
              {/* Step Label */}
              <span
                className={cn(
                  "text-sm mt-2",
                  "text-center",
                  index <= currentStep
                    ? "text-primary font-medium"
                    : "text-gray-400"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden justify-center items-center space-x-4">
        {steps.map((step, index) => {
          const isVisible = mobileSteps.includes(index);
          const isEllipsis = !isVisible && (
            (index > 0 && mobileSteps.includes(index - 1)) ||
            (index < steps.length - 1 && mobileSteps.includes(index + 1))
          );

          if (!isVisible && !isEllipsis) return null;

          return (
            <React.Fragment key={index}>
              {isEllipsis ? (
                <span className="text-gray-400">...</span>
              ) : (
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      "border-2",
                      index < currentStep
                        ? "bg-primary border-primary text-white"
                        : index === currentStep
                        ? "bg-white border-primary text-primary"
                        : "bg-white border-gray-200 text-gray-400"
                    )}
                  >
                    {index < currentStep ? "✓" : index + 1}
                  </div>
                  <span
                    className={cn(
                      "text-xs mt-1",
                      index <= currentStep
                        ? "text-primary font-medium"
                        : "text-gray-400"
                    )}
                  >
                    {step}
                  </span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

// export default ProgressBar;