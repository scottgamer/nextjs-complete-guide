import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import Notification from "../components/UI/Notification";
import { NotificationProvider } from "../store/notificationContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <Layout>
        {/* global head metadata */}
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="description" content="Find a lot of great events here" />
          <title>NextJS Events</title>
        </Head>
        <Component {...pageProps} />
        <Notification
          title={"test"}
          message={"This is a test"}
          status={"pending"}
        />
      </Layout>
    </NotificationProvider>
  );
}

export default MyApp;
