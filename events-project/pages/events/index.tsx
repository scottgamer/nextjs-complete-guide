import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import EventList from "../../components/Events/EventList";
import EventsSearch from "../../components/Events/EventsSearch";
import { getAllEvents } from "../../helpers/apiUtils";
import { Event } from "../../interfaces/events";

interface EventsProps {
  events: Event[];
}

const Events: NextPage<EventsProps> = ({ events }) => {
  // const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (
    year: string | undefined,
    month: string | undefined
  ) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};

export default Events;
