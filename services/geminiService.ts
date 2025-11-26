
import { GoogleGenAI, Type } from "@google/genai";

export const analyzeBackupData = async (textData: string) => {
  // Priority: 
  // 1. Environment Variable (Development/Build time)
  // 2. Local Storage (Runtime/Manual Entry)
  let apiKey = process.env.API_KEY;

  if (!apiKey) {
    apiKey = localStorage.getItem('gemini_api_key') || undefined;
  }
  
  if (!apiKey) {
    throw new Error("API Key missing. Please connect your Google Cloud project.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = 'gemini-2.5-flash';
  
  const prompt = `
    Analyze the following chat history excerpt from a social media backup. 
    Provide a JSON response with a summary, the general sentiment, key topics discussed, and a privacy risk level assessment.
    
    Chat Data:
    ${textData.substring(0, 5000)} 
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            sentiment: { type: Type.STRING },
            topics: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] }
          },
          required: ["summary", "sentiment", "topics", "riskLevel"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
