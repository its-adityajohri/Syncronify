// 

import React from 'react'
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"
import Card from '../Card/Card'

const Carousel = () => {
  const cardDetails=[
    {
      source:"card1.svg",
      title:"Event 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, nemo?",
    },
    {
      source:"card1.svg",
      title:"Event 2",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, obcaecati.",
    },
    {
      source:"card1.svg",
      title:"Event 3",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, recusandae.",
    },
    {
      source:"card1.svg",
      title:"Event 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, quod.",
    },
    {
      source:"card1.svg",
      title:"Event 5",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, impedit!",
    },
    {
      source:"card1.svg",
      title:"Event 5",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, impedit!",
    },
    {
      source:"card1.svg",
      title:"Event 5",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, impedit!",
    },
  ]
  return (
    <div className='p-5 min-h-[250px] '>
      <div className="flex relative bg-gray-500/70">
        <h3 className="text-3xl absolute -left-10 cursor-pointer font-bold"><SlArrowLeft/></h3>
        <div className="absolute left-0 right-0 flex justify-around gap-10 mx-5 items-center">
          {cardDetails.map((event,i)=>
          <Card event={event}/>
          )}
        </div>
        <h3 className="text-3xl absolute right-20 top-[40%] cursor-pointer font-bold"><SlArrowRight/></h3>
      </div>
    </div>
  )
}

export default Carousel