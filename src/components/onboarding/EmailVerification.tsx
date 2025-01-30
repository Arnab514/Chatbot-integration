// import { useState } from "react";
// import { Card } from "../shared/Card";
// import { Button } from "../shared/Button";

// interface EmailVerificationProps {
//   onNext: () => void;
// }

// export const EmailVerification = ({ onNext }: EmailVerificationProps) => {
//   const [code, setCode] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (index: number, value: string) => {
//     if (value.length > 1) return;
    
//     const newCode = [...code];
//     newCode[index] = value;
//     setCode(newCode);

//     // Auto-focus next input
//     if (value && index < 5) {
//       const nextInput = document.getElementById(`code-${index + 1}`);
//       nextInput?.focus();
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false);
//       onNext();
//     }, 1500);
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <h2 className="text-2xl font-semibold text-gray-900 mb-2">
//         Verify your email
//       </h2>
//       <p className="text-gray-500 mb-6">
//         We've sent a verification code to your email
//       </p>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="flex gap-2 justify-between">
//           {code.map((digit, index) => (
//             <input
//               key={index}
//               id={`code-${index}`}
//               type="text"
//               inputMode="numeric"
//               pattern="\d*"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleChange(index, e.target.value)}
//               className="w-12 h-12 text-center text-2xl font-semibold rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
//             />
//           ))}
//         </div>
//         <Button
//           type="submit"
//           className="w-full"
//           loading={loading}
//           disabled={code.some((digit) => !digit)}
//         >
//           Verify Email
//         </Button>
//         <p className="text-center text-sm text-gray-500">
//           Didn't receive the code?{" "}
//           <button
//             type="button"
//             className="text-primary hover:underline"
//           >
//             Resend
//           </button>
//         </p>
//       </form>
//     </Card>
//   );
// };


import { useState } from "react";
import { Card } from "../shared/Card";
import { Button } from "../shared/Button";

interface EmailVerificationProps {
  onNext: () => void;
}

export const EmailVerification = ({ onNext }: EmailVerificationProps) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onNext();
    }, 1500);
  };

  return (
    <Card className="max-w-md mx-auto">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-semibold mb-2">
          Verify your email
        </h2>
        <p className="text-gray-600 mb-8">
          We've sent a verification code to your email
        </p>

        <form onSubmit={handleSubmit}>
          {/* Input container with responsive grid */}
          <div className="grid grid-cols-6 gap-2 sm:gap-4 mb-8 max-w-[400px] mx-auto">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-full aspect-square text-center text-2xl font-semibold rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            ))}
          </div>

          <Button
            type="submit"
            loading={loading}
            disabled={loading || code.some(digit => !digit)}
            className="w-full mb-6"
          >
            Verify Email
          </Button>

          <p className="text-center text-sm text-gray-600">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-primary hover:underline font-medium"
            >
              Resend
            </button>
          </p>
        </form>
      </div>
    </Card>
  );
};