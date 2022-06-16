import { NextPage } from "next";
import { useRouter } from "next/router";
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
    return <p>Invalid filter. Please adjust your values</p>;
  }

  const filteredEvents = getFilteredEvents({ year, month });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter</p>;
  }

  return (
    <div>
      <h1>Filtered Events Page</h1>
    </div>
  );
};

export default FilteredEvents;
