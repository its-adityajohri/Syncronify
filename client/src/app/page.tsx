import Button from '@/components/Button/Button';
import Calendar from '@/components/Calendar/Calendar';
import Link from 'next/link';
// import React from 'react'

const LandingPage = () => {
  return (
    <div className='p-5'>
      <div className='flex gap-5 mt-10 items-center'>
      <h1 className=''>Nav Links-</h1>
      <Link href='dashboard'><Button title="Dashboard"/></Link>
      <Link href='dashboard/navigation'>Navigation</Link>
      <Link href='dashboard/event-page'>Events</Link>
      <Link href='dashboard/public-channels'>Public Channel</Link>
      <Link href='dashboard/public-events'>Public Events</Link>
      <Link href='dashboard/user-profile'>Your Profile</Link>
      <Link href='dashboard/your-groups'>Your Groups</Link>
      <Link href='dashboard/your-notes'>Your Notes</Link>
    </div>
    <Calendar/>
    </div>
    
  )
}

export default LandingPage;



