import { useState } from "react";
import { Card } from "../shared/Card";
import { Button } from "../shared/Button";
import { Copy, Mail, ExternalLink, MessageSquare, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface IntegrationProps {
  onNext: () => void;
}

export const Integration = ({ onNext }: IntegrationProps) => {
  const [option, setOption] = useState<"code" | "email" | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(SAMPLE_CODE);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    });
  };

  const handleTestChatbot = () => {
    setShowPreview(true);
  };

  const handleCloseChatbot = () => {
    setShowPreview(false);
  };

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Integrate Chatbot
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setOption("code")}
            className={cn(
              "p-6 rounded-lg border text-left transition-all duration-200",
              "hover:border-primary/50 hover:bg-primary/5",
              option === "code"
                ? "border-primary bg-primary/5"
                : "border-gray-200"
            )}
          >
            <h3 className="font-medium text-lg mb-2">
              Copy Integration Code
            </h3>
            <p className="text-sm text-gray-500">
              Add a simple code snippet to your website's HTML
            </p>
          </button>

          <button
            onClick={() => setOption("email")}
            className={cn(
              "p-6 rounded-lg border text-left transition-all duration-200",
              "hover:border-primary/50 hover:bg-primary/5",
              option === "email"
                ? "border-primary bg-primary/5"
                : "border-gray-200"
            )}
          >
            <h3 className="font-medium text-lg mb-2">
              Email Instructions
            </h3>
            <p className="text-sm text-gray-500">
              Send integration instructions to your developer
            </p>
          </button>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleTestChatbot}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Test Chatbot
          </Button>
        </div>

        {option === "code" && (
          <div className="space-y-4 mt-4">
            <div className="relative">
              <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                {SAMPLE_CODE}
              </pre>
              <Button
                variant="outline"
                className="absolute top-2 right-2"
                onClick={handleCopy}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => window.open("#", "_blank")}
              >
                Test Integration
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button onClick={onNext}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {option === "email" && (
          <div className="space-y-4 mt-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">
                We'll send detailed integration instructions to your developer.
                They'll receive step-by-step guidance on how to add the chatbot
                to your website.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Instructions sent",
                    description: "Integration instructions have been sent to your developer.",
                  });
                }}
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Instructions
              </Button>
              <Button onClick={onNext}>
                Continue
              </Button>
            </div>
          </div>
        )}
      </Card>

      {showPreview && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="bg-primary p-4 text-white flex items-center justify-between">
            <button
              onClick={() => toast({
                title: "Feedback",
                description: "Thanks for helping us improve! We'll review your feedback.",
              })}
              className="text-sm hover:underline"
            >
              Chatbot not working as intended? Share feedback
            </button>
            <button
              onClick={handleCloseChatbot}
              className="p-1 hover:bg-primary/80 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-2xl font-bold mb-4">Example Website</h1>
              <p className="text-gray-600 mb-4">
                This is a preview of how the chatbot will appear on your website.
              </p>
              <div className="h-40 bg-gray-100 rounded-lg mb-4"></div>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Chat with us</span>
              <button className="text-gray-500 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-80 bg-gray-50 rounded-lg mb-2 p-4">
              <div className="bg-primary/10 rounded-lg p-2 mb-2 max-w-[80%]">
                Hello! How can I help you today?
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button>Send</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SAMPLE_CODE = `<script>
  window.chatbotConfig = {
    apiKey: "your-api-key",
    theme: "light",
    position: "bottom-right"
  };
</script>
<script src="https://cdn.chatbot.com/widget.js" async></script>`;