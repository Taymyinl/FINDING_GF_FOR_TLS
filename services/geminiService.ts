
import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";
import { Scene } from '../types';
import { getInitialPrompt, RESPONSE_SCHEMA } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chat: Chat | null = null;

export const geminiService = {
  startNewGame: async (language: string): Promise<Scene> => {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const initialPrompt = getInitialPrompt(language);
    
    console.log("Starting new game with prompt:", initialPrompt);
    
    const response: GenerateContentResponse = await chat.sendMessage({ message: initialPrompt });
    
    try {
      const text = response.text.trim();
      const sceneData = JSON.parse(text);
      return sceneData as Scene;
    } catch (error) {
      console.error("Failed to parse Gemini response:", response.text, error);
      throw new Error("The AI Dungeon Master is having trouble thinking. Please try again.");
    }
  },

  sendPlayerChoice: async (choiceText: string): Promise<Scene> => {
    if (!chat) {
      throw new Error("Game has not been started. Call startNewGame first.");
    }

    const prompt = `The player chose: "${choiceText}". Continue the story.`;
    console.log("Sending player choice:", prompt);

    const response: GenerateContentResponse = await chat.sendMessage({ message: prompt });
    
    try {
      const text = response.text.trim();
      const sceneData = JSON.parse(text);
      return sceneData as Scene;
    } catch (error) {
      console.error("Failed to parse Gemini response:", response.text, error);
      throw new Error("The AI Dungeon Master is having trouble thinking. Please try again.");
    }
  }
};
