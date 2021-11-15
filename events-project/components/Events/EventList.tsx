import { Event } from "../../interfaces/events";
import EventItem from "./EventItem";
import styles from "./EventList.module.css";

const EventList = ({ events }: { events: Event[] }): JSX.Element => {
  return (
    <ul className={styles.list}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default EventList;
