import type { GetStaticProps, NextPage } from "next";
import EventList from "../components/Events/EventList";
import { getFeaturedEvents } from "../helpers/apiUtils";
import { Event } from "../interfaces/events";
import styles from "../styles/Home.module.css";

interface HomeProps {
  events: Event[];
}

const Home: NextPage<HomeProps> = ({ events }) => {
  return (
    <div className={styles.container}>
      <ul>
        <EventList events={events} />
      </ul>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, // regenerate page content every 30 minutes
  };
};
