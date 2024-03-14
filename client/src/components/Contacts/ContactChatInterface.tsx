"use client"
import './contacts.css';
import React, { useState } from 'react';
interface ContactChatInterfaceProps {
  onClose: () => void;
}

const ContactChatInterface: React.FC<ContactChatInterfaceProps> = ({ onClose }) => {
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
    <div className="interface">
      <div className="">
        {/* <h2>Chat Interface</h2> */}
        {/* <button onClick={onClose} className="close-button">
          Close
        </button> */}
      </div>
      <div className="chatMessages flex justify-end items-end gap-1">
        {messages.map((msg, index) => (
          <div key={index} className="contactMessage rounded-[5px] bg-gray-300/70">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendClick} className="inputArea">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
        />
        <button className="sendButton">
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactChatInterface;
