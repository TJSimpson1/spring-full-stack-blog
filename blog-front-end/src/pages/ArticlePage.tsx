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
    axios.delete(`http://localhost:8080/api/articles/${articleId}/author/${user?.username}`, {
      headers: {
        Authorization: `Bearer ${jwt.replace(/"/g, "")}`,
      },
    })
    .then(() => {navigate("/articles")})
    .catch(error => {
      console.error("Failed to delete article", error);
    })
  }

  return (
    <div className="article-page">
      {articleLoading ? (
        <LoadingSpinner />
      ) : (
        article && (
          <div className="article">
            <h1>{article.title}</h1>
            <p>Author: {article.author?.name}</p>
            {user && (user.role === "ADMIN" || (user.role === "AUTHOR" && user.id === article.author?.id)) && <div><button onClick={deleteArticle}>Delete article</button></div>}
            {article.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <h3>Comments:</h3>
            {user && <AddCommentForm articleId={article.id} user={user} updateArticle={() => fetchArticle()} />}
            <CommentsList comments={article.comments} />
          </div>
        )
      )}
    </div>
  );
};

export default ArticlePage;
