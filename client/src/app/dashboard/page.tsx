import Calendar from '@/components/Calendar/Calendar'
import Carousel from '@/components/Carousel/Carousel'
import React from 'react'

const dashboard = () => {
  return (
    <div className='p-5 m-5'>
      <h1 className="text-3xl font-semibold">Your Upcoming Events...</h1>
      <div className="p-5 mb-10">
        <Carousel  />
      </div>
      <Calendar/>
    </div>
  )
}

export default dashboard