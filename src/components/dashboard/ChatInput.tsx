
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, handleSendMessage, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex w-full space-x-2">
      <Input
        placeholder="Ask about health, workout routines, nutrition..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="flex-1"
      />
      <Button 
        onClick={handleSendMessage} 
        disabled={isLoading || !input.trim()} 
        size="icon"
        className="bg-fitpurple hover:bg-fitpurple-dark"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatInput;
