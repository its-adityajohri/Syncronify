"use client";
import { FaLocationArrow, FaPlus } from 'react-icons/fa';
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
  location : string;
}
 
const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
  
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [audience, setAudience] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isCreateActive, setIsCreateActive] = useState(true);
  
  const[allEvents, setAllEvents]=useState([]);
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
      location
    };
    // Pass the event object to the parent component
    onAddEvent(event);
    // Clear form fields
    setEventName('');
    setLocation('');
    setStartDate('');
    setEndDate('');
    setAudience('');
    setDescription('');
    setImage(null);
  };
  const handleClear = () => {
    setEventName('');
    setStartDate('');
    setEndDate('');
    setAudience('');
    setDescription('');
    setLocation('');
    setImage(null);
  };
  const handleCreateActive=(toggleActive: boolean )=>{
    setIsCreateActive(toggleActive);
    
  };
  const handleAddEvent = (event:EventData) => {
    // Update events state with the new event
    setAllEvents([])
  };
  return (
    <>
    {isCreateActive && (
      <div style={{ height: '50vw', overflowY: 'auto' }} className={`fixed w-full -top-5 left-0 z-10 bg-gray-300/70`}>
        <div className="m-10 p-5 bg-white rounded-xl text-black">
          <div className="absolute top-16 right-16 text-xl rotate-45 cursor-pointer" onClick={() => handleCreateActive(false)}><FaPlus /></div>
          <h1 className="text-3xl my-5 font-bold">Create Event</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-5 text-black'>
            <h1 className="">Event Name</h1>
            <input type="text" className="p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
            <div className="flex items-center gap-20">
              <div className="flex items-center gap-10"><h1 className="">Start Date</h1><input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required /></div>
              <div className="flex items-center gap-10"><h1 className="">End Date</h1><input type="date" placeholder="End Date" className="flex items-center gap-10" value={endDate} onChange={(e) => setEndDate(e.target.value)} required /></div>
            </div>
            <h1 className="">Audience</h1>
            <input type="text" className="p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg" value={audience} onChange={(e) => setAudience(e.target.value)} />
            <h1 className="">Location</h1>
            <input type="text" className="p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg" value={location} onChange={(e) => setLocation(e.target.value)} />
            <button style={{ width: 'fit-content' }}className="items-center bg-black text-white p-2 rounded-lg">Use Map to get Location</button>
            <h1 className="">Description</h1>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg" />
            <h1 className="">Images</h1>
            <input type="file" onChange={(e) => setImage(e.target.files && e.target.files[0])} /> {/* File input for image */}
            <div className="flex justify-between mt-auto">
              <button className="flex items-center gap-10 bg-black text-white p-2 rounded-lg" onClick={handleSubmit} type="submit">Create</button>
              <button className="flex items-center gap-10 bg-black text-white p-2 rounded-lg" onClick={handleClear} type="reset">Remove</button>
            </div>
          </form>
        </div>
      </div>
    )}
  </>
  );
};



export default EventForm;
