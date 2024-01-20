import Link from 'next/link';
import React from 'react'

const LandingPage = () => {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className=''>Nav Links-</h1>
      <Link href='dashboard'>Dashboard</Link>
      <Link href='dashboard/navigation'>Navigation</Link>
      <Link href='dashboard/event-page'>Events</Link>
      <Link href='dashboard/public-channels'>Public Channel</Link>
      <Link href='dashboard/public-events'>Public Events</Link>
      <Link href='dashboard/user-profile'>Your Profile</Link>
      <Link href='dashboard/your-groups'>Your Groups</Link>
      <Link href='dashboard/your-notes'>Your Notes</Link>
    </div>
  )
}

export default LandingPage;



