"use client";

import React, { createContext, useContext } from "react";

interface EventContextType{
  createNewEvent: (eventData: EventData)=> Promise<any>;
};

interface EventData{
  title: string,
  location: string,
  description: string,
  fromDate: Date,
  toDate: Date,
  imageUrl: string,
}

const EventContext=createContext<EventContextType| null>(null);

export const EventProvider: React.FC<{children:React.ReactNode}>=({children})=>{
  // const []

  const createNewEvent=async (eventData: EventData)=>{
    console.log('event created successfully!!!');
  };

  return (
    <EventContext.Provider value={{createNewEvent}}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent=()=>{
  const context=useContext(EventContext);
  if(!context){
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};