import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import { FeedbackItem } from "..";

interface FeedbackPageProps {
  feedbackItems: FeedbackItem[];
}

const FeedbackPage: NextPage<FeedbackPageProps> = ({ feedbackItems }) => {
  const [feedbackData, setFeedbackData] = useState<FeedbackItem>();

  const loadFeedback = async (id: string) => {
    const response = await fetch(`/api/${id}`);
    const data = await response.json();
    setFeedbackData(data.feedback);
  };

  return (
    <>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => loadFeedback(item.id)}>Show Details</button>
          </li>
        ))}
      </ul>

      {feedbackData ? <p>{feedbackData.email}</p> : null}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // in this case, it's not recommended to use fetch to access an api route
  // instead, it's recommended to add the server-side logic for fetching/querying data since it'll not be available in the client bundle

  // TODO: same logic for getting data as in api/feedback api route
  return {
    props: {
      feedbackItems: [],
    },
  };
};

export default FeedbackPage;
