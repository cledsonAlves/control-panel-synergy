import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

export const ReleaseNotesGenerator = () => {
  const [githubLabel, setGithubLabel] = useState("");
  const [generatedNote, setGeneratedNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateNotes = async () => {
    try {
      setIsLoading(true);
      // Here we would fetch GitHub issues and process them
      // For now, we'll just call the AI API directly
      const response = await fetch("https://sala-integracao.vercel.app/api/ia/stackspot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: githubLabel,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate release notes");
      }

      const data = await response.json();
      setGeneratedNote(data.answer);
      toast({
        title: "Success",
        description: "Release notes generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate release notes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">Release Notes Generator</h1>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="label" className="block text-sm font-medium text-foreground mb-2">
              GitHub Label
            </label>
            <Input
              id="label"
              placeholder="Enter GitHub label"
              value={githubLabel}
              onChange={(e) => setGithubLabel(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleGenerateNotes} 
            disabled={isLoading || !githubLabel}
            className="w-full"
          >
            {isLoading ? "Generating..." : "Generate Release Notes"}
          </Button>

          {generatedNote && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Generated Release Notes
              </label>
              <Textarea
                value={generatedNote}
                readOnly
                className="min-h-[100px]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};