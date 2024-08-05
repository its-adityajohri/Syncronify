// pages/events/[eventId].js
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


  return (
    <div>
      <EventDetailPage eventId={eventId} />
      {/* Add event details */}
    </div>
  );
};

export default EventDetailPage1;
