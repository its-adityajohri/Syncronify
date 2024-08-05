"use client"
import React, { useEffect, useState } from 'react';
import './chatStyles.css'

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const[scrollToBottom, setScrollToBottom]=useState(false);

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

  useEffect(()=>{
    if(scrollToBottom){
      const chatMessages=document.getElementById(("chat-messages"));
      if(chatMessages){
        chatMessages.scrollTop=chatMessages.scrollHeight;
        setScrollToBottom(false);
      }
    }
  },[messages, scrollToBottom]);

  return (
    <div className="chat-interface">
      <div className="header">
        <img src='/card1.svg' alt="Admin" className="admin-photo" />
        <button onClick={onClose} className="close-button">
          X
        </button>
      </div>
      <div id='chat-messages' className="chat-messages flex-col gap-1 items-end">
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
