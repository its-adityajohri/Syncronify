import Calendar from '@/components/Calendar/Calendar'
import React from 'react'

const dashboard = () => {
  return (
    <div className='p-5 m-5'>
      <h1 className="text-3xl font-semibold mb-10">Your Upcoming Events...</h1>
      {/* <Carousel  /> */}
      <Calendar/>
    </div>
  )
}

export default dashboard