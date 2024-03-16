"use client";

import React, { useState } from 'react';
const CreateEvent = () => {
  return (  
    <div>CreateEvent</div>
  )
}
// Define the type for the props of the EventForm component
interface EventFormProps {
onAddEvent: (event: EventData) => void; // Define the type of onAddEvent function
 }

 
interface EventData {
  eventName: string;
  startDate: string;
  endDate: string;
  audience: string;
  description: string;
  image: File | null;
}
 
const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [audience, setAudience] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create event object
    const event = {
      eventName,
      startDate,
      endDate,
      audience,
      description,
      image,
    };
    // Pass the event object to the parent component
    onAddEvent(event);
    // Clear form fields
    setEventName('');
    setStartDate('');
    setEndDate('');
    setAudience('');
    setDescription('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
      <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <input type="text" placeholder="Audience" value={audience} onChange={(e) => setAudience(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="file" onChange={(e) => setImage(e.target.files && e.target.files[0])} required /> {/* File input for image */}
      <button type="submit">Create</button>
      <button type="reset">Remove</button>
    </form>
  );
};

export default EventForm;
