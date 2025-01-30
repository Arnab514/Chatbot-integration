import { useState } from "react";
import { Card } from "../shared/Card";
import { Input } from "../shared/Input";
import { Button } from "../shared/Button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrganizationSetupProps {
  onNext: () => void;
}

export const OrganizationSetup = ({ onNext }: OrganizationSetupProps) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const fetchMetadata = async (url: string) => {
    try {
      const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      if (data.data?.description) {
        setDescription(data.data.description);
        toast({
          title: "Description fetched",
          description: "Website metadata has been automatically loaded.",
        });
      }
    } catch (error) {
      toast({
        title: "Error fetching metadata",
        description: "Could not fetch website description. Please enter manually.",
        variant: "destructive",
      });
    } finally {
      setFetching(false);
    }
  };

  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url) {
      setFetching(true);
      fetchMetadata(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNext();
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Set up your organization
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Company Name"
          placeholder="Acme Inc."
          required
        />
        <div className="space-y-2">
          <Input
            label="Website URL"
            placeholder="https://example.com"
            onBlur={handleUrlBlur}
            required
          />
          {fetching && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              Fetching website information...
            </div>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Company Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            rows={4}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          loading={loading}
        >
          Continue
        </Button>
      </form>
    </Card>
  );
};