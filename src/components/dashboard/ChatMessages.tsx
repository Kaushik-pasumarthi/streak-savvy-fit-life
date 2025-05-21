
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/utils/geminiApi";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex",
            message.sender === "user" ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "max-w-[85%] rounded-lg px-3 py-2 text-sm",
              message.sender === "user"
                ? "bg-fitpurple text-white"
                : "bg-gray-100"
            )}
          >
            {message.content}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-lg px-4 py-2 bg-gray-100">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
