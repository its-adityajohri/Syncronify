"use client"
import LocalCarousel from '@/components/Carousel/Carousel';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FaMapMarked, FaPlus } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import ReactDatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { LocationProvider } from '@/context/LocationContext';
import dynamic from 'next/dynamic';
import axios from 'axios'
import Calendar from '@/components/Calendar/Calendar';
import { AiOutlinePlusCircle } from 'react-icons/ai';


const BrowseMap = dynamic(() => import("@/components/MapBox/BrowseMap"), {
  // loading: () => "Loading...",
  ssr: false
});

interface Event {
  title: string;
  description: string;
  EventDateFrom: Date;
  EventDateTo: Date;
  imgLink: string;
  locationData: {
    locationName:string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

const dashboard = () => {
    
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
    
    useEffect(() => {
      const token=localStorage.getItem('token');
      const userId=localStorage.getItem('user_id');
      console.log(token)
      console.log(userId)
      const getUserEvents = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/user-events', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
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
  
      getUserEvents();
    }, []);


 const handleLocationPos = ({ longitude, latitude }: any) => {
    setLocationPos({ longitude, latitude });
  }

  const handleCreateActive = (toggleActive: boolean | ((prevState: boolean) => boolean)) => {
    setIsCreateActive(toggleActive);
  }





  const EventHandleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', title, description, imageUrl, fromDate, toDate, inputLocation, locationPos);

    const eventData = {
      title,
      description,
      eventDateFrom: fromDate.toISOString(),
      eventDateTo: toDate.toISOString(),
      imgLink: imageUrl,
      locationData: {
        locationName: inputLocation,
        coordinates: {
          longitude: locationPos?.longitude,
          latitude: locationPos?.latitude,
        }
      },
    }

    console.log(eventData);
    submitEvent(eventData);
    handleCreateActive(false);
  };

  const submitEvent = async (eventData: any) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    try {
      const response = await fetch('http://localhost:4000/api/create-personal-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ ...eventData, userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create personal event');
      }

      const data = await response.json();
      const newEvent = data.data.event;

      console.log(newEvent);
      toast(data.message);
      setUserEvents(prevEvents => [...prevEvents, newEvent]);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Invalid token, please log in again.');
      } else {
        console.error('Error creating event:', error);
      }
    }
  }


  // export function FetchUsers() {
  //   return async (dispatch, getState) => {
  //     await axios
  //       .get(
  //         "/user/get-users",
  
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: Bearer ${getState().auth.token},
  //           },
  //           withCredentials: true
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response);
  //         dispatch(slice.actions.updateUsers({ users: response.data.data }));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  // }


  const handleInputLocation = (e: any) => {
    setInputLocation(e.target.value)
  }


  const handleBrowseMap = (event: any) => {
    event.preventDefault();
    setIsBrowseActive(!isBrowseActive);
  }

  return (
    <div className='m-5'>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Your Upcoming Events.</h1>
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

          {/* <h1 className="">Event Image</h1>

          <input
            type="text"
            placeholder='place your image url here...'
            className="p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          /> */}

          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>

          
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
      <LocalCarousel userEvents={userEvents}/>
      {userEvents && userEvents.length > 0 ? (
        <div>
          {/* {userEvents.map((event, i) => (
            <div key={i}>
            {event.title}
            </div>
          ))} */}
        </div>
      ) : (
        <p className="p-5">You don't have any upcoming events.</p>
      )}
      <Calendar events={userEvents}/>
    </div>
  )
}

export default dashboard