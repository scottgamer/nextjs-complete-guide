import React from "react";
import { Event } from "../../interfaces/events";
import Link from "next/link";
import Image from "next/image";

import styles from "./EventItem.module.css";

const EventItem = ({ event }: { event: Event }): JSX.Element => {
  const { title, image, date, location, id } = event;

  const readableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={styles.item}>
      <Image src={"/" + image} alt={title} width="500" height="500" />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <time>{readableDate}</time>
          </div>
          <div className={styles.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
