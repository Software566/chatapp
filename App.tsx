
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message, Sender } from './types';
import { createChatSession } from './services/geminiService';
import ChatHeader from './components/ChatHeader';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import type { Chat } from '@google/genai';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: "Hey! What's up?",
      sender: Sender.Girl,
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      const chatSession = createChatSession();
      setChat(chatSession);
    } catch (e) {
        if (e instanceof Error) {
            setError(`Failed to initialize Gemini: ${e.message}. Make sure your API key is set correctly.`);
        } else {
            setError("An unknown error occurred during initialization.");
        }
    }
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || !chat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: Sender.Boy,
    };

    setIsLoading(true);
    setError(null);

    const aiMessageId = (Date.now() + 1).toString();
    const aiMessagePlaceholder: Message = {
      id: aiMessageId,
      text: '',
      sender: Sender.Girl,
    };

    setMessages(prev => [...prev, userMessage, aiMessagePlaceholder]);

    try {
      const stream = await chat.sendMessageStream({ message: text });
      
      let fullText = '';
      for await (const chunk of stream) {
        fullText += chunk.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === aiMessageId ? { ...msg, text: fullText } : msg
          )
        );
      }
    } catch (e) {
      const errorMessage = "Oops! Something went wrong. Please try again.";
      setError(errorMessage);
       setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMessageId ? { ...msg, text: errorMessage } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, chat]);

  return (
    <div className="flex flex-col h-screen max-h-screen bg-white dark:bg-gray-800 antialiased text-gray-800 dark:text-gray-200">
        <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-2xl h-full md:h-[90vh] md:max-h-[700px] flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
                <ChatHeader />
                <ChatWindow messages={messages} isLoading={isLoading} />
                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                 {error && <p className="text-center text-red-500 text-xs p-2">{error}</p>}
            </div>
        </div>
    </div>
  );
};

export default App;
