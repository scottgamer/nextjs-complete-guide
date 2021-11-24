import { NextPage } from "next";
import { useRouter } from "next/router";
import EventContent from "../../components/EventDetail/eventContent";
import EventLogistics from "../../components/EventDetail/eventLogistics";
import EventSummary from "../../components/EventDetail/eventSummary";
import { getEventById } from "../../data/dummy-data";

const EventDetail: NextPage = () => {
  const router = useRouter();

  const eventId: string | string[] | undefined = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return <p>No event found!</p>;
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
