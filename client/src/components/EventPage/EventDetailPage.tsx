import React from 'react'
import { Button } from '../ui/button';

interface event {
    community_photo : string;
    community_name : string;
    event_photo : string;
    event_title : string;
}

interface description {
    date : string;
    time : string;
    about : string;
    place : string;
}

interface admin {
    photo : string;
    name : string;
    info : string;
    email : string;
}

const EventDetailPage = () => {
    const event : event = {
        community_photo : "/card1.svg",
        community_name : "Games and Sports Council IIT Kanpur",
        event_photo : "/card1.svg",
        event_title : "Event 1",
    }
    
    const description : description = {
        date : "24/04/2024",
        time : "6:00 PM",
        about : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolorum ullam neque, rem odio tempore, placeat harum quisquam eos quibusdam deserunt dolores commodi libero magni id voluptas natus ex ipsum. Quasi, inventore cupiditate excepturi ex nostrum voluptatum aspernatur, esse obcaecati veritatis placeat soluta itaque culpa eos doloremque et beatae iusto!",
        place : "Hockey Ground IITK"
    }
    
    const admin : admin = {
        photo : "/card1.svg",
        name : "Payal Dangi",
        email : "abcd@iitk.ac.in",
        info : "Third Year BTech student at IITK",
    }

    return (
        <div className='w-full h-full m-3 bg-white text-black rounded'>
            <img src={event.event_photo} alt="alt img" className='w-screen h-1/4 object-cover rounded-lg'/>
            <div className='h-40 w-40 -mt-20 ml-12'>
                <img src={event.community_photo} alt="alt img" className='absolute h-36 w-36 border-2 border-white rounded-full object-cover'/>
            </div>
            <div>
                <div>
                    <h2 className='m-8 ml-3 text-3xl font-semibold'>{event.event_title}</h2>
                    <p className='w-4/6 m-5 '>{description.about}</p>
                    <p className='w-4/6 m-2 ml-8'>{description.date}</p>
                    <p className='w-4/6 m-2 ml-8'>{description.time}</p>
                    <p className='w-4/6 m-2 ml-8'>{description.place}</p>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default EventDetailPage