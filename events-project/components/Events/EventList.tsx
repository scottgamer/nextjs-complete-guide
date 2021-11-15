import { Event } from "../../interfaces/events";
import EventItem from "./EventItem";

const EventList = ({ events }: { events: Event[] }): JSX.Element => {
  console.log(events);
  return (
    <ul>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default EventList;
