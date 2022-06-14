import { NextPage } from "next";
import { useRouter } from "next/router";
import EventList from "../../components/Events/EventList";
import EventsSearch from "../../components/Events/EventsSearch";
import { getAllEvents } from "../../data/dummy-data";

const Events: NextPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (
    year: string | undefined,
    month: string | undefined
  ) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </div>
  );
};

export default Events;
