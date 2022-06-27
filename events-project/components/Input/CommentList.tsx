import { NextPage } from "next";
import classes from "./CommentList.module.css";
import { Comment } from "./Comments";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: NextPage<CommentListProps> = ({ comments }) => {
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
