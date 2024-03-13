// pages/contact.tsx
"use client"
// pages/contact.tsx

import { useState } from 'react';
import './contacts.css';
import ContactChatInterface from './ContactChatInterface';
import { FaEllipsisH, FaEllipsisV } from 'react-icons/fa';

const ContactPage = () => {
  const [activeUser, setActiveUser] = useState<string | null>(null);

  const users = [
    { id: 'user1', name: 'User 1' },
    { id: 'user2', name: 'User 2' },
    { id: 'user3', name: 'User 3' },
    { id: 'user4', name: 'User 4' },
    { id: 'user5', name: 'User 5' },
    { id: 'user6', name: 'User 1' },
    { id: 'user7', name: 'User 2' },
    { id: 'user8', name: 'User 3' },
    { id: 'user9', name: 'User 4' },
    { id: 'user91', name: 'User 5' },
    // Add more users as needed
  ];

  const handleUserClick = (userId: string) => {
    setActiveUser(userId);
  };

  return (
    <div className="container">
      <div className="usersList">
        <h2 className='text-xl font-semibold mb-2 -mt-1'>Users List</h2>
        {users.map(user => (
          <div
            key={user.id}
            className={`user ${activeUser === user.id ? 'active' : ''} flex items-center gap-3`}
            onClick={() => handleUserClick(user.id)}
          >
            <div>
              <img src="/card1.svg" alt="img" className='w-10 h-10 rounded-full object-cover'/>
            </div>
            <div className="font-semibold">
              {user.name}
            </div>
            <div className='flex-1 flex justify-end'><FaEllipsisV/></div>
          </div>
        ))}
      </div>
      <div className="chatBox">
        {!activeUser?<div className='flex justify-center items-center text-2xl mt-[10rem] font-semibold'>Please select a user to chat.</div>: users.map(user => (
          <div
            key={user.id}
            className="chat"
            style={{ display: activeUser === user.id ? 'block' : 'none' }}
          >
            <div className="flex items-center gap-5 bg-white pb-2">
              <img src="/card1.svg" alt="img" className='w-10 h-10 rounded-full object-cover'/>
              <div className="font-semibold text-xl">
                {user.name}
              </div>
            </div>
            <ContactChatInterface onClose={()=>{}}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
