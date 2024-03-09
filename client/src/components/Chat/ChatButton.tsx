"use client"
import React from 'react';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="chat-button text-lg rounded-xl">
      Chat
    </button>
  );
};

export default ChatButton;
