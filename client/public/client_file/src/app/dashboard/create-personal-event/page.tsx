"use client"

import CreateEvent from '@/components/CreateEvent/CreateEvent'
import {EventData} from '@/components/CreateEvent/type'
import React from 'react'

const personalEvents = () => {
  return (
    <CreateEvent onAddEvent={function (event: EventData): void {

    } }/>
  )
}

export default personalEvents