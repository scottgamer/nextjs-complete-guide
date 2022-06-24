import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import EventList from "../components/Events/EventList";
import NewsletterRegistration from "../components/Input/NewsletterRegistration";
import { getFeaturedEvents } from "../helpers/apiUtils";
import { Event } from "../interfaces/events";
import styles from "../styles/Home.module.css";

interface HomeProps {
  events: Event[];
}

const Home: NextPage<HomeProps> = ({ events }) => {
  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Find a lot of great events here" />
        <title>NextJS Events</title>
      </Head>
      <ul>
        <NewsletterRegistration />
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
