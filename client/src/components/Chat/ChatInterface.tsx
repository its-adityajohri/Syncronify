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

  const handleSendClick = (e) => {
    e.preventDefault()
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
      <div className="chat-messages flex justify-end items-end gap-1">
        {messages.map((msg, index) => (
          <div key={index} className="message rounded-[5px] bg-gray-300/70">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendClick} className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
        />
        <button className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
