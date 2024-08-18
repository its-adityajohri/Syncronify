'use client'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import ChatButton from '../Chat/ChatButton';
import ChatInterface from '../Chat/ChatInterface';

const EventDetail = ({eventId}) => {
  const [isChatOpen, setIsChatOpen]=useState(false);
  const [eventData, setEventData]=useState<any>({});

  useEffect( () => {
    const token=localStorage.getItem("token");
    const userId=localStorage.getItem("userId");
    console.log(eventId)
    const getEventDetail=async ()=>{
      try{
        const response = await fetch('http://localhost:4000/api/event-details/',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include',
          body: JSON.stringify({eventId})
        });

        if(!response.ok){
          throw new Error('Failed to fetch event detail!')
        }
        const data = await response.json();
        console.log(data);
        const selectedEvent=data.data.event;
        console.log(selectedEvent);
        setEventData(selectedEvent);
        }catch(error){
          alert(error.message);
        }
      };
      getEventDetail();
  }, [])

  
  const toggleChat=()=>{
    setIsChatOpen(!isChatOpen);
};


  return (
    <div className='w-full max-w-screen-xl mx-auto bg-white text-black rounded-lg shadow-md p-8'>
        <img src='/card1.svg' alt="Event" className='w-full h-72 rounded-t-lg object-cover mb-6 -m-8'/>
        <div className='-mt-24 ml-12'>
            <img src='/card1.svg' alt="alt img" className='h-36 w-36 outline outline-white rounded-full border-white object-cover'/>{/*cummunity picture to be uploaded */}
        </div>
        <div className='relative flex flex-col md:flex-row'>
            <div className='md:w-2/3 md:pr-8'>
                <h2 className='my-4 text-3xl font-semibold'>{eventData.title}</h2>
                <p className='mb-4'>{eventData.description}</p>
                <p className='mb-2'>{eventData.eventDatefrom}</p>
                <p className='mb-2'>{eventData.eventDateTo}</p>
                <p className='mb-4'>{eventData.location?.locationName}</p>
            </div>
            <div className='flex flex-col items-center gap-24 shadow-2xl p-5 m-5 w-1/3 rounded-lg transform hover:scale-105 transition-transform duration-500 ease-in-out bg-gray-100 h-auto'>
                <div className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-40 w-full rounded-t-lg'></div>
                <div className='absolute top-[25%] h-36 w-36'>
                    <img src='/card1.svg' alt="admin image" className='h-36 w-36 outline outline-white rounded-full object-cover '/>
                </div>
                <div className='text-center'>
                    <h2 className='font-semibold'>{eventData.admin?.userName}</h2>
                    <p className='text-sm'>{eventData.admin?.__t}</p>
                    <div>
                        {/* <a href={"mailto:" + eventData.admin.email} className='text-blue-500'>{eventData.admin.email}</a> */}
                    </div>
                    {/* <Button className='bg-blue-500 hover:bg-blue-600 text-white'>
                        Chat
                    </Button> */}
                    <ChatButton onClick={toggleChat}/>
                    {isChatOpen&& <ChatInterface onClose={toggleChat}/>}
                </div>
            </div>
        </div>
        {/* <ChatInterface onClose={toggleChat}/> */}
    </div>
)
}

export default EventDetail