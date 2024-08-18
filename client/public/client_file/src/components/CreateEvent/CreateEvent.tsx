"use client";
import {FaMapMarked, FaPlus } from 'react-icons/fa';
import React, { ReactNode, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocationContext } from '@/context/LocationContext';
import getPlaces from '../MapBox/API/getPlaces';
import { Button } from '../ui/button';
import { useDropzone } from 'react-dropzone';

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
  const [title, setTitle] = useState('');
  const [inputLocation, setInputLocation]=useState('');
  // const [suggestions, setSuggestions]=useState<{
  //   place_name: string;
  //   latitude: number;
  //   longitude: number;
  //   id: string;
  // }[]>([]);
  const [description, setDescription] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const {location, setLocation, handleLocation}=useLocationContext();
  const [imageUrl, setImageUrl]=useState<string>("");


  const handleInputLocation= async (event: React.ChangeEvent<HTMLInputElement>)=>{
    setInputLocation(event.target.value);
    setLocation({name:inputLocation})
    console.log(location);
  }

  // const handleSelectedSuggestion=(suggestion:any)=>{
  //   console.log(suggestion)
  //   setInputLocation(suggestion.place_name)
  //   setLocation({name: suggestion.place_name, latitude: suggestion.center[0], longitude: suggestion.center[1]})
  //   // setSuggestions([]);
  // }

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', title, description, fromDate, toDate, location);
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
        <h1 className="text-3xl my-5 font-bold">Create Event</h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
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
              <DatePicker
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
              <DatePicker
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


          <h1 className="">Vanue of Event</h1>
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
  );
};

export default CreateEvent;

