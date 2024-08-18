"use client";

import EventForm from '@/components/CreateEvent/CreateEvent';
import EventPage from '@/components/EventPage/EventPage';
import AdminEvent from '@/components/adminEvent/AdminEvent';
import { Button } from '@/components/ui/button';
import { LocationProvider } from '@/context/LocationContext';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { FaMapMarked, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const eventArray = [
  {
    id: 0,
    event: {
      community_photo: "/card1.svg",
      community_name: "Games and Sports Council IIT Kanpur",
      event_photo: "/card1.svg",
      event_title: "Event 1",
    },
    description: {
      dateFrom: "24/04/2024",
      timeFrom: "6:00 PM",
      dateTo: "24/04/2024",
      timeTo: "7:00 PM",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolorum ullam neque, rem odio tempore, placeat harum quisquam eos quibusdam deserunt dolores commodi libero magni id voluptas natus ex ipsum. Quasi, inventore cupiditate excepturi ex nostrum voluptatum aspernatur, esse obcaecati veritatis placeat soluta itaque culpa eos doloremque et beatae iusto!",
      place: "Hockey Ground IITK",
    },
    admin: {
      photo: "/card1.svg",
      name: "Payal Dangi",
      email: "abcd@iitk.ac.in",
      info: "Third Year BTech student at IITK",
    },
  },
  {
    id: 1,
    event: {
      community_photo: "/card1.svg",
      community_name: "Games and Sports Council IIT Kanpur",
      event_photo: "/card1.svg",
      event_title: "Event 2",
    },
    description: {
      dateFrom: "24/04/2024",
      timeFrom: "6:00 PM",
      dateTo: "24/04/2024",
      timeTo: "7:00 PM",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolorum ullam neque, rem odio tempore, placeat harum quisquam eos quibusdam deserunt dolores commodi libero magni id voluptas natus ex ipsum. Quasi, inventore cupiditate excepturi ex nostrum voluptatum aspernatur, esse obcaecati veritatis placeat soluta itaque culpa eos doloremque et beatae iusto!",
      place: "Hockey Ground IITK",
    },
    admin: {
      photo: "/card1.svg",
      name: "Payal Dangi",
      email: "abcd@iitk.ac.in",
      info: "Third Year BTech student at IITK",
    },
  },
  {
    id: 2,
    event: {
      community_photo: "/card1.svg",
      community_name: "Games and Sports Council IIT Kanpur",
      event_photo: "/card1.svg",
      event_title: "Event 3",
    },
    description: {
      dateFrom: "24/04/2024",
      timeFrom: "6:00 PM",
      dateTo: "24/04/2024",
      timeTo: "7:00 PM",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolorum ullam neque, rem odio tempore, placeat harum quisquam eos quibusdam deserunt dolores commodi libero magni id voluptas natus ex ipsum. Quasi, inventore cupiditate excepturi ex nostrum voluptatum aspernatur, esse obcaecati veritatis placeat soluta itaque culpa eos doloremque et beatae iusto!",
      place: "Hockey Ground IITK",
    },
    admin: {
      photo: "/card1.svg",
      name: "Payal Dangi",
      email: "abcd@iitk.ac.in",
      info: "Third Year BTech student at IITK",
    },
  }
];

const BrowseMap = dynamic(() => import("@/components/MapBox/BrowseMap"), {
  // loading: () => "Loading...",
  ssr: false
});

const adminDashboard = () => {
  const [isCreateActive, setIsCreateActive] = useState(false);
    const [userEvents, setUserEvents] = useState<any>([]);
    const [isBrowseActive, setIsBrowseActive] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [imageUrl, setImageUrl] = useState<string>("");
    const [inputLocation, setInputLocation] = useState('');
    const [locationPos, setLocationPos] = useState({ longitude: null, latitude: null });
  const handleLocationPos=({longitude, latitude})=>{
    setLocationPos({longitude, latitude});
  }


  useEffect(() => {
    const token=localStorage.getItem('token');
    const userId=localStorage.getItem('user_id');
    console.log(token)
    console.log(userId)
    const getAdminEvents = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/all-organization-events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
          }),
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user events');
        }

        const tempEvents = await response.json();
        const tempData=tempEvents.data.events;
        console.log(tempData);
        setUserEvents(tempData);
      } catch (error) {
        alert(error.message);
      }
    };

    getAdminEvents();
  }, []);


  
  const handleCreateActive=(toggleActive: boolean | ((prevState: boolean) => boolean))=>{
    setIsCreateActive(toggleActive);
  }

  
  const EventHandleFormSubmit=(e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', title, description, imageUrl, fromDate, toDate, inputLocation, locationPos);

    const eventData={
      title,
      description,
      eventDateFrom: fromDate.toISOString(),
      eventDateTo: toDate.toISOString(),
      imgLink: imageUrl,
      locationData: {
        locationName: inputLocation,
        coordinates:{
          longitude: locationPos?.longitude,
          latitude: locationPos?.latitude,
        }
      },
    }

    
    submitEvent(eventData);

    handleCreateActive(false);
  };

  

  const submitEvent=async (eventData:any)=>{
    const token=localStorage.getItem('token');
    const userId=localStorage.getItem('user_id');
    console.log(token);
    console.log(userId);
      try {
        console.log(eventData)
        const response=await fetch('http://localhost:4000/api/create-event',{
          method:'POST',
          headers:{
            "content-type":"application/json",
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include',
          body:JSON.stringify({...eventData, userId}),
        });

        if(!response.ok){
          throw new Error("failed!!!!!!!")
        }
        const data = await response.json();
        const newEvent = data.data.event;

        console.log(newEvent);
        setUserEvents(prevEvent=>[...prevEvent, newEvent])
        toast(data.message);
        // toast(data.message);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Invalid token, please log in again.');
          // Handle invalid token error, e.g., redirect to login page
        } else {
          console.error('Error creating event:', error);
          // Handle other errors
        }
      }
  }
  

  // const handleAddEvent = (event) => { 
  //   // Update the events state with the new event
  //   setEvents([...events, event]);
  // };

  const handleInputLocation=(e:any)=>{
    setInputLocation(e.target.value)
  }

  
  const handleBrowseMap = (event: any)=>{
    event.preventDefault();
    
    setIsBrowseActive(!isBrowseActive);
  }


  return (
    <div className='m-5'>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Your Posted Events.</h1>
        <button className='flex gap-2 items-center border-2 border-black rounded-lg p-2 font-semibold' onClick={()=>handleCreateActive(true)}>Create Event <FaPlus /></button>
        {/* <LocationProvider>  
          <CreateEvent isCreateActive={isCreateActive} handleCreateActive={handleCreateActive} handleBrowseMap={handleBrowseMap}/>
        </LocationProvider> */}

        {/* ////////CreateEvent////////// */}

    <div
      className={`fixed bottom-0 justify-center -top-5 left-20 right-0 z-20 bg-gray-300/70 ${
        isCreateActive ? 'block' : 'hidden'
      }`}
    >
      <div className="m-10 p-5 bg-white min-h-[90vh] rounded-xl text-black">
        <div
          className="absolute top-16 right-16 text-xl rotate-45 cursor-pointer"
          onClick={() => handleCreateActive(false)}
        >
          <FaPlus />
        </div>
        <h1 className="text-3xl my-5 font-bold">Create Event</h1>
        <form onSubmit={EventHandleFormSubmit} className="flex flex-col gap-5">
          <h1 className="">Title</h1>
          <input
            type="text"
            placeholder='Event title here...'
            className="p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h1 className="">Description</h1>
          <input
            type="text"
            placeholder='Describe your event here...'
            className="p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <h1 className="">Event Image</h1>

          {/* Temp Image link option */}
          <input
            type="text"
            placeholder='place your image url here...'
            className="p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <h1 className="font-semibold">Duration</h1>
          <div className="flex items-center gap-20">
            <div className="flex items-center gap-10">
              <h3 className="">From:</h3>
              <ReactDatePicker
                className="bg-gray-300 flex border-2 border-gray-500/70 rounded-lg p-1 font-semibold cursor-pointer"
                selected={fromDate}
                onChange={(date) => setFromDate(date!)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                timeFormat="h:mm aa"
                timeIntervals={15}
                timeCaption="Time"
                calendarClassName=""
                required
              />
            </div>
            <div className="flex items-center gap-10">
              <h3 className="">To:</h3>
              <ReactDatePicker
                className="bg-gray-300 flex border-2 border-gray-500/70 rounded-lg p-1 font-semibold cursor-pointer"
                selected={toDate}
                onChange={(date) => setToDate(date!)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                timeFormat="h:mm aa"
                timeIntervals={15}
                timeCaption="Time"
                calendarClassName=""
                required
              />
            </div>
          </div>


          <h1 className="">Venue of Event</h1>
          <div className="relative flex items-center gap-20">
          <input
            type="text"
            className="p-2 bg-transparent outline-none border-gray-500/70 border-2 block rounded-lg w-2/3"
            placeholder="Enter Vanue name and then pick from map"
            value={inputLocation}
            onChange={handleInputLocation}
          />
          {/* Display suggestions */}
            {/* <ul className="absolute bg-gray-200 rounded-xl backdrop-blur top-11 w-2/3 drop-shadow-xl max-h-[150px] overflow-y-scroll">
              {suggestions.map(
                (suggestion: any) =>
                  inputLocation?.length > 0 && (
                    <li
                      key={suggestion.id}
                      onClick={() =>handleSelectedSuggestion(suggestion)
                      }
                      className=" hover:bg-gray-500/50 cursor-pointer p-1 m-0 rounded-lg"
                    >
                      {suggestion.place_name}
                    </li>
                  )
              )} */}

              {/* If there are no suggestions, show 'Pick location from map'  */}
              {/* {!suggestions.length && inputLocation?.length > 0 && (
                <li className="bg-gray-200 hover:bg-gray-500/50 cursor-pointer py-1">
                  Pick location from map
                </li>
              )}
            </ul> */}
            <Button className='flex gap-2 items-center text-md' onClick={handleBrowseMap}>Choose from map <FaMapMarked/></Button>
          </div>
          <div className='flex gap-10'>
            <Button className='font-semibold text-lg'>Create</Button>
            <Button className='font-semibold text-lg'>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
        
        {isBrowseActive &&
          <div className="absolute w-[94vw] left-[3vw] right-[3vw] h-[94vh] top-[3vh] bottom-[3vh] z-50">
            <LocationProvider>
              <BrowseMap handleBrowseMap={handleBrowseMap} handleLocationPos={handleLocationPos}/>
            </LocationProvider>
          </div>
        }

        
      </div>
      {userEvents.length <1? <p className='p-5 '>You don't have any upcoming events.</p>:
      <div>
        <AdminEvent eventArray={userEvents} />
      </div>
   }
    </div>
  )
}

export default adminDashboard;