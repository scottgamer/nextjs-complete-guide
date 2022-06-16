import { NextPage } from "next";
import { useRouter } from "next/router";
import EventList from "../../components/Events/EventList";
import ResultsTitle from "../../components/Events/ResultsTitle";
import Button from "../../components/UI/Button";
import ErrorAlert from "../../components/UI/ErrorAlert";
import { getFilteredEvents } from "../../data/dummy-data";

const FilteredEvents: NextPage = () => {
  const router = useRouter();

  const filteredData = router.query.slug;
  console.log(filteredData);

  if (!filteredData) {
    return <p className="center">Loading</p>;
  }

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

  const filteredEvents = getFilteredEvents({ year, month });

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

  const date = new Date(year, month - 1);

  return (
    <>
      <ResultsTitle date={date.toISOString()} />
      <EventList events={filteredEvents} />
    </>
  );
};

export default FilteredEvents;
