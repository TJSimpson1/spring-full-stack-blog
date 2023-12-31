import React, { useState } from "react";
import { Comment } from "../interfaces/Comment";
import axios from "axios";
import styled from "styled-components";
import AddCommentForm from "./AddCommentForm";
import { User } from "../interfaces/User";

const LoadRepliesButton = styled.button`
  background: none;
  margin: 0;
  border: none;
  color: blue;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const DownArrowIcon = styled.span`
  margin-left: 5px;
  font-size: 12px;
  margin-right: 5px;
`;

const ReplyButton = styled.button`
  background: none;
  margin: 0;
  font-size: 12px;
  border: none;
  cursor: pointer;
`;

interface CommentsListProps {
  comments: Comment[];
  setComments: any;
  user: User | null;
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  setComments,
  user,
}) => {
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

  const [loadedReplies, setLoadedReplies] = useState<number[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null); // State to track which comment you are replying to

  const reloadReplies = async (comment: Comment) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/comments/${comment.id}/replies`
      );
      comment.replies = res.data;

      const newReplyIndex = comments.findIndex(
        (loadedComment) => comment.id === loadedComment.id
      );

      if (newReplyIndex !== -1) {
        const updatedComments = [...comments];
        const newReply = updatedComments[newReplyIndex];

        if (newReply) {
          newReply.hasReplies = true;
        }

        // Update the state with the new comments array
        setComments(updatedComments);
      }

      setLoadedReplies((prevLoadedReplies) => [
        ...prevLoadedReplies,
        comment.id,
      ]);
    } catch (error) {
      console.log("Failed to load replies", error);
    }
  };

  const loadReplies = async (comment: Comment) => {
    try {
      if (!comment.replies) {
        const res = await axios.get(
          `http://localhost:8080/api/comments/${comment.id}/replies`
        );
        comment.replies = res.data;
      }
      toggleReplies(comment);
    } catch (error) {
      console.log("Failed to load replies", error);
    }
  };

  const toggleReplies = (comment: Comment) => {
    if (loadedReplies.includes(comment.id)) {
      setLoadedReplies((prevLoadedReplies) =>
        prevLoadedReplies.filter((id) => id !== comment.id)
      );
    } else {
      setLoadedReplies((prevLoadedReplies) => [
        ...prevLoadedReplies,
        comment.id,
      ]);
    }
  };

  const startReply = (commentId: number) => {
    setReplyingTo(commentId);
  };

  const cancelReply = () => {
    setReplyingTo(null); // Reset the state to hide the "Add Comment" form
  };

  const renderComments = (comments: Comment[], level: number = 0) => {
    return (
      <div>
        {comments.map((comment, i) => (
          <div
            key={comment.id}
            style={{ marginLeft: `${level * 20}px`, marginBottom: `10px` }}
          >
            <span className="commenter">{comment.commenter.username} </span>
            <span className="time-ago">{getTimeAgo(comment.timePosted)}</span>
            <p style={{ marginBottom: "0px" }}>{comment?.commentText}</p>
            {user && (
              <div>
                <ReplyButton onClick={() => startReply(comment.id)}>
                  Reply
                </ReplyButton>
                {replyingTo === comment.id && (
                  <AddCommentForm
                    articleId={1}
                    user={user} // Props drilling!! Need to use global state
                    updateComments={() => {
                      reloadReplies(comment);
                    }}
                    replyingTo={comment.id}
                    onCancel={cancelReply}
                  /> 
                )}
              </div>
            )}

            {comment?.hasReplies && (
              <div>
                <LoadRepliesButton onClick={() => loadReplies(comment)}>
                  <DownArrowIcon>
                    {loadedReplies.includes(comment.id) ? "▲" : "▼"}
                  </DownArrowIcon>
                  {loadedReplies.includes(comment.id)
                    ? "Hide Replies"
                    : "Show Replies"}
                </LoadRepliesButton>
                {loadedReplies.includes(comment.id) &&
                  comment.replies &&
                  renderComments(comment.replies, level + 1)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return <div>{renderComments(comments)}</div>;
};

export default CommentsList;
