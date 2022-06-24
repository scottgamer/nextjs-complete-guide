import type { NextPage } from "next";
import React, { useRef } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const emailInput = useRef<HTMLInputElement>(null);
  const feedbackInput = useRef<HTMLTextAreaElement>(null);

  const submitForm = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const enteredEmail = emailInput.current?.value;
    const enteredFeedback = feedbackInput.current?.value;

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };

    const response = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <h1>The Home Page</h1>
      <form>
        <div>
          <label htmlFor="email">Email address</label>
          <input ref={emailInput} type="email" id="email" />
        </div>

        <div>
          <label htmlFor="feedback">Your feedback </label>
          <textarea ref={feedbackInput} id="feedback" rows={5} />
        </div>
        <button onClick={submitForm}>Submit feedback</button>
      </form>
    </div>
  );
};

export default Home;
