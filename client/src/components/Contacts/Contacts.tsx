// pages/contact.tsx
"use client"
// pages/contact.tsx

import { useState } from 'react';
import './contacts.css';
import ContactChatInterface from './ContactChatInterface';

const ContactPage = () => {
  const [activeUser, setActiveUser] = useState<string | null>(null);

  const users = [
    { id: 'user1', name: 'User 1' },
    { id: 'user2', name: 'User 2' },
    { id: 'user3', name: 'User 3' },
    { id: 'user4', name: 'User 4' },
    { id: 'user5', name: 'User 5' },
    // Add more users as needed
  ];

  const handleUserClick = (userId: string) => {
    setActiveUser(userId);
  };

  return (
    <div className="container">
      <div className="usersList">
        <h2>Users List</h2>
        {users.map(user => (
          <div
            key={user.id}
            className={`user ${activeUser === user.id ? 'active' : ''}`}
            onClick={() => handleUserClick(user.id)}
          >
            {user.name}
          </div>
        ))}
      </div>
      <div className="chatBox">
        <h2>Chat</h2>
        {users.map(user => (
          <div
            key={user.id}
            className="chat"
            style={{ display: activeUser === user.id ? 'block' : 'none' }}
          >
            <ContactChatInterface onClose={()=>{}}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
