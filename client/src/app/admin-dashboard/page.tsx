"use client";

import EventForm from '@/components/CreateEvent/CreateEvent';
import React, { useState } from 'react'

const adminDashboard = () => {
  const [events, setEvents] = useState([]);

  const handleAddEvent = (event) => { 
    // Update the events state with the new event
    setEvents([...events, event]);
  };
  return (
    <main>
        <h1 className='text-3xl font-bold'>Welcome to the Admin Home!</h1>
        <p>layout is to be added with sidebar and navbar with options(routes to specific admin pages) for Admin</p>
        <EventForm  onAddEvent={handleAddEvent}/>
    </main>
    
    
  )
}

export default adminDashboard;