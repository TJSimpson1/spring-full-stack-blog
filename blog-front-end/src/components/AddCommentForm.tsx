import React, { useState } from "react";
import { User } from "../interfaces/User";
import { Comment } from "../interfaces/Comment";
import axios from "axios";

interface CommentFormProps {
  articleId: number;
  user: User | null;
  updateArticle: any;
}

const AddCommentForm: React.FC<CommentFormProps> = ({ articleId, user, updateArticle }) => {
  const [commentText, setCommentText] = useState("");
  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:8080/api/comments/article/${articleId}`, {
        commentText: commentText,
        commenter: user
      })
      .then(() => {
        setCommentText('');
        updateArticle();
      })
      .catch((error) => {
        console.error("Could not post comment", error);
      });
  };

  return (
    <div className="comment-form">
        <h4>Add a comment</h4>
        {user && <p>You are posting as {user.username}</p>}
        <textarea 
            value={commentText}
            onChange={e => setCommentText(e.target.value)} />
        <button onClick={() => setCommentText("")}>Cancel</button>
        <button onClick={addComment}>Add comment</button>
    </div>
)
};

export default AddCommentForm;
