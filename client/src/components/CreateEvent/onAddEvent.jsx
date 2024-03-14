import React, { useState} from 'react';
import EventForm from './EventForm';

const App = () => {
  const [events, setEvents] = useState([]);

  const handleAddEvent = (event) => {
    // Update the events state with the new event
    setEvents([...events, event]);
  };

  return (
    <div>
      <h1>Event Management</h1>
      <EventForm onAddEvent={handleAddEvent} />
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <h2>{event.eventName}</h2>
            <p>{event.startDate} - {event.endDate}</p>
            <p>{event.audience}</p>
            <p>{event.description}</p>
            <img src={event.image} alt={event.eventName} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
