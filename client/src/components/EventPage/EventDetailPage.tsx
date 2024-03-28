"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import ChatButton from '../Chat/ChatButton';
import ChatInterface from '../Chat/ChatInterface';

const EventDetailPage = ({eventData}) => {
    const [isChatOpen, setIsChatOpen]=useState(false);

    const toggleChat=()=>{
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className='w-full max-w-screen-xl mx-auto bg-white text-black rounded-lg shadow-md p-8'>
            <img src={eventData.event.event_photo} alt="Event" className='w-full h-72 rounded-t-lg object-cover mb-6 -m-8'/>
            <div className='-mt-24 ml-12'>
                <img src={eventData.event.community_photo} alt="alt img" className='h-36 w-36 outline outline-white rounded-full border-white object-cover'/>
            </div>
            <div className='relative flex flex-col md:flex-row'>
                <div className='md:w-2/3 md:pr-8'>
                    <h2 className='my-4 text-3xl font-semibold'>{eventData.event.event_title}</h2>
                    <p className='mb-4'>{eventData.description.about}</p>
                    <p className='mb-2'>{eventData.description.date}</p>
                    <p className='mb-2'>{eventData.description.time}</p>
                    <p className='mb-4'>{eventData.description.place}</p>
                </div>
                <div className='flex flex-col items-center gap-24 shadow-2xl p-5 m-5 w-1/3 rounded-lg transform hover:scale-105 transition-transform duration-500 ease-in-out bg-gray-100 h-auto'>
                    <div className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-40 w-full rounded-t-lg'></div>
                    <div className='absolute top-[25%] h-36 w-36'>
                        <img src={eventData.admin.photo} alt="admin image" className='h-36 w-36 outline outline-white rounded-full object-cover '/>
                    </div>
                    <div className='text-center'>
                        <h2 className='font-semibold'>{eventData.admin.name}</h2>
                        <p className='text-sm'>{eventData.admin.info}</p>
                        <div>
                            <a href={"mailto:" + eventData.admin.email} className='text-blue-500'>{eventData.admin.email}</a>
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

export default EventDetailPage