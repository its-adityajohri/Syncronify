// import React from 'react'
"use client"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateClickArg } from '@fullcalendar/interaction';
import { useState } from 'react';

const Calendar = () => {
  const [allEvents, setAllEvents]=useState([{key:1, title:"test Event", date:"2024-01-06", time:"06:00:00"}])


  const handleDateClick=(e: DateClickArg)=>{
    console.log(e)
  }

  return (
    <div className="p-10 m-auto w-[90%]">
    <div className="p-2 border-2 border-gray-500/70 rounded-lg w-[1000px]">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center:'title',
          right:'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        events={
          allEvents
        //   [
        //   { title: 'Event 1', date: '2024-01-01' },
        //   { title: 'Event 2', date: '2024-01-15' },
        //   // Add more events as needed
        // ]
      }
        dateClick={handleDateClick}
        height={500}
        editable
        selectable
      />
    </div>
    </div>
  )
}

export default Calendar