import type { NextPage } from "next";
import React, { useRef, useState } from "react";
import styles from "../styles/Home.module.css";

interface FeedbackItem {
  id: string;
  email: string;
  text: string;
}

const Home: NextPage = () => {
  const emailInput = useRef<HTMLInputElement>(null);
  const feedbackInput = useRef<HTMLTextAreaElement>(null);

  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);

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

  const loadFeedback = async () => {
    const response = await fetch("/api/feedback");
    const data = await response.json();
    setFeedbackItems(data.feedback);
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
      <hr />
      <button onClick={loadFeedback}>Load feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
