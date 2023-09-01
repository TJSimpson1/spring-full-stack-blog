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
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const AuthorContainer = styled.div`
  margin: 50px 0;
`;

const AuthorButtons = styled.div`
text-align: right;
`

const DeleteArticleButton = styled.button`
color: red;
background: none;
border: none;
`;

const EditArticleButton = styled.button`
background: none;
border: none;
`;

const ArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const [article, setArticle] = useState<Article | undefined>();
  const [articleLoading, setArticleLoading] = useState<boolean>(true);
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
  useEffect(() => {
    fetchArticle();
  }, [articleId]);

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

  return (
    <ArticleContainer>
      {articleLoading ? (
        <LoadingSpinner />
      ) : (
        article && (
          <div className="article">
            {user &&
              (user.role === "ADMIN" ||
                (user.role === "AUTHOR" && user.id === article.author?.id)) && (
                <AuthorButtons>
                  <EditArticleButton>Edit article</EditArticleButton>
                  <span> | </span>
                  <DeleteArticleButton onClick={deleteArticle}>Delete article</DeleteArticleButton>
                </AuthorButtons>
              )}
            <h1>{article.title}</h1>
            <AuthorContainer>{article?.author && <p>Written by {article.author?.name}</p>}
            {article?.creationDateTime && (
              <p>
                🕓{" "}
                {new Intl.DateTimeFormat("en-US", {
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
            </AuthorContainer>
            {article.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            {user ? (
              <AddCommentForm
                articleId={article.id}
                user={user}
                updateArticle={() => fetchArticle()}
              />
            ) : (
              <h5>Log in to comment</h5>
            )}
            <CommentsList comments={article.comments} />
          </div>
        )
      )}
    </ArticleContainer>
  );
};

export default ArticlePage;
