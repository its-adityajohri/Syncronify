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
// import Image from 'next/image';

const cardDetails = [
  {
    source: "card1.svg",
    title: "Event 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, nemo?",
  },
  {
    source: "card1.svg",
    title: "Event 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, obcaecati.",
  },
  {
    source: "card1.svg",
    title: "Event 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, recusandae.",
  },
  {
    source: "card1.svg",
    title: "Event 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, quod.",
  },
  {
    source: "card1.svg",
    title: "Event 5",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, impedit!",
  },
  {
    source: "card1.svg",
    title: "Event 6",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, impedit!",
  },
  {
    source: "card1.svg",
    title: "Event 7",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, impedit!",
  },
];

const LocalCarousel = () => {
  return (
    <div className="p-10">
      <Carousel className="m-auto w-[90%]">
        <CarouselContent>
          {cardDetails.map((event, i) => (
            <CarouselItem className="basis-1/5" key={i}>
              <Card className="relative bg-gray-300/70 rounded-xl">
                {/* <Image alt='image' src='/carousel_bg.jpeg' fill className=''/> */}
                <CardHeader>
                  {/* <Image alt='alternate image' src='card1.svg' fill/> */}
                  <img src="card1.svg" alt="alt img"/>
                  <div className="">
                    <CardTitle>{event.title}</CardTitle>
                    {/* <CardDescription>{event.description}</CardDescription> */}
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Button>View details</Button>
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
