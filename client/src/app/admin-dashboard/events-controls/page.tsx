"use client"
import Calendar from '@/components/Calendar/Calendar'
import LocalCarousel from '@/components/Carousel/Carousel';
import Carousel from '@/components/Carousel/Carousel'
import React, { useEffect, useState } from 'react'
import { FaLocationArrow, FaPlus } from 'react-icons/fa';
import EventPage from '@/components/EventPage/EventPage';
import BrowseMap from '@/components/MapBox/BrowseMap';
import { preventDefault } from '@fullcalendar/common';

const eventControls = () => {

  
  const [isCreateActive, setIsCreateActive] = useState(false);
  const[allEvents, setAllEvents]=useState([]);
  const [isBrowseActive, setIsBrowseActive] = useState(false);
  const [Location, setLocation] = useState({latitude: 0, longitude: 0});

  useEffect(() => {
    setIsBrowseActive(false);
  }, [Location])

  const handleCreateActive=(toggleActive: boolean | ((prevState: boolean) => boolean))=>{
    setIsCreateActive(toggleActive);
  }

  const handleBrowseMap = (event: React.MouseEvent)=>{
    event.preventDefault();
    setIsBrowseActive(true);
  }

  return (
    <div className='m-5'>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Upcoming Events</h1>
        <button className='flex gap-2 items-center border-2 border-black rounded-lg p-2 font-semibold' onClick={()=>handleCreateActive(true)}>Create Event <FaPlus /></button>

        {isCreateActive && 
        <div className={`fixed w-full -top-5 left-0 z-10 bg-gray-300/70`}>
          <div className="m-10 p-5 bg-white rounded-xl text-black">
          <div className="absolute top-16 right-16 text-xl rotate-45 cursor-pointer" onClick={()=>handleCreateActive(false)}><FaPlus/></div>
            <h1 className="text-3xl my-5 font-bold">Create Event</h1>
            <form onSubmit={()=>{}} className='flex flex-col gap-5'>
              <h1 className="">Title</h1>
              <input type="text" className='p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg' />
              <h1 className="">Description</h1>
              <input type="text" className='p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg' />
              <h1 className="">Date</h1>
              <div className="flex items-center gap-20">
                <div className="flex items-center gap-10">
                  <h3 className="">From:</h3>
                  {/* <DatePicker
                  className='bg-gray-300 flex border-2 border-gray-500/70 rounded-lg p-1 font-semibold cursor-pointer'
                    selected={fromDateTime}
                    onChange={handleFromDateTime}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeFormat="h:mm aa"
                    timeIntervals={15}
                    timeCaption="Time"
                    calendarClassName=''
                    required
                  /> */}
                </div>
                <div className="flex items-center gap-10">
                  <h3 className="">To:</h3>
                  {/* <DatePicker
                  className='bg-gray-300 flex border-2 border-gray-500/70 rounded-lg p-1 font-semibold cursor-pointer'
                    selected={toDateTime}
                    onChange={handleToDateTime}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeFormat="h:mm aa"
                    timeIntervals={15}
                    timeCaption="Time"
                    calendarClassName=''
                    required
                  /> */}
                </div>
              </div>
              <h1 className="">Location</h1>
              <div className="flex items-center gap-10">
                <input type="" className=' flex-1 p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg' />
                <button className="p-2 flex items-center gap-3 border-2 bg-[#0f172a] rounded-lg text-white text-center font-semibold" onClick={handleBrowseMap}><p className="p-1">Pick from map</p><FaLocationArrow/></button>  
              </div>
              <h1 className="">Description</h1>
              <input type="text" className='p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg' />
              <div className="flex gap-20 mt-10">
                <button className="bg-[#0f172a] hover:bg-white hover:outline-2 hover:outline-[#0f172a] hover:outline p-2 text-gray-300 hover:text-[#0f172a] rounded-lg flex items-center gap-2 max-w-fit">Create<FaPlus/></button>
                <button className="outline outline-2 outline-#0f172a text-[#0f172a] hover:outline-none hover:bg-[#0f172a] p-2 hover:text-[#0f172a] rounded-lg text-center gap-2 max-w-fit" onClick={()=>handleCreateActive(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
        }
        
        {isBrowseActive &&
          <div className="absolute w-[94vw] left-[3vw] right-[3vw] h-[94vh] top-[3vh] bottom-[3vh] z-20">
              <BrowseMap setLocation = {setLocation}/>
          </div>
        }
        
      </div>
      <LocalCarousel/>
      {allEvents.length <0? <p className='p-5 '>You don't have any upcoming events.</p>:
      <div></div>
   }
    </div>
  )
}

export default eventControls