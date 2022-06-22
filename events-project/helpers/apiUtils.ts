import { Event } from "../interfaces/events";

export const getAllEvents = async () => {
  const response = await fetch(
    "https://nextjs-course-c9cb8-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const events = Object.entries(data).reduce(
    (acc, [currentKey, currentVal]) => {
      return [...acc, { ...(currentVal as Event), id: currentKey }];
    },
    [] as Event[]
  );

  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (id: string | string[]) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};

export const getFilteredEvents = async (dateFilter: {
  year: number;
  month: number;
}) => {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
