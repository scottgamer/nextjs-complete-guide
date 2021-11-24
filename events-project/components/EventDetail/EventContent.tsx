import React from "react";
import classes from "./EventContent.module.css";

function EventContent({ children }: { children: React.ReactNode }) {
  return <section className={classes.content}>{children}</section>;
}

export default EventContent;
