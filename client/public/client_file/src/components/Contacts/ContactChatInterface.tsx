"use client"
import './contacts.css';
import React, { useEffect, useState } from 'react';
interface ContactChatInterfaceProps {
  onClose: () => void;
}

const ContactChatInterface: React.FC<ContactChatInterfaceProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [scrollToBottom, setScrollToBottom] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendClick = (e) => {
    e.preventDefault()
    if (message.trim() !== '') {
      setMessages([...messages, message]);
      setMessage('');
      setScrollToBottom(true);
    }
  };

  
  useEffect(() => {
    if (scrollToBottom) {
      const chatMessages = document.getElementById('chatMessages');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
        setScrollToBottom(false);
      }
    }
  }, [messages, scrollToBottom]);


  return (
    <div className="interface">
      <div className="">
        {/* <h2>Chat Interface</h2> */}
        {/* <button onClick={onClose} className="close-button">
          Close
        </button> */}
      </div>
      <div id='chatMessages' className="chatMessages flex flex-col items-end gap-1">
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
