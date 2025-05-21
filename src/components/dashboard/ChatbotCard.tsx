
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, AlertTriangle } from "lucide-react";
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
  const [apiKeyStatus, setApiKeyStatus] = useState<boolean | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    // Check if API key is configured on component mount
    checkApiKey();
  }, []);
  
  const checkApiKey = () => {
    const hasKey = hasGeminiApiKey();
    setApiKeyStatus(hasKey);
    
    if (!hasKey) {
      console.log("No API key found. Opening settings dialog.");
      setIsSettingsOpen(true);
      setConnectionError(null);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Reset connection error
    setConnectionError(null);
    
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
        console.log("API key not found when sending message");
        setTimeout(() => {
          const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            content: "API key not configured. Please add your Gemini API key in the settings.",
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
          setIsLoading(false);
          setIsSettingsOpen(true);
          
          toast({
            title: "API Key Missing",
            description: "Please configure your Gemini API key in settings.",
            variant: "destructive",
          });
        }, 300);
        return;
      }

      console.log("Sending message to Gemini API...");
      // Send message to Gemini API
      const botResponse = await sendMessageToGemini(input, messages);
      console.log("Received response from Gemini API");

      // Create bot message
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error in ChatbotCard.tsx:", error);
      
      // Get error message
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setConnectionError(errorMessage);
      
      // Create error message
      const errorBotMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, I encountered an error: ${errorMessage}. Please check your API key or try again later.`,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorBotMessage]);
      
      toast({
        title: "API Error",
        description: errorMessage || "There was a problem connecting to the Gemini API. Please verify your API key.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryConnection = () => {
    checkApiKey();
    if (apiKeyStatus) {
      setConnectionError(null);
      toast({
        title: "Checking connection",
        description: "Attempting to reconnect to the Gemini API.",
      });
    }
  };

  return (
    <Card className="h-[480px] flex flex-col">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Health Assistant
          {apiKeyStatus === false && (
            <span className="ml-2 text-xs text-amber-500">(API Key Missing)</span>
          )}
          {connectionError && apiKeyStatus && (
            <span className="ml-2 text-xs text-red-500">(Connection Error)</span>
          )}
        </CardTitle>
        <div className="flex items-center space-x-2">
          {connectionError && (
            <button 
              onClick={handleRetryConnection}
              className="p-1 text-xs flex items-center text-amber-500 hover:text-amber-600"
              title="Try reconnecting to the API"
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              Retry
            </button>
          )}
          <ChatSettings isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />
        </div>
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
