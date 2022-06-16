import { NextPage } from "next";
import { useRouter } from "next/router";
import EventContent from "../../components/EventDetail/EventContent";
import EventLogistics from "../../components/EventDetail/EventLogistics";
import EventSummary from "../../components/EventDetail/EventSummary";
import ErrorAlert from "../../components/UI/ErrorAlert";
import { getEventById } from "../../data/dummy-data";

const EventDetail: NextPage = () => {
  const router = useRouter();

  const eventId: string | string[] | undefined = router.query.eventId;
  const event = getEventById(eventId);

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
