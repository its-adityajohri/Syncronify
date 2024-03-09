"use client"
import React, { useState } from 'react';
import './chatStyles.css'

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (message.trim() !== '') {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div className="chat-interface">
      <div className="header">
        <h2>Chat Interface</h2>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
      <div className="chat-messages items-end gap-1">
        {messages.map((msg, index) => (
          <div key={index} className="message rounded-[5px] bg-gray-300/70">
            {msg}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
        />
        <button onClick={handleSendClick} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
