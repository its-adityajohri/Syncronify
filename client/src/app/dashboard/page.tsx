"use client"
import EventPage from '@/components/EventPage/EventPage';
import Calendar from '@/components/Calendar/Calendar'
import LocalCarousel from '@/components/Carousel/Carousel';
import Carousel from '@/components/Carousel/Carousel'
import React, { useState } from 'react'
import CreateEvent from '@/components/CreateEvent/CreateEvent'
import {EventData} from '@/components/CreateEvent/type'
import { FaLocationArrow, FaPlus } from 'react-icons/fa';



function dashboard() {
  const [isCreateActive, setIsCreateActive] = useState(false);
  const [allEvents, setAllEvents] = useState([]);

  return (
    <div className='m-5'>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Your Upcoming Events.</h1>
        <button className='flex gap-2 items-center border-2 border-black rounded-lg p-2 font-semibold' onClick={() => setIsCreateActive(true)}>Create Event <FaPlus /></button>
        {isCreateActive && (
          <div>
            <CreateEvent onAddEvent={(event: EventData): void => {
              // Handle adding event
            }} />
          </div>
        )}
      </div>
      <LocalCarousel />
      {allEvents.length < 1 ? (
        <p className='p-5 '>You don't have any upcoming events.</p>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default dashboard