"use client";
import {FaCheck, FaMapMarked, FaMarkdown, FaMarsStrokeV, FaPlus } from 'react-icons/fa';
import React, { ReactNode, useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from '@/context/LocationContext';
import getPlaces from '../MapBox/API/getPlaces';
import { Button } from '../ui/button';
import { useDropzone } from 'react-dropzone';
import { useEvent } from '@/context/EventContext';

interface CreateEventProps {
  isCreateActive: boolean;
  handleCreateActive: React.Dispatch<React.SetStateAction<boolean>>;
  handleBrowseMap: (event: any) => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({
  isCreateActive,
  handleCreateActive,
  handleBrowseMap,
}) => {
  const [suggestions, setSuggestions]=useState<{
    place_name: string;
    latitude: number;
    longitude: number;
    id: string;
  }[]>([]);

  const {createNewEvent} = useEvent();
  const {location, setLocation, handleLocation}=useLocation();

  const [eventDetail, setEventDetail]=useState<{
    title: string,
    location: string,
    description: string,
    fromDate: Date,
    toDate: Date,
    imageUrl: string,
}>({
    title: '',
    location: '',
    description: '',
    fromDate:new Date(),
    toDate:new Date(),
    imageUrl: '',
  })

  useEffect(() => {
    console.log('Location in CreateEvent updated:', location);
  }, [location]);
  

  const handleChange=(event:any)=>{
    const {name, value}=event.target;
    setEventDetail({...eventDetail, [name]:value});
  };


  const handleInputLocation= async (event: React.ChangeEvent<HTMLInputElement>)=>{
    const query=event.target.value;
    setEventDetail({...eventDetail, location:query})
    // setInputLocation(query);
    console.log(location);

    const response=await getPlaces(query);
    setSuggestions(response);
  }

  const handleSelectedSuggestion=(suggestion:any)=>{
    console.log(suggestion);
    setEventDetail({...eventDetail, location:suggestion.place_name});
    setLocation({name: suggestion.place_name, latitude: suggestion.center[0], longitude: suggestion.center[1]});
    setSuggestions([]);
  }

  // const onDrop=async(acceptedFiles: File[])=>{
  //   const  imageFile= acceptedFiles[0];
  //   setImageUrl(imageFile.name?URL.createObjectURL(imageFile):'')
  // };


  // const handleLocationChange=(latitude, longitude)=>{
  //   const newLocation={
  //     latitude: latitude,
  //     longitude: longitude,
  //   };
  //   setLocation(newLocation);
  // }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    const response = await createNewEvent(eventDetail);
    // console.log(response);
    console.log('Form submitted:', eventDetail);
    handleCreateActive(false);
  };

  return (
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
        <h1 className="text-3xl my-5 font-bold">Create Private Event</h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <h1 className="">Title</h1>
          <input
            type="text"
            name='title'
            placeholder='Event title here...'
            className="p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg"
            value={eventDetail.title}
            onChange={handleChange}
          />
          <h1 className="">Description</h1>
          <input
            type="text"
            name='description'
            placeholder='Describe your event here...'
            className="p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg"
            value={eventDetail.description}
            onChange={handleChange}
          />

          <h1 className="">Event Image</h1>

          {/* Temp Image link option */}
          <input
            type="text"
            name='imageUrl'
            placeholder='place your image url here...'
            className="p-2 bg-transparent outline-none border-gray-500/70 border-2 rounded-lg"
            value={eventDetail.imageUrl}
            onChange={handleChange}
          />

          <h1 className="font-semibold">Duration</h1>
          <div className="flex items-center gap-20">
            <div className="flex items-center gap-10">
              <h3 className="">From:</h3>
              <DatePicker
                className="bg-gray-300 flex border-2 border-gray-500/70 rounded-lg p-1 font-semibold cursor-pointer"
                name='fromDate'
                selected={eventDetail.fromDate}
                onChange={(date) => setEventDetail({...eventDetail, fromDate:date!})}
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
              <DatePicker
                className="bg-gray-300 flex border-2 border-gray-500/70 rounded-lg p-1 font-semibold cursor-pointer"
                name='toDate'
                selected={eventDetail.toDate}
                onChange={(date) => setEventDetail({...eventDetail, toDate:date!})}
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


          <h1 className="">Location</h1>
          <div className="relative flex items-center gap-20">
          <input
            type="text"
            name='location'
            className="p-2 bg-transparent outline-none border-gray-500/70 border-2 block rounded-lg w-2/3"
            placeholder="Search for location"
            value={eventDetail.location}
            onChange={handleInputLocation}
          />
          {/* Display suggestions */}
            <ul className="absolute bg-gray-200 rounded-xl backdrop-blur top-11 w-2/3 drop-shadow-xl max-h-[150px] overflow-y-scroll">
              {suggestions.map(
                (suggestion: any) =>
                  eventDetail.location?.length > 0 && (
                    <li
                      key={suggestion.id}
                      onClick={() =>handleSelectedSuggestion(suggestion)
                      }
                      className=" hover:bg-gray-500/50 cursor-pointer p-1 m-0 rounded-lg"
                    >
                      {suggestion.place_name}
                    </li>
                  )
              )}

              {/* If there are no suggestions, show 'Pick location from map'  */}
              {!suggestions.length && eventDetail.location?.length > 0 && (
                <li className="bg-gray-200 hover:bg-gray-500/50 cursor-pointer py-1">
                  Pick location from map
                </li>
              )}
            </ul>
            <Button className='flex gap-2 items-center text-md outline-2' style={{outline: location===null?"#4aca6c": '#ac1c1c'}} onClick={handleBrowseMap}>Choose from map <FaMapMarked/></Button>
            {location?.selected? <div className=" text-green-700 outline outline-2 p-1 rounded -ml-16"><FaCheck/></div>:''}
          </div>
          <div className='flex gap-10'>
            <Button className='font-semibold text-lg'>Create</Button>
            <Button className='font-semibold text-lg'>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;