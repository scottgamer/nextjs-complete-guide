import React from "react";
import { Event } from "../../interfaces/events";
import Link from "next/link";
import Image from "next/image";

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
    <li>
      <Image src={"/" + image} alt={title} width="500" height="500" />
      <div className="">
        <div className="">
          <h2>{title}</h2>
          <div className="">
            <time>{readableDate}</time>
          </div>
          <div className="">
            <address>{formattedAddress}</address>
          </div>
        </div>

        <div className="">
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
