import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ReleaseNotesGenerator = () => {
  const [selectedLabel, setSelectedLabel] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [isManualMode, setIsManualMode] = useState(false);
  const [generatedNote, setGeneratedNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const androidLabels = [
    "[Android]-R117",
    "[Android]-R118",
    "[Android]-R119",
  ];

  const handleGenerateNotes = async () => {
    try {
      setIsLoading(true);
      const inputToUse = isManualMode ? manualInput : selectedLabel;
      
      const response = await fetch("https://sala-integracao.vercel.app/api/ia/stackspot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: inputToUse,
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
          <div className="flex items-center space-x-2">
            <Toggle 
              pressed={isManualMode}
              onPressedChange={setIsManualMode}
              aria-label="Toggle manual input"
            >
              Manual Input
            </Toggle>
          </div>

          {isManualMode ? (
            <div>
              <label htmlFor="manual" className="block text-sm font-medium text-foreground mb-2">
                Manual Input
              </label>
              <Textarea
                id="manual"
                placeholder="Enter your changes manually..."
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-foreground mb-2">
                Select Android Label
              </label>
              <Select
                value={selectedLabel}
                onValueChange={setSelectedLabel}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a label" />
                </SelectTrigger>
                <SelectContent>
                  {androidLabels.map((label) => (
                    <SelectItem key={label} value={label}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button 
            onClick={handleGenerateNotes} 
            disabled={isLoading || (!isManualMode && !selectedLabel) || (isManualMode && !manualInput)}
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