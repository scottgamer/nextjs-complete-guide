import type { NextPage } from "next";
import EventList from "../components/Events/EventList";
import { getFeaturedEvents } from "../data/dummy-data";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div className={styles.container}>
      <ul>
        <EventList events={featuredEvents} />
      </ul>
    </div>
  );
};

export default Home;
