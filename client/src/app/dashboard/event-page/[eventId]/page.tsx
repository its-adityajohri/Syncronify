// pages/events/[eventId].js

import { useRouter, useSearchParams } from "next/navigation";
import EventDetailPage from "@/components/EventPage/EventDetailPage";

// import { useRouter } from 'next/router';

const EventDetailPage1 = ({params}) => {
const {eventId} = params;
  interface eventArray {
    id: number;
    event: object;
    description: object;
    admin: object;
  }

  const eventArray : eventArray[] = [
    {
      id: 0,
      event: {
        community_photo: "/card1.svg",
        community_name: "Games and Sports Council IIT Kanpur",
        event_photo: "/card1.svg",
        event_title: "Event 1",
      },
      description: {
        date: "24/04/2024",
        time: "6:00 PM",
        about:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolorum ullam neque, rem odio tempore, placeat harum quisquam eos quibusdam deserunt dolores commodi libero magni id voluptas natus ex ipsum. Quasi, inventore cupiditate excepturi ex nostrum voluptatum aspernatur, esse obcaecati veritatis placeat soluta itaque culpa eos doloremque et beatae iusto!",
        place: "Hockey Ground IITK",
      },
      admin: {
        photo: "/card1.svg",
        name: "Payal Dangi",
        email: "abcd@iitk.ac.in",
        info: "Third Year BTech student at IITK",
      },
    },
    {
      id: 1,
      event: {
        community_photo: "/card1.svg",
        community_name: "Games and Sports Council IIT Kanpur",
        event_photo: "/card1.svg",
        event_title: "Event 2",
      },
      description: {
        date: "24/04/2024",
        time: "6:00 PM",
        about:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolorum ullam neque, rem odio tempore, placeat harum quisquam eos quibusdam deserunt dolores commodi libero magni id voluptas natus ex ipsum. Quasi, inventore cupiditate excepturi ex nostrum voluptatum aspernatur, esse obcaecati veritatis placeat soluta itaque culpa eos doloremque et beatae iusto!",
        place: "Hockey Ground IITK",
      },
      admin: {
        photo: "/card1.svg",
        name: "Payal Dangi",
        email: "abcd@iitk.ac.in",
        info: "Third Year BTech student at IITK",
      },
    },
    {
      id: 2,
      event: {
        community_photo: "/card1.svg",
        community_name: "Games and Sports Council IIT Kanpur",
        event_photo: "/card1.svg",
        event_title: "Event 3",
      },
      description: {
        date: "24/04/2024",
        time: "6:00 PM",
        about:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolorum ullam neque, rem odio tempore, placeat harum quisquam eos quibusdam deserunt dolores commodi libero magni id voluptas natus ex ipsum. Quasi, inventore cupiditate excepturi ex nostrum voluptatum aspernatur, esse obcaecati veritatis placeat soluta itaque culpa eos doloremque et beatae iusto!",
        place: "Hockey Ground IITK",
      },
      admin: {
        photo: "/card1.svg",
        name: "Payal Dangi",
        email: "abcd@iitk.ac.in",
        info: "Third Year BTech student at IITK",
      },
    },
  ];
  const selectedEvent = eventArray.find((event)=>event.id.toString()===eventId)

  return (
    <div>
      <EventDetailPage eventData={selectedEvent} />
      {/* Add event details */}
    </div>
  );
};

export default EventDetailPage1;
