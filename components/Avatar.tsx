
import React from 'react';
import { Sender } from '../types';

interface AvatarProps {
  sender: Sender;
}

const Avatar: React.FC<AvatarProps> = ({ sender }) => {
  const imageUrl = sender === Sender.Girl
    ? 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    : 'https://picsum.photos/seed/boy-avatar/40/40';

  return (
    <img
      src={imageUrl}
      alt={`${sender} avatar`}
      className="w-10 h-10 rounded-full object-cover"
    />
  );
};

export default Avatar;
