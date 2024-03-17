import React, { useState } from 'react';
import { FaLocationArrow, FaPlus } from 'react-icons/fa';

const CreateEvent = () => {
  return (  
    <div>CreateEvent</div>
  )
}
 
//const [isCreateActive, setIsCreateActive] = useState();

interface EventData {
    eventName: string;
    startDate: string;
    endDate: string;
    audience: string;
    description: string;
    image: File | null;

  }

  interface EventFormProps {
    onAddEvent: (event: EventData) => void;
  }
 
  const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
    const [eventName, setEventName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [audience, setAudience] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [isCreateActive, setIsCreateActive] = useState(false);


  const handleCreateActive = (toggleActive: boolean | ((prevState: boolean) => boolean)) => {
    setIsCreateActive(toggleActive);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // event object
    const event: EventData = {
      eventName,
      startDate,
      endDate,
      audience,
      description,
      image,
    };
    // Pass the event object to the parent component
    onAddEvent(event);
    setEventName('');
    setStartDate('');
    setEndDate('');
    setAudience('');
    setDescription('');
    setImage(null);
    setIsCreateActive(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit" onClick={() => setIsCreateActive(true)}>Create</button>
      </form>
      {isCreateActive && (
        <div className={`fixed w-full -top-5 left-0 z-10 bg-gray-300/70`}>
          <div className="m-10 p-5 bg-white rounded-xl text-black">
            <div className="absolute top-16 right-16 text-xl rotate-45 cursor-pointer" onClick={() => handleCreateActive(false)}><FaPlus/></div>
            <h1 className="text-3xl my-5 font-bold">Create Event</h1>
            <form onSubmit={() => {}} className='flex flex-col gap-5'>
              <h1 className="">Event Name</h1>
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className='p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg' required />
              <h1 className="">Description</h1>
              <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg' required />
              <h1 className="">Start Date</h1>
              <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg' required />
              <h1 className="">End Date</h1>
              <h1 className="">Location</h1>
              <div className="flex items-center gap-10">
                <input type="" className=' flex-1 p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg' />
                <button className="p-2 flex items-center gap-3 border-2 bg-#0f172a rounded-lg text-white text-center font-semibold"><p className="p-1">Pick from map</p><FaLocationArrow/></button>  
              </div>
              <input type="text" placeholder="Audience" value={audience} onChange={(e) => setAudience(e.target.value)} className='p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg' required />
              <h1 className="">Intended Audience</h1>
              <input type="file" onChange={(e) => setImage(e.target.files && e.target.files[0])} required /> {/* File input for image */}
              <div className="flex gap-20 mt-10">
                <button className="bg-[#0f172a] hover:bg-white hover:outline-2 hover:outline-[#0f172a] hover:outline p-2 text-gray-300 hover:text-[#0f172a] rounded-lg flex items-center gap-2 max-w-fit">Create<FaPlus/></button>
                <button className="outline outline-2 outline-#0f172a text-[#0f172a] hover:outline-none hover:bg-[#0f172a] p-2 hover:text-[#0f172a] rounded-lg text-center gap-2 max-w-fit" onClick={() => handleCreateActive(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
  
      }
export default EventForm;
