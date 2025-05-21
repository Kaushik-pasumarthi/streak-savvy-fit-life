
import { getGeminiApiKey, hasGeminiApiKey } from "@/lib/env";

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export async function sendMessageToGemini(input: string, messages: ChatMessage[]): Promise<string> {
  if (!hasGeminiApiKey()) {
    console.error("Gemini API key not configured");
    throw new Error("Gemini API key not configured");
  }
  
  const apiKey = getGeminiApiKey();
  console.log("API key available:", apiKey ? "Yes (length: " + apiKey.length + ")" : "No");

  // Get the conversation context (last few messages)
  const conversationContext = messages
    .slice(-5)
    .map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
    .join('\n');

  // Prepare the prompt with fitness/health context
  const prompt = `
You are a helpful health and fitness assistant for the FitStreak app. Your expertise includes workout routines, fitness tips, nutrition advice, and general wellness. Be personable and motivational. Provide concise, practical responses focusing on health and fitness.

Recent conversation:
${conversationContext}

User: ${input}
Assistant:
  `.trim();

  try {
    // Make API request to Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`API request failed with status ${response.status}:`, errorData);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("API response structure:", Object.keys(data));
    
    // Extract the assistant's response from Gemini API
    let botResponse = "I'm having trouble connecting. Please try again.";
    
    if (data.candidates && 
        data.candidates[0] && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts[0]) {
      botResponse = data.candidates[0].content.parts[0].text;
    }

    return botResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
