import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Scene, Content } from '../types';
import { RESPONSE_SCHEMA } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  getNextScene: async (history: Content[], newMessage: string): Promise<Scene> => {
    try {
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        history: history,
        config: {
          responseMimeType: "application/json",
          responseSchema: RESPONSE_SCHEMA,
        },
      });

      const response: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
      const text = response.text.trim();
      const sceneData = JSON.parse(text);
      return sceneData as Scene;

    } catch (error) {
      console.error("Error communicating with Gemini or parsing response:", error);
      // Attempt to get more detailed error info if available
      const geminiResponse = (error as any).response ? JSON.stringify((error as any).response, null, 2) : 'No response data';
      console.error("Gemini Response Data:", geminiResponse);
      throw new Error("နတ်ဘုရားကြီးနီယို စဉ်းစားရာတွင် အခက်အခဲရှိနေသည်။ ကျေးဇူးပြု၍ Console ကိုစစ်ဆေးပြီး နောက်တစ်ကြိမ်ကြိုးစားပါ။");
    }
  }
};
