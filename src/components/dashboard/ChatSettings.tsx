
import React from "react";
import { AlertCircle } from "lucide-react";
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

interface ChatSettingsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
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
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatSettings;
