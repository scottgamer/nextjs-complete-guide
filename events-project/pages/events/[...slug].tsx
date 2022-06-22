import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import EventList from "../../components/Events/EventList";
import ResultsTitle from "../../components/Events/ResultsTitle";
import Button from "../../components/UI/Button";
import ErrorAlert from "../../components/UI/ErrorAlert";
import { getFilteredEvents } from "../../helpers/apiUtils";
import { Event } from "../../interfaces/events";

interface FilteredEventsProps {
  hasError: boolean;
  filteredEvents: Event[];
  date: {
    year: number;
    month: number;
  };
}

const FilteredEvents: NextPage<FilteredEventsProps> = ({
  hasError,
  filteredEvents,
  date,
}) => {
  // const router = useRouter();

  // const filteredData = router.query.slug;

  // if (!filteredData) {
  //   return <p className="center">Loading</p>;
  // }

  // const filteredYear = filteredData[0];
  // const filteredMonth = filteredData[1];

  // const year = +filteredYear;
  // const month = +filteredMonth;

  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  // const filteredEvents = getFilteredEvents({ year, month });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const parsedDate = new Date(date.year, date.month - 1);

  return (
    <>
      <ResultsTitle date={parsedDate.toISOString()} />
      <EventList events={filteredEvents} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  const filteredData = params!.slug!;

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const year = +filteredYear;
  const month = +filteredMonth;

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return {
      props: { hasError: true },
      // possible alternatives to error'ed event filter
      // notFound: true,
      // redirect: { destination: "/error" },
    };
  }

  const filteredEvents = await getFilteredEvents({ year, month });

  return {
    props: {
      filteredEvents,
      date: {
        year,
        month,
      },
    },
  };
};

export default FilteredEvents;
