import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import EventContent from "../../components/EventDetail/EventContent";
import EventLogistics from "../../components/EventDetail/EventLogistics";
import EventSummary from "../../components/EventDetail/EventSummary";
import ErrorAlert from "../../components/UI/ErrorAlert";
import { getEventById, getAllEvents } from "../../helpers/apiUtils";
import { Event } from "../../interfaces/events";

interface EventDetailProps {
  event: Event;
}

const EventDetail: NextPage<EventDetailProps> = ({ event }) => {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetail;

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const eventId = params!.eventId;

  if (!eventId) {
    return {
      notFound: true,
    };
  }

  const event = await getEventById(eventId);

  return {
    props: {
      event,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return { paths, fallback: false };
};
