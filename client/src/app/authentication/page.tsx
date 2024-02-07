import Login from '@/components/Login/Login'
import React, { useState } from 'react'

const Authentication = () => {
  return (
    <div className='bg-cover relative bg-center h-screen flex items-center justify-center' style={{ backgroundImage: `url('card1.svg')` }}>
      {/* <div className="absolute top-0 bottom-0 left-0 right-0 bg-inherit blur-md contents"></div> */}
      <Login/>
    </div>
  )
}

export default Authentication