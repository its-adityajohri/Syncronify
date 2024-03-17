import React, { useState } from 'react'
import { Button } from '../ui/button';
import ChatButton from '../Chat/ChatButton';
import ChatInterface from '../Chat/ChatInterface';

const EventDetailPage = ({eventData}) => {
    return (
        <div className='w-full h-full bg-white text-black rounded'>
            <img src={eventData.event.event_photo} alt="alt img" className='w-screen h-1/4 object-cover rounded-lg'/>
            <div className='-mt-20 ml-12'>
                <img src={eventData.event.community_photo} alt="alt img" className='h-36 w-36 outline outline-white rounded-full border-white object-cover'/>
            </div>
            <div className='relative flex flex-row'>
                <div className='w-2/3'>
                    <h2 className='m-8 ml-3 text-3xl font-semibold'>{eventData.event.event_title}</h2>
                    <p className='m-5 '>{eventData.description.about}</p>
                    <p className='m-2 ml-8'>{eventData.description.date}</p>
                    <p className='m-2 ml-8'>{eventData.description.time}</p>
                    <p className='m-2 ml-8'>{eventData.description.place}</p>
                </div>
                <div className='flex flex-col items-center gap-24 shadow-2xl p-5 m-5 w-1/3 rounded-lg transform hover:scale-105 transition-transform duration-500 ease-in-out bg-gray-100'>
                    <div className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-40 w-full rounded-t-lg'></div>
                    <div className='absolute top-[25%] h-36 w-36'>
                        <img src={eventData.admin.photo} alt="admin image" className='h-36 w-36 outline outline-white rounded-full object-cover '/>
                    </div>
                    <div className='flex flex-col items-center gap-0.5'>
                        <h2 className=''>{eventData.admin.name}</h2>
                        <p className=''>{eventData.admin.info}</p>
                        <a href={"mailto:" + eventData.admin.email} className=''>{eventData.admin.email}</a>
                        <Button className='mt-5'>
                            Chat
                        </Button>
                        {/* <ChatButton onClick={toggleChat}/> */}
                    </div>
                </div>
            </div>
            {/* <ChatInterface onClose={toggleChat}/> */}
        </div>
    )
}

export default EventDetailPage