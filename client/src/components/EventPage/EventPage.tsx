import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
// import Image from "next/image";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

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

const EventPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
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

  const router = useRouter();

  const searchEvents = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const clearSearch = (): void => {
    setSearchTerm("");
  };

  return (
    <div className="w-full h-full bg-white text-black">
      <h2 className="m-3 text-3xl font-semibold">Public Events</h2>
      <div className="text-center p-2">
        <input
          type="text"
          className="w-2/3 px-4 py-2 shadow-lg outline-none border-[1px] border-gray-400 bg-white text-black rounded-full"
          style={{
            boxShadow:
              "-3px -3px 50px -4px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.2)",
          }}
          placeholder="Search..."
          value={searchTerm}
          onChange={searchEvents}
        />
        <button
          className="w-20 bg-[#0f172a] text-white py-2 m-2 rounded-full  hover:outline-none border-2 border-gray-500 hover:bg-white hover:text-[#0f172a] text-center"
          onClick={clearSearch}
        >
          <FaSearch className="text-center mx-auto"/>
        </button>
      </div>

      <div className="flex flex-wrap justify-between">
        {eventArray.map((eventDetail,index) => (
          <Card className="relative flex-none w-[calc(33.33%-50px)] m-3 bg-gray-100 p-2 shadow-lg">
            <CardHeader>
              <img src={eventDetail.event.event_photo} alt="alt img" />
              <div className="">
                <CardTitle>{eventDetail.event.event_title}</CardTitle>
              </div>
            </CardHeader>
            <div className="h-20 truncate truncate-overflow text-wrap">
              <CardContent>
                <p>{eventDetail.description.about}</p>
              </CardContent>
            </div>
            <CardFooter>
              <Button onClick={() => router.push(`/dashboard/event-page/${eventDetail.id}`)}>
                Explore
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
