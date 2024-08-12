"use client"
import LocalCarousel from '@/components/Carousel/Carousel';
import Carousel from '@/components/Carousel/Carousel'
import React, { useEffect, useState } from 'react'
import { FaLocationArrow, FaPlus } from 'react-icons/fa';
import EventPage from '@/components/EventPage/EventPage';
// import BrowseMap from '@/components/MapBox/BrowseMap';
import { preventDefault } from '@fullcalendar/common';
import Calendar from '@/components/Calendar/Calendar';
import EventForm from '@/components/CreateEvent/CreateEvent';
import CreateEvent from '@/components/CreateEvent/CreateEvent';
import { LocationProvider, useLocation, } from '@/context/LocationContext';
import dynamic from 'next/dynamic';

const BrowseMap = dynamic(() => import("@/components/MapBox/BrowseMap"), {
  // loading: () => "Loading...",
  ssr: false
});


const dashboard = () => {
  
  const [isCreateActive, setIsCreateActive] = useState(false);
  const {location, handleLocation} =useLocation();
  const[allEvents, setAllEvents]=useState([]);
  const [isBrowseActive, setIsBrowseActive] = useState(false);
  // const [location, setLocation] = useState({latitude: 0, longitude: 0});

  // useEffect(() => {
  //   setIsBrowseActive(false);
  // }, [location])

  const handleCreateActive=(toggleActive: boolean | ((prevState: boolean) => boolean))=>{
    setIsCreateActive(toggleActive);
  }


  const handleBrowseMap = (event:any)=>{
    event.preventDefault();
    setIsBrowseActive(!isBrowseActive);
  }

  return (
    <div className='m-5'>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Your Upcoming Events.</h1>
        <button className='flex gap-2 items-center border-2 border-black rounded-lg p-2 font-semibold' onClick={()=>handleCreateActive(true)}>Create Event <FaPlus /></button>
        <LocationProvider>  
          <CreateEvent isCreateActive={isCreateActive} handleCreateActive={handleCreateActive} handleBrowseMap={handleBrowseMap}/>
        </LocationProvider>
        
        {isBrowseActive &&
          <div className="absolute w-[94vw] left-[3vw] right-[3vw] h-[94vh] top-[3vh] bottom-[3vh] z-50">
            <LocationProvider>
              <BrowseMap handleBrowseMap={handleBrowseMap}/>
              
            </LocationProvider>
          </div>
        }
        
      </div>
      <LocalCarousel/>
      <Calendar/>
      {allEvents.length <0? <p className='p-5 '>You don't have any upcoming events.</p>:
      <div>
      </div>
   }
    </div>
  )
}

export default dashboard