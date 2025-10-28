
import { GoogleGenAI } from "@google/genai";

// Ensure API_KEY is available. In a real app, you would handle this more robustly.
if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve((reader.result as string).split(',')[1]);
      } else {
        resolve(''); // Or reject, depending on how you want to handle errors
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const analyzeItemImage = async (imageFile: File): Promise<string> => {
    const imagePart = await fileToGenerativePart(imageFile);
    const prompt = "You are an expert at identifying items for a lost and found service. Describe the item in this image concisely in 5 words or less. For example: 'Silver keys on a blue lanyard' or 'Black leather men's wallet'. Focus on key identifying features.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, { text: prompt }] },
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error analyzing image with Gemini:", error);
        return "Could not analyze image.";
    }
};
