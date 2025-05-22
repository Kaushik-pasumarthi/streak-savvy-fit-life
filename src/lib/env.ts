
// Environment variable utility functions

// Hardcoded API key - you can replace this with your actual API key
const HARDCODED_API_KEY = "AIzaSyAn8gaJiC8jSG_vb5NzPTeoc8J4ikZsjNo";

// Check if a Gemini API key is set
export const hasGeminiApiKey = (): boolean => {
  // First check environment variables, then fall back to hardcoded key
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || HARDCODED_API_KEY;
  console.log("Checking for API key:", apiKey ? "Found" : "Not found");
  return !!apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE' && apiKey.trim() !== '';
};

// Get the Gemini API key
export const getGeminiApiKey = (): string => {
  // First check environment variables, then fall back to hardcoded key
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || HARDCODED_API_KEY;
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    console.warn("Please replace 'YOUR_GEMINI_API_KEY_HERE' with your actual Gemini API key in src/lib/env.ts");
    return apiKey;
  }
  
  // Trim the API key to avoid common issues with copied keys
  return apiKey.trim();
};

// Instructions for setting up the API key
export const apiKeyInstructions = `
To use the Health Assistant, please add your Gemini API key by:

Option 1: Replace 'YOUR_GEMINI_API_KEY_HERE' in src/lib/env.ts with your actual API key

Option 2: Create a .env file in the root directory with:
VITE_GEMINI_API_KEY=your_api_key_here

You can get a Gemini API key from Google AI Studio: https://makersuite.google.com/app/apikey
`;
