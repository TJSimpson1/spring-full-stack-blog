import React from "react";
import { Comment } from "../interfaces/Comment";

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  const getTimeAgo = (timePosted: string) => {
    const currentTime: Date = new Date();
    const postedTime: Date = new Date(timePosted);
    const timeDifference: number = currentTime.getTime() - postedTime.getTime();

    const secondsAgo = Math.floor(timeDifference / 1000);
    if (secondsAgo < 60) {
      return `${secondsAgo} second${secondsAgo === 1 ? "" : "s"} ago`;
    }

    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    if (minutesAgo < 60) {
      return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
    }

    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    if (hoursAgo < 24) {
      return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
    }

    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (daysAgo < 30) {
      return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
    }

    const monthsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 31));
    if (monthsAgo < 12) {
      return `${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago`;
    }

    const yearsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
    return `${yearsAgo} year${yearsAgo === 1 ? "" : "s"} ago`;
  };

  const reversedComments = comments.slice().reverse();

  return (
    <div>
      {reversedComments.map((comment, i) => (
        <div key={i}>
          <span className="commenter">{comment.commenter.name} </span>
          <span className="time-ago">{getTimeAgo(comment.timePosted)}</span>
          <p>{comment?.commentText}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
