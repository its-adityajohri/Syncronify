// import React from 'react'
"use client"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateClickArg } from '@fullcalendar/interaction';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlug } from 'react-icons/fa';

const Calendar = ({events}) => {
  const [formattedEvents, setFormattedEvents]=useState<any>();

  useEffect(()=>{
    const calendarEvents=events.map((event)=>({
      id: event._id,
      title: event.title,
      start: new Date(event.eventDateFrom),
      end: new Date(event.eventDateTo),
    }))
    setFormattedEvents(calendarEvents);
    console.log(calendarEvents);
  },[events])
  const router = useRouter();

  // const data = [
  //   {
  //     title: "Event 1",
  //     start,
  //     end,
  //     backgroundColor: "green",
  //     extendedProps: { id: 1 },
  //   },
  //   {
  //     title: "Event 2",
  //     start: new Date(new Date().setHours(start.getHours() + 1)),
  //     end: new Date(new Date().setHours(start.getHours() + 2)),
  //     backgroundColor: "purple",
  //     extendedProps: { id: 2 },
  //   },
  //   {
  //     title: "Event 3",
  //     start: new Date(new Date().setHours(start.getHours() + 2)),
  //     end: new Date(new Date().setHours(start.getHours() + 3)),
  //     backgroundColor: "#000",
  //     extendedProps: { id: 3 },
  //   },
  // ];

  // const [allEvents, setAllEvents]=useState(events)
  const calendarRef = useRef<any>(null);

  const handleCreateEvent=(startTime: Date)=>{
    alert(`called create Event ${startTime}`)
  }


  const handleDateClick=(e: DateClickArg)=>{
    console.log(e)
  }

  const renderEventContent=(eventInfo)=>{
    const startTime = new Date(eventInfo.event.start);
    const endTime = new Date(eventInfo.event.end);
    const formattedStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    return(
      <div>
        <div className="">{formattedStartTime}-{formattedEndTime}</div>
        <div className="">{eventInfo.event.title}</div>
      </div>
    )
  }

  const handleEventClick=(clickInfo)=>{
    const eventId=clickInfo.event.id;
    router.push(`/dashboard/event-page/${eventId}`);
  }

  return (
    <div className="p-10 m-auto w-[90%]">
    <div className="p-2 border-2 border-gray-500/70 rounded-lg w-[1000px]">
    <FullCalendar
        nowIndicator={true}
        eventDisplay='block'
        eventContent={renderEventContent}

        // when clicking on an event........
        eventClick={handleEventClick}


        editable={true}
        selectable={true}
        // views={{
        //   dayGrid: {
        //     selectable: true,
        //   },
        //   timeGrid: {
        //     selectable: true,
        //   },
        //   dayGridMonth: {
        //     selectable: true,
        //   },
        // }}
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"


        eventDrop={(info: any) => {
          const eventFiltered = formattedEvents?.filter(
            (event) => event.id !== info.event.id
          ) as any;
          // setFormattedEvents([
          //   ...eventFiltered,
          //   {
          //     title: info.event.title,
          //     start: info.event.startStr,
          //     end: info.event.endStr,
          //     id: info.event.id
          //   },
          // ]);
          alert("Dropped " + info.event.title);
        }}


        // eventResize={(info: any) => {
        //   const eventFiltered = allEvents.filter(
        //     (event) => event.extendedProps.id !== info.event.extendedProps.id
        //   ) as any;
        //   setAllEvents([
        //     ...eventFiltered,
        //     {
        //       title: info.event.title,
        //       start: info.event.startStr,
        //       end: info.event.endStr,
        //       backgroundColor: info.event.backgroundColor,
        //       extendedProps: { id: info.event.extendedProps.id },
        //     },
        //   ]);
        //   alert("Resized " + info.event.title);
        // }}


        select={(info: any) => {
          // @ts-ignore
          handleCreateEvent(start);
          // setAllEvents((allEvent) => {
          //   const newId = allEvents[allEvents.length - 1].extendedProps.id + 1;
          //   return [
          //     ...allEvent,
          //     {
          //       title: `sala ${newId}`,
          //       start: info.startStr,
          //       end: info.endStr,
          //       backgroundColor: "gray",
          //       extendedProps: { id: newId },
          //     },
          //   ];
          // });
          // alert("selected " + info.startStr + " to " + info.endStr);
        }}


        events={formattedEvents}
        locale={"eng"}
        timeZone={"UTF"}
        titleFormat={{ year: "numeric", month: "long" }}
        // allDayText={"24h"}
        allDaySlot={false}


        buttonText={{
          today: "today",
          month: "month",
          week: "week",
          day: "Day",
          list: "List",
        }}


        customButtons={{
          custom1: {
            text: 'Create New Event +',
            // hint: "Next 2022",
            click: () => {
              if (calendarRef.current) {
                console.log(
                  calendarRef.current.calendar.currentData.dateProfile.currentRange
                );
              }
              // handleCreateEvent(start)
            },
          },
          custom2: {
            text: "About page",
            click: function () {
              router.push("/about");
            },
          },
        }}


        headerToolbar={{
          left: "dayGridMonth,timeGridWeek,timeGridDay custom1",
          center: "title",
          right: "custom2 today prevYear,prev,next,nextYear",
        }}
      />
    </div>
    </div>
  )
}

export default Calendar