"use client";
import EventDetailPage from "@/components/EventPage/EventDetailPage";
import { useParams} from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

interface eventData {
    id: number;
    event: object;
    description: object;
    admin: object;
  }
  
  interface event {
    community_photo: string;
    community_name: string;
    event_photo: string;
    event_title: string;
  }
  
  interface description {
    date: string;
    time: string;
    about: string;
    place: string;
  }
  
  interface admin {
    photo: string;
    name: string;
    info: string;
    email: string;
  }

const eventDetail = () => {
    const eventArray: eventData[] = [
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
        }
      ];

      const router=useRouter();
      if(!router.isReady){
        return <div>Loading.....</div>
      }
    // const {eventId} = useParams();
    return (
    <div className="">
        <h1>Event Detail page</h1>
        <EventDetailPage eventData={eventArray[eventId]}/>
    </div>
    )
};

export default eventDetail;
