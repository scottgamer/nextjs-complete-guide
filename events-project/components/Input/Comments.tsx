import { useContext, useEffect, useState } from "react";

import CommentList from "./CommentList";
import NewComment from "./NewComment";
import classes from "./Comments.module.css";
import { NextPage } from "next";
import { Document } from "mongodb";
import NotificationContext from "../../store/notificationContext";
interface CommentsProps {
  eventId: string;
}

export interface Comment extends Document {
  email: string;
  name: string;
  text: string;
}

// FIX: add props
const Comments: NextPage<CommentsProps> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      if (showComments) {
        setIsFetchingComments(true);
        const response = await fetch(`/api/comments/${eventId}`);
        const data = await response.json();
        setComments(data.comments);
        setIsFetchingComments(false);
      }
    };

    getComments();
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(comment: Comment) {
    try {
      showNotification({
        title: "Sending comment",
        message: "Your comment is currently being stored into a DB",
        status: "pending",
      });
      // send data to API
      const response = await fetch(`/api/comments/${eventId}`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        showNotification({
          title: "Success!",
          message: "Your comment was saved!",
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
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}

      {/* {showComments && isFetchingComments ? (
        <p>Loading...</p>
      ) : (
        <>
          <NewComment onAddComment={addCommentHandler} />
          <CommentList comments={comments} />
        </>
      )} */}
    </section>
  );
};

export default Comments;
