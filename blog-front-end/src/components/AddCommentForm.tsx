import React, { useState } from "react";
import { User } from "../interfaces/User";
import { Comment } from "../interfaces/Comment";
import axios from "axios";

interface CommentFormProps {
  articleId: number;
  user: User | null;
  updateComments: any;
  replyingTo: number;
  onCancel: any;
}

const AddCommentForm: React.FC<CommentFormProps> = ({ articleId, user, updateComments, replyingTo, onCancel }) => {
  const [commentText, setCommentText] = useState("");
  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if(replyingTo > 0){
      await axios
      .post(`http://localhost:8080/api/comments/reply/${replyingTo}`, {
        commentText: commentText,
        commenter: user
      })
      .then(() => {
        setCommentText('');
        updateComments();
        onCancel();
      })
      .catch((error) => {
        console.error("Could not post reply", error);
      });
    } else {
      await axios
      .post(`http://localhost:8080/api/comments/article/${articleId}`, {
        commentText: commentText,
        commenter: user
      })
      .then(() => {
        setCommentText('');
        updateComments();
      })
      .catch((error) => {
        console.error("Could not post comment", error);
      });
    }
  };

  const cancelComment = () => {
    if(replyingTo !== 0){
      onCancel();
    }
    setCommentText("");
  }

  return (
    <div className="comment-form">
        <textarea 
            value={commentText}
            onChange={e => setCommentText(e.target.value)} />
        <button onClick={cancelComment}>Cancel</button>
        <button onClick={addComment}>Add comment</button>
    </div>
)
};

export default AddCommentForm;
