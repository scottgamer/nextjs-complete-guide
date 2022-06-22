import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import EventContent from "../../components/EventDetail/EventContent";
import EventLogistics from "../../components/EventDetail/EventLogistics";
import EventSummary from "../../components/EventDetail/EventSummary";
import ErrorAlert from "../../components/UI/ErrorAlert";
import { getEventById, getFeaturedEvents } from "../../helpers/apiUtils";
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
      <Head>
        <meta name="description" content={event.description} />
        <title>{event.title}</title>
      </Head>
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
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  // set fallback true, since there are more pages than the ones pre-generated
  return { paths, fallback: true };
};
