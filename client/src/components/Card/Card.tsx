import React from 'react'
import "./Card.css"

export interface CardProps {
  index: number;
  activeIndex: number;
  children?: React.ReactNode;
}

const Card = ({event}) => {
  
  return (
    <>
      <div className = "absolute h-full w-full cursor-pointer overflow-hidden drop-shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-700 ease-in-out">
        <div className ="flex flex-col items-center w-52 bg-white rounded-xl">
            <img className = "p-2 w-30 rounded-xl object-cover" src = {event.source} alt="Raw Image" />
            <div className = "p-3 w-30">
                <h2 className = "font-bold text-large ">{event.title}</h2>
                <p className = "text-sm text-gray-600">{event.description}</p>
            </div>
            <div className="flex flex-row justify-center item-center p-2 w-full">
                <button className ="text-white bg-sky-500 text-sm px-3 py-1 rounded-md hover:bg-purple-700">Explore</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Card