import { useEffect, useState } from "react";
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
import { FaPlus, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

// interface eventData {
//   id: number;
//   event: object;
//   description: object;
//   admin: object;
// }

// interface event {
//   community_photo: string;
//   community_name: string;
//   event_photo: string;
//   event_title: string;
// }

// interface description {
//   dateFrom: string;
//   timeFrom: string;
//   dateTo: string;
//   timeTo: string;
//   about: string;
//   place: string;
// }

// interface admin {
//   photo: string;
//   name: string;
//   info: string;
//   email: string;
// }

const EventPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [eventArray, setEventArray] = useState<any>([]);
  // const eventArray = [
  //   {
  //     id: 0,
  //     event: {
  //       community_photo: "/card1.svg",
  //       community_name: "Games and Sports Council IIT Kanpur",
  //       event_photo: "/card1.svg",
  //       event_title: "Event 1",
  //     },
  //     description: {
  //       dateFrom: "24/04/2024",
  //       timeFrom: "6:00 PM",
  //       dateTo: "24/04/2024",
  //       timeTo: "7:00 PM",
  //       about:
  //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolorum ullam neque, rem odio tempore, placeat harum quisquam eos quibusdam deserunt dolores commodi libero magni id voluptas natus ex ipsum. Quasi, inventore cupiditate excepturi ex nostrum voluptatum aspernatur, esse obcaecati veritatis placeat soluta itaque culpa eos doloremque et beatae iusto!",
  //       place: "Hockey Ground IITK",
  //     },
  //     admin: {
  //       photo: "/card1.svg",
  //       name: "Payal Dangi",
  //       email: "abcd@iitk.ac.in",
  //       info: "Third Year BTech student at IITK",
  //     },
  //   },
  //   {
  //     id: 1,
  //     event: {
  //       community_photo: "/card1.svg",
  //       community_name: "Games and Sports Council IIT Kanpur",
  //       event_photo: "/card1.svg",
  //       event_title: "Event 2",
  //     },
  //     description: {
  //       dateFrom: "24/04/2024",
  //       timeFrom: "6:00 PM",
  //       dateTo: "24/04/2024",
  //       timeTo: "7:00 PM",
  //       about:
  //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolorum ullam neque, rem odio tempore, placeat harum quisquam eos quibusdam deserunt dolores commodi libero magni id voluptas natus ex ipsum. Quasi, inventore cupiditate excepturi ex nostrum voluptatum aspernatur, esse obcaecati veritatis placeat soluta itaque culpa eos doloremque et beatae iusto!",
  //       place: "Hockey Ground IITK",
  //     },
  //     admin: {
  //       photo: "/card1.svg",
  //       name: "Payal Dangi",
  //       email: "abcd@iitk.ac.in",
  //       info: "Third Year BTech student at IITK",
  //     },
  //   },
  //   {
  //     id: 2,
  //     event: {
  //       community_photo: "/card1.svg",
  //       community_name: "Games and Sports Council IIT Kanpur",
  //       event_photo: "/card1.svg",
  //       event_title: "Event 3",
  //     },
  //     description: {
  //       dateFrom: "24/04/2024",
  //       timeFrom: "6:00 PM",
  //       dateTo: "24/04/2024",
  //       timeTo: "7:00 PM",
  //       about:
  //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolorum ullam neque, rem odio tempore, placeat harum quisquam eos quibusdam deserunt dolores commodi libero magni id voluptas natus ex ipsum. Quasi, inventore cupiditate excepturi ex nostrum voluptatum aspernatur, esse obcaecati veritatis placeat soluta itaque culpa eos doloremque et beatae iusto!",
  //       place: "Hockey Ground IITK",
  //     },
  //     admin: {
  //       photo: "/card1.svg",
  //       name: "Payal Dangi",
  //       email: "abcd@iitk.ac.in",
  //       info: "Third Year BTech student at IITK",
  //     },
  //   }
  // ];

  const router = useRouter();

  useEffect(() => {
    const token=localStorage.getItem('token');
    const userId=localStorage.getItem('user_id');
    console.log(token)
    console.log(userId)
    // if(!token || !userId) router.push('/')
    const getUserEvents = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/all-posted-events', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user events');
        }

        const {data} = await response.json();
        const tempEvents=data.events;
        console.log(tempEvents);
        setEventArray(tempEvents);
      } catch (error) {
        alert(error.message);
      }
    };

    getUserEvents();
  }, []);

  const handleAddToUser= async(eventId)=>{
    const token=localStorage.getItem('token');
    const userId=localStorage.getItem('user_id');
    try {
      const response = await fetch('http://localhost:4000/api/add-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId,
          userId
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user events');
      }

      const {data} = await response.json();
      // const tempEvents=data.events;
      console.log(data)
    } catch (error) {
      alert(error.message);
    }
  }

  

  const searchEvents = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-full h-full bg-white text-black max-w-screen-xl mx-auto">
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

      <div className="flex flex-wrap">
        {eventArray?.map((eventDetail,index) => (
          <Card className="relative flex-none w-[calc(33.33%-50px)] m-3 bg-gray-100 p-2 shadow-lg" key={index}>
            <CardHeader>
              <img src='/card1.svg' alt="alt img" />
              <div className="">
                <CardTitle>{eventDetail.title}</CardTitle>
              </div>
            </CardHeader>
            <div className="h-20 truncate truncate-overflow text-wrap">
              <CardContent>
                <p>{eventDetail.description}</p>
              </CardContent>
            </div>
            <CardFooter className="justify-between">
                <Button onClick={() => router.push(`/dashboard/event-page/${eventDetail._id}`)}>
                    Explore
                </Button>
                <Button onClick={()=>handleAddToUser(eventDetail._id)}>
                  Add <span className="ml-2" ><FaPlus/></span>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
