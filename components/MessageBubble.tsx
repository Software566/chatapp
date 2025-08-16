
import React from 'react';
import { Message, Sender } from '../types';
import Avatar from './Avatar';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === Sender.Boy;

  const bubbleClasses = isUser
    ? 'bg-blue-500 text-white rounded-br-none'
    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none';
  
  const containerClasses = isUser ? 'flex-row-reverse' : 'flex-row';

  return (
    <div className={`flex items-end gap-3 ${containerClasses}`}>
      <div className="flex-shrink-0">
        <Avatar sender={message.sender} />
      </div>
      <div className={`px-4 py-3 rounded-2xl max-w-xs md:max-w-md break-words ${bubbleClasses}`}>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
