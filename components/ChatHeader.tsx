
import React from 'react';
import Avatar from './Avatar';
import { Sender } from '../types';

const ChatHeader: React.FC = () => {
  return (
    <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
      <Avatar sender={Sender.Girl} />
      <div className="ml-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Isha</h2>
        <p className="text-sm text-green-500 dark:text-green-400">Online</p>
      </div>
    </div>
  );
};

export default ChatHeader;