'use client'
import MapboxComponent from '@/components/MapBox/MapBox';
import React, { useEffect, useState } from 'react'

const LocateInMap = ({params}) => {
  const [location,setLocation]=useState<any>({});
  const {eventId}=params;
  // let tempLocation;

  useEffect(()=>{
    const token=localStorage.getItem('token');
    const userId=localStorage.getItem('userId');
    const fetchEvent = async()=>{
      try{
        const response = await fetch(`http://localhost:4000/api/event-details`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          },
          body:JSON.stringify({
            eventId
          })
        });
        if(!response.ok){
          throw new Error(response.statusText)
        }
        const {data} = await response.json()
        console.log(data);
        // tempLocation=data.event.location;
        console.log(data.event.location)
        setLocation(data.event.location.coordinates);
        // console.log(location)
      }catch(error){
        console.log(error)
      }
    };
    fetchEvent();
    
  },[])
  return (
    <div className='m-1 p-5 text-lg'>
      <h1 className="p-1 text-3xl"></h1>
      <div className="w-[90vw] h-[90vh]">
        {/* {location.locationName} */}
        {/* {location.latitude} */}
        <MapboxComponent locationData={location.coordinates}/>
      </div>
    </div>
  )
}

export default LocateInMap