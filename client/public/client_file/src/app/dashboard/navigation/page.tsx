import MapboxComponent from '@/components/MapBox/MapBox'
import React from 'react'

const navigationMap = () => {
  return (
    <div className='m-1 p-5 text-lg'>
      <h1 className="p-1 text-3xl"></h1>
      <div className="w-[90vw] h-[90vh]">
        <MapboxComponent/>
      </div>
    </div>
  )
}

export default navigationMap