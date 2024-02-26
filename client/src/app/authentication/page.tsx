"use client"

import Login from '@/components/Login/Login'
import UserRegister from '@/components/UserRegister/UserRegister'
import React, { useState } from 'react'

const Authentication = () => {
  const[newUser, setNewUser]=useState(false);

  const handleClick=()=>{
    setNewUser(!newUser);
  }


  return (
    <div className='bg-cover relative bg-center h-screen flex items-center justify-center' style={{ backgroundImage: `url('card1.svg')` }}>
      {/* <div className="absolute top-0 bottom-0 left-0 right-0 bg-inherit blur-md contents"></div> */}
      {!newUser?
      <Login handleClick={()=>handleClick()}/>:
      <UserRegister handleClick={()=>handleClick()}/>}
    </div>
  )
}

export default Authentication