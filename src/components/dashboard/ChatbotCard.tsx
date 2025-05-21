
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { hasGeminiApiKey } from "@/lib/env";
import { ChatMessage, sendMessageToGemini } from "@/utils/geminiApi";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatSettings from "./ChatSettings";

const ChatbotCard = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! I'm your FitStreak Health Assistant. How can I help you with your fitness journey today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      if (!hasGeminiApiKey()) {
        // Show a message if API key is not set
        setTimeout(() => {
          const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            content: "API key not configured. Please add your Gemini API key in the settings.",
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
          setIsLoading(false);
          
          toast({
            title: "API Key Missing",
            description: "Please configure your Gemini API key in settings.",
            variant: "destructive",
          });
        }, 1000);
        return;
      }

      // Send message to Gemini API
      const botResponse = await sendMessageToGemini(input, messages);

      // Create bot message
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      
      // Create error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please check your API key or try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: "API Error",
        description: "There was a problem connecting to the Gemini API.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-[480px] flex flex-col">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Health Assistant
        </CardTitle>
        <ChatSettings isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto pb-0">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </CardContent>
      
      <CardFooter className="pt-3">
        <ChatInput 
          input={input} 
          setInput={setInput} 
          handleSendMessage={handleSendMessage} 
          isLoading={isLoading} 
        />
      </CardFooter>
    </Card>
  );
};

export default ChatbotCard;
