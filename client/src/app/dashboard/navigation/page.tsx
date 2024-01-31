import MapboxComponent from '@/components/MapBox/MapBox'
import React from 'react'

const navigationMap = () => {
  return (
    <div className='m-10 p-5 text-lg'>
      <h1 className="p-5 text-3xl"></h1>
      <div className="">
        <MapboxComponent/>
      </div>
    </div>
  )
}

export default navigationMap