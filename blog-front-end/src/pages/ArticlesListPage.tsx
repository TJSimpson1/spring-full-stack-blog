import React, { useEffect, useState } from "react";
import ArticlesList from "../components/ArticlesList";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { Article } from "../interfaces/Article";
import { User } from "../interfaces/User";
import { useUser } from "../hooks/useUser";
import { useLocalState } from "../hooks/useLocalStorage";

const ArticlesListPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState<boolean>(true);
  const { user, isLoading }: { user: User | null; isLoading: boolean } =
    useUser();
  const [userRole, setUserRole] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(() => {
    const getUserRole = async () => {
      if (user) {
        await axios
          .get(`http://localhost:8080/api/users/${user.username}/role`, {
            headers: {
              Authorization: `Bearer ${jwt.replace(/"/g, "")}`,
            },
          })
          .then((response) => {
            setUserRole(response.data);
          })
          .catch((error) => {
            console.error("Failed to fetch user's role", error);
          });
      }
    };

    fetchArticles();
    getUserRole();
  }, [isLoading]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/articles");
      setArticles(response.data);
      setArticlesLoading(false);
    } catch (error) {
      console.error("Failed to fetch articles", error);
      setArticlesLoading(false);
    }
  };

  const showMyArticles = () => {
    setArticles(articles.filter((article) => article.author.id === user?.id));
  };

  return (
    <div>
      {articlesLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h1>Articles</h1>
          {user && userRole === "AUTHOR" && (
            <div>
              <button onClick={showMyArticles}>Show my articles</button>
              <button onClick={fetchArticles}>Show all articles</button>
            </div>
          )}
          <ArticlesList articles={articles} />
        </div>
      )}
    </div>
  );
};

export default ArticlesListPage;
