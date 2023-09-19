import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { Article } from "../interfaces/Article";
import { User } from "../interfaces/User";
import { useUser } from "../hooks/useUser";
import { useLocalState } from "../hooks/useLocalStorage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import styled from "styled-components";

const ArticleContainer = styled.div`
  max-width: 700px;
  margin: 50px auto;
  padding: 20px;
`;

const AuthorContainer = styled.div`
  margin: 50px 0;
`;

const AuthorButtons = styled.div`
  text-align: right;
`;

const DeleteArticleButton = styled.button`
  color: red;
  background: none;
  border: none;
`;

const EditArticleButton = styled.button`
  background: none;
  border: none;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  border-radius: 15px;
  transition: background-color 0.1s;
  &:hover {
  background-color: #ddd;
}
`

const ArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const [article, setArticle] = useState<Article | undefined>();
  const [comments, setComments] = useState([]);
  const [likedUsers, setLikedUsers] = useState<User[]>([]);
  const [articleLoading, setArticleLoading] = useState<boolean>(true);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(true);
  const [likedUsersLoading, setLikedUsersLoading] = useState<boolean>(true);
  const { user, isLoading }: { user: User | null; isLoading: boolean } =
    useUser();
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  const fetchArticle = async () => {
    try {
      const response = await axios.get<Article>(
        `http://localhost:8080/api/articles/${articleId}`
      );
      setArticle(response.data);
      setArticleLoading(false);
    } catch (error) {
      console.error("Failed to fetch article", error);
      setArticleLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/comments/article/${articleId}/base`
      );
      setComments(res.data);
      setCommentsLoading(false);
    } catch (error) {
      console.log("Failed to load comments", error);
      setCommentsLoading(false);
    }
  };

  const fetchUserLikes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/articles/${articleId}/userLikes`
      );
      setLikedUsers(res.data);
      setLikedUsersLoading(false);
    } catch (error) {
      console.log("Failed to load liked users", error);
      setLikedUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
    fetchUserLikes();
  }, [articleId]);

  useEffect(() => {
    if (!articleLoading) {
      fetchComments(); // Fetch comments only when the article has loaded
    }
  }, [articleId, articleLoading]);

  const deleteArticle = () => {
    axios
      .delete(
        `http://localhost:8080/api/articles/${articleId}/author/${user?.username}`,
        {
          headers: {
            Authorization: `Bearer ${jwt.replace(/"/g, "")}`,
          },
        }
      )
      .then(() => {
        navigate("/articles");
      })
      .catch((error) => {
        console.error("Failed to delete article", error);
      });
  };

  const likeArticle = () => {
    const reqBody = {
      id: user?.id,
    };
    axios
      .post(`http://localhost:8080/api/articles/${articleId}/like`, reqBody)
      .then(() => {
        fetchUserLikes();
      })
      .catch((error) => {
        console.error("Failed to like article", error);
      });
  };

  const unlikeArticle = () => {
    const reqBody = {
      id: user?.id,
    };
    axios
      .post(`http://localhost:8080/api/articles/${articleId}/unlike`, reqBody)
      .then(() => {
        fetchUserLikes();
      })
      .catch((error) => {
        console.error("Failed to like article", error);
      });
  };

  return (
    <ArticleContainer>
      {articleLoading ? (
        <LoadingSpinner text="Loading article" />
      ) : (
        article && (
          <div className="article">
            {user &&
              (user.role === "ADMIN" ||
                (user.role === "AUTHOR" && user.id === article.author?.id)) && (
                <AuthorButtons>
                  <EditArticleButton onClick={() => navigate(`/articles/update-article/${articleId}`)}>Edit article</EditArticleButton>
                  <span> | </span>
                  <DeleteArticleButton onClick={deleteArticle}>
                    Delete article
                  </DeleteArticleButton>
                </AuthorButtons>
              )}
            <h1>{article.title}</h1>
            <AuthorContainer>
              {article?.author && <p>Written by {article.author?.name}</p>}
              {article?.creationDateTime && (
                <p>
                  🕓{" "}
                  {new Intl.DateTimeFormat("en-UK", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  }).format(new Date(article.creationDateTime))}
                </p>
              )}
              {!likedUsersLoading && (
                <div>
                  {user ? ( // Display like button only if logged in
                    <>
                      {likedUsers.some(
                        (likedUserId) => likedUserId?.id === user?.id
                      ) ? (
                        <LikeButton onClick={unlikeArticle}>
                          <i className="fas fa-thumbs-up"></i>
                        </LikeButton>
                      ) : (
                        <LikeButton onClick={likeArticle}>
                          <i className="far fa-thumbs-up"></i>
                        </LikeButton>
                      )}
                    </>
                  ) : (
                    <LikeButton onClick={() => navigate("/login")}>
                      <i className="far fa-thumbs-up"></i> Sign in to like
                    </LikeButton>
                  )}
                  <span>
                    {" "}
                    {likedUsers.length} like
                    {likedUsers.length !== 1 ? <span>s</span> : <span></span>}
                  </span>
                </div>
              )}
            </AuthorContainer>
            {article.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            {user ? (
              <div>
                <h4>Add a comment</h4>
                <p>You are posting as {user.username}</p>
                <AddCommentForm
                  articleId={article.id}
                  user={user}
                  updateComments={() => fetchComments()}
                  replyingTo={0}
                  onCancel={() => {}}
                />
              </div>
            ) : (
              <h5>Log in to comment</h5>
            )}
            {commentsLoading ? (
              <LoadingSpinner text="Loading comments" />
            ) : (
              <CommentsList
                comments={comments}
                setComments={setComments}
                user={user}
              />
            )}
          </div>
        )
      )}
    </ArticleContainer>
  );
};

export default ArticlePage;
