import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

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
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h1 className="text-2xl font-bold text-card-foreground">Release Notes Generator</h1>
            <Toggle 
              pressed={isManualMode}
              onPressedChange={setIsManualMode}
              variant="outline"
              className="px-4"
            >
              Manual Input
            </Toggle>
          </div>
          
          <div className="grid gap-6">
            {isManualMode ? (
              <div className="space-y-2">
                <label htmlFor="manual" className="text-sm font-medium text-card-foreground">
                  Manual Input
                </label>
                <Textarea
                  id="manual"
                  placeholder="Enter your changes manually..."
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  className="min-h-[150px] resize-none"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label htmlFor="label" className="text-sm font-medium text-card-foreground">
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
              size="lg"
            >
              {isLoading ? "Generating..." : "Generate Release Notes"}
            </Button>

            {generatedNote && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">
                  Generated Release Notes
                </label>
                <div className="bg-muted p-4 rounded-md">
                  <Textarea
                    value={generatedNote}
                    readOnly
                    className="min-h-[100px] resize-none bg-transparent border-none focus-visible:ring-0"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};