
import React from 'react';
import { Sender } from '../types';
import Avatar from './Avatar';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-end gap-3">
      <div className="flex-shrink-0">
         <Avatar sender={Sender.Girl} />
      </div>
      <div className="px-4 py-3 rounded-2xl bg-gray-200 dark:bg-gray-700 rounded-bl-none">
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
