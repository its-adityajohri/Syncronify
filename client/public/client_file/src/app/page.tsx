"use client"
// import Button from '@/components/Button/Button';
import Link from 'next/link';
// import React from 'react'
// import { FaFileAlt } from 'react-icons/fa';
import Login from '@/components/Login/Login';
import LandingCard from '@/components/LandingCard/LandingCard';
import { useRouter } from 'next/navigation';
import { FaCalendar, FaFileAlt, FaMap, FaUsers } from 'react-icons/fa';
import { MdEvent} from 'react-icons/md';
// import ChatComponent from '@/components/Chat/chat';
import ChatInterface from '@/components/Chat/ChatInterface';
import ChatButton from '@/components/Chat/ChatButton';
import { useState } from 'react';
// import Contacts from '@/components/Contacts/Contacts';
// import '../components/Chat/chatStyles.css'

const LandingPage = () => {
  const router=useRouter();
  const user=true;
  const cardDetail=[
    {
      // logo:"card1.svg",
      icon: FaUsers,
      title:"Community",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, nemo? Ullam labore omnis ipsam saepe explicabo quas minima, dicta architecto.",
    },
    {
      // logo:"card1.svg",
      icon: FaFileAlt,
      title:"Notes",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, nemo? Ullam labore omnis ipsam saepe explicabo quas minima, dicta architecto.",
    },
    {
      // logo:"card1.svg",
      icon: FaMap,
      title:"Navigation",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, nemo? Ullam labore omnis ipsam saepe explicabo quas minima, dicta architecto.",
    },
    {
      // logo:"card1.svg",
      icon: FaCalendar,
      title:"Calendar",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, nemo? Ullam labore omnis ipsam saepe explicabo quas minima, dicta architecto.",
    },
    {
      // logo:"card1.svg",
      icon: MdEvent,
      title:"Events",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, nemo? Ullam labore omnis ipsam saepe explicabo quas minima, dicta architecto.",
    },
  ]

  const handleNavigation=()=>{
    router.push('/authentication');
  }
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className='m-5'>

      {/* {{{============Landing Navigation Start======================}}} */}
      <nav className='flex items-center mb-5'>
        <div className="logo flex-1 flex gap-2">
          <img src="logo.jpg" alt="SF" />
          <h3 className="text-md font-bold">Syncronify</h3>
        </div>
        <div className="nav_links flex gap-5 items-center">
          <Link href='#'>About Us</Link><span className='w-[3px] py-3 h-auto bg-gray-700/70 rounded-full'></span>
          <Link href='#'>Contact Us</Link><span className='w-[2px] py-3 h-auto bg-gray-700/70 rounded-full'></span>
          <Link href='authentication'>LogIn</Link><span className='w-[3px] py-3 h-auto bg-gray-700/70 rounded-full'></span>
          <button className='border-2 border-gray-700/70 p-1 rounded-lg font-semibold bg-black text-white' onClick={handleNavigation}>GET STARTED</button>
        </div>
      </nav>
      {/* {{{============Landing Navigation End======================}}} */}
      
      {/* {{{============Landing Intro Start======================}}} */}
      <section className="m-5 flex h-[500px]">
        <div className="landing_pic flex-1 h-10 w-10">
          <img src="landing_pic.png" alt="Landing pic" className='h-96 w-[400px] m-auto'/>
        </div>
        <div className="discription flex-1 flex flex-col justify-center items-center m-auto gap-5">
          <h1 className="text-5xl font-bold ">Write, plan, share.</h1><h1 className="text-5xl font-bold ">With us at your side.</h1>
          <div className="text-md font-semibold">Swift Event Management, Seamless Team Collaboration, Superior Results!</div>
          <button className='border-2 border-gray-700/70 p-1 rounded-lg font-semibold bg-black text-white' onClick={handleNavigation}>GET STARTED</button>
        </div>
      </section>
      {/* {{{============Landing Intro End======================}}} */}

      {/* {{{============Feature Intro Start======================}}} */}
      <section className="flex gap-10 sm:gap-0 flex-wrap justify-between mx-20 -mt-32">
        {/* <div className="w-[250px] h-[250px] bg-gray-100 rounded-2xl"></div>
        <div className="w-[250px] h-[250px] bg-gray-100 rounded-2xl"></div>
        <div className="w-[250px] h-[250px] bg-gray-100 rounded-2xl"></div>
        <div className="w-[250px] h-[250px] bg-gray-100 rounded-2xl"></div>
        <div className="w-[250px] h-[250px] bg-gray-100 rounded-2xl"></div> */}
        {cardDetail.map((detail, i)=>(
          <LandingCard detail={detail}/>
        ))}
        {/* <LandingCard/>
        <LandingCard/> */}
      </section>
      {/* <ChatButton onClick={toggleChat} />
      {showChat && <ChatInterface onClose={toggleChat} />} */}
    </div>
    
  )
}

export default LandingPage;



