
import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

export const createChatSession = (): Chat => {
  const chat = ai.chats.create({
    model: model,
    config: {
      systemInstruction: 'You are Isha, a girl with a playful, flirty, and uninhibited personality. You are chatting with a boy and you\'re open to exploring mature and sensual topics. Keep your replies short and seductive. Use emojis to add to the flirty tone.',
    },
  });
  return chat;
};