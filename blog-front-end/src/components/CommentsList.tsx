import React from "react";
import { Comment } from "../interfaces/Comment";

interface CommentsListProps {
    comments: Comment[];
  }

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
    return(
        <div>
            {comments.map(comment => (
                <p>{comment?.commentText}</p>
            ))}
        </div>
    )
}

export default CommentsList;