import { NextPage } from "next";
import React, { useContext, useRef } from "react";
import NotificationContext from "../../store/notificationContext";
import classes from "./NewsletterRegistration.module.css";

//FIX: event handler typing
const NewsletterRegistration: NextPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { showNotification } = useContext(NotificationContext);

  const registrationHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      event.preventDefault();

      // fetch user input (state or refs)
      // optional: validate input
      // send valid data to API

      const enteredEmail = emailInputRef.current?.value;

      showNotification({
        title: "Signing up",
        message: "Registering for newsletter",
        status: "pending",
      });

      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        showNotification({
          title: "Success",
          message: "Successfully registered for newsletter",
          status: "success",
        });
        return await response.json();
      }

      const data = await response.json();
      throw new Error(data.message) || "Something went wrong";
    } catch (error) {
      showNotification({
        title: "Error",
        message: (error as Error).message ?? "Error registering to newsletter",
        status: "error",
      });
    }
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
