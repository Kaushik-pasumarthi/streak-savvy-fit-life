
import React, { useState } from "react";
import { AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { apiKeyInstructions } from "@/lib/env";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ChatSettingsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({ isOpen, setIsOpen }) => {
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Health Assistant Settings</DialogTitle>
          <DialogDescription>
            Configure your Gemini API key for the Health Assistant.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-md bg-muted p-4 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <div className="font-medium">API Key Required</div>
            </div>
            <div className="mt-2 text-sm whitespace-pre-line">
              {apiKeyInstructions}
            </div>
          </div>
          
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setShowTroubleshooting(!showTroubleshooting)}
            >
              {showTroubleshooting ? "Hide Troubleshooting" : "Show Troubleshooting Tips"}
            </Button>
          </div>

          {showTroubleshooting && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <h4 className="font-medium mb-2">Troubleshooting Connection Issues:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Make sure your API key is correct (no extra spaces)</li>
                  <li>Restart your development server after changing the API key</li>
                  <li>Check browser console for specific error messages</li>
                  <li>Ensure you have internet connectivity</li>
                  <li>Verify your API key is active in Google AI Studio</li>
                </ul>
                <div className="mt-2">
                  <a 
                    href="https://makersuite.google.com/app/apikey" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-sm font-medium flex items-center hover:underline text-primary"
                  >
                    <span>Check your API keys in Google AI Studio</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </AlertDescription>
            </Alert>
          )}
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p><strong>Important:</strong> After adding or changing your API key, you must restart your development server for the changes to take effect.</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatSettings;
