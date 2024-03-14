"use client"
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


interface Event {
    id: number;
    title: string;
    description: string;
    source: string;
}

const EventPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const Cards: Event[] = [
        { id : 1, title: "Event 1", description: "Lorem", source : "/card1.svg" },
        { id : 2, title: "Event 1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae?", source : "/card1.svg" },
        { id : 3, title: "Event 1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae?", source : "/card1.svg" },
        { id : 4, title: "Event 1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae?", source : "/card1.svg" },
        { id : 5, title: "Event 1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae?", source : "/card1.svg" },
        { id : 6, title: "Event 1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae?", source : "/card1.svg" },
        { id : 7, title: "Event 1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae?", source : "/card1.svg" },
        { id : 8, title: "Event 1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae?", source : "/card1.svg" },
        { id : 9, title: "Event 1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae?", source : "/card1.svg" },
        { id : 10, title: "Event 1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae?", source : "/card1.svg" },
        // Add more event data as needed
    ];
  
    const searchEvents = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const clearSearch = (): void => {
        setSearchTerm('');
    };

    return (
        <div className="w-full h-full bg-white text-black">
            <h2 className="m-3 text-3xl font-semibold">Public Events</h2>
            <div className="search-bar text-center p-2">
                <input type="text" className="search-input w-2/3 px-4 py-2 shadow-lg outline-none border-[1px] border-gray-400 bg-white text-black rounded-full"
                style={{ boxShadow: '-3px -3px 50px -4px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.2)' }}
                placeholder="Search..."
                value={searchTerm}
                onChange={searchEvents}
                />
                <button className="w-20 bg-[#0f172a] text-white py-2 m-2 rounded-full  hover:outline-none border-2 border-gray-500 hover:bg-white p-2 hover:text-[#0f172a] text-center gap-2 text-bold"
                    onClick={clearSearch}>
                        Search
                </button>
            </div>

            <div className="flex flex-wrap justify-between">
                {Cards.map(Event => (
                    <Card className="flex-none w-[calc(33.33%-50px)] m-3 bg-gray-100 p-2 shadow-lg">
                        <CardHeader>
                            <img src={Event.source} alt="alt img"/>
                            <div className="">
                                <CardTitle>{Event.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>{Event.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button>Explore</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
       </div>
    );
};

export default EventPage;