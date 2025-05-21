
// Environment variable utility functions

// Check if a Gemini API key is set in the environment variables
export const hasGeminiApiKey = (): boolean => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  console.log("Checking for API key:", apiKey ? "Found" : "Not found");
  return !!apiKey && apiKey.trim() !== '';
};

// Get the Gemini API key from environment variables
export const getGeminiApiKey = (): string => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  if (!apiKey) {
    console.warn("No Gemini API key found in environment variables");
  }
  return apiKey;
};

// Instructions for setting up the API key
export const apiKeyInstructions = `
To use the Health Assistant, please add your Gemini API key:

1. Create a .env file in the root directory of your project
2. Add the following line to the .env file:
   VITE_GEMINI_API_KEY=your_api_key_here
3. Restart the development server

You can get a Gemini API key from Google AI Studio: https://makersuite.google.com/app/apikey
`;
