import { useState, useEffect } from "react";
import { Card } from "../shared/Card";
import { Button } from "../shared/Button";
import { Check, Loader2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface WebsiteScannerProps {
  onNext: () => void;
}

interface Page {
  url: string;
  status: "pending" | "scanning" | "completed";
  chunks?: string[];
}

export const WebsiteScanner = ({ onNext }: WebsiteScannerProps) => {
  const [pages, setPages] = useState<Page[]>([
    { url: "/", status: "completed" },
    { url: "/about", status: "completed" },
    { url: "/products", status: "scanning" },
    { url: "/contact", status: "pending" },
    { url: "/blog", status: "pending" },
  ]);

  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: Page["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="w-4 h-4 text-green-500" />;
      case "scanning":
        return <Loader2 className="w-4 h-4 animate-spin text-primary" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-200" />;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Website Scanner
        </h2>
        <Button onClick={onNext}>
          Continue Setup
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {progress}% complete
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700 mb-4">
            Detected Pages
          </h3>
          {pages.map((page) => (
            <button
              key={page.url}
              onClick={() => setSelectedPage(page)}
              className={cn(
                "w-full p-4 rounded-lg border text-left transition-all duration-200",
                "hover:border-primary/50 hover:bg-primary/5",
                selectedPage?.url === page.url
                  ? "border-primary bg-primary/5"
                  : "border-gray-200"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{page.url}</span>
                {getStatusIcon(page.status)}
              </div>
            </button>
          ))}
        </div>

        <div className="border-l border-gray-200 pl-6">
          <h3 className="font-medium text-gray-700 mb-4">
            Content Preview
          </h3>
          {selectedPage ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">
                  {selectedPage.status === "completed" ? (
                    "Content has been processed and is ready for training."
                  ) : selectedPage.status === "scanning" ? (
                    "Currently scanning this page for content..."
                  ) : (
                    "This page is queued for scanning."
                  )}
                </p>
              </div>
              {selectedPage.status === "completed" && (
                <div className="space-y-2">
                  <div className="p-3 rounded bg-gray-50 text-sm text-gray-600">
                    Welcome to our website! We're excited to help you...
                  </div>
                  <div className="p-3 rounded bg-gray-50 text-sm text-gray-600">
                    Our mission is to provide the best service...
                  </div>
                  <div className="p-3 rounded bg-gray-50 text-sm text-gray-600">
                    Contact us today to learn more about...
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Select a page to view its content
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
