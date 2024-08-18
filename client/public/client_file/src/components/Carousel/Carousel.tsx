import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import Image from 'next/image';

// const cardDetails  = [
//   {
//     id: 0,
//     event: {
//       community_photo: "/card1.svg",
//       community_name: "Games and Sports Council IIT Kanpur",
//       event_photo: "/card1.svg",
//       event_title: "Event 1",
//     },
//     description: {
//       date: "24/04/2024",
//       time: "6:00 PM",
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
//       date: "24/04/2024",
//       time: "6:00 PM",
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
//       date: "24/04/2024",
//       time: "6:00 PM",
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
//     id: 3,
//     event: {
//       community_photo: "/card1.svg",
//       community_name: "Games and Sports Council IIT Kanpur",
//       event_photo: "/card1.svg",
//       event_title: "Event 3",
//     },
//     description: {
//       date: "24/04/2024",
//       time: "6:00 PM",
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
//     id: 4,
//     event: {
//       community_photo: "/card1.svg",
//       community_name: "Games and Sports Council IIT Kanpur",
//       event_photo: "/card1.svg",
//       event_title: "Event 3",
//     },
//     description: {
//       date: "24/04/2024",
//       time: "6:00 PM",
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
//     id: 5,
//     event: {
//       community_photo: "/card1.svg",
//       community_name: "Games and Sports Council IIT Kanpur",
//       event_photo: "/card1.svg",
//       event_title: "Event 3",
//     },
//     description: {
//       date: "24/04/2024",
//       time: "6:00 PM",
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
//     id: 6,
//     event: {
//       community_photo: "/card1.svg",
//       community_name: "Games and Sports Council IIT Kanpur",
//       event_photo: "/card1.svg",
//       event_title: "Event 3",
//     },
//     description: {
//       date: "24/04/2024",
//       time: "6:00 PM",
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
// ];


const LocalCarousel = ({userEvents}) => {

  const router=useRouter();
  const handleEventNavigation = (id) => {
    router.push(`/dashboard/event-page/${id}`)
  };
  return (
    <div className="p-10">
      <Carousel className="m-auto w-[1300px]">
        <CarouselContent>
          {userEvents.map((event, i) => (
            <CarouselItem className="basis-1/5">
              <Card className="relative bg-gray-300/70 rounded-xl h-[350px] flex flex-col">
                {/* <Image alt='image' src='/carousel_bg.jpeg' fill className=''/> */}
                <CardHeader>
                  {/* <Image alt='alternate image' src='card1.svg' fill/> */}
                  <img src={event.imgLink} alt="alt img" className="w-full h-32 rounded-xl object-cover"/>
                  <div className="">
                    <CardTitle className="p-2 m-auto truncate overflow-hidden text-lg h-[30px]">{event.title}</CardTitle>
                    {/* <CardDescription>{event.description}</CardDescription> */}
                  </div>
                </CardHeader>
                <CardContent className="truncate overflow-hidden text-wrap h-[100px]">
                  {event.description}
                </CardContent>
                <CardFooter>
                  <Button onClick={()=>handleEventNavigation(event._id)}>View details</Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default LocalCarousel;


