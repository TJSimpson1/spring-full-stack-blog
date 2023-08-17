import React, { useEffect, useState } from "react";
import ArticlesList from "../components/ArticlesList";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { Article } from "../interfaces/Article";
import { User } from "../interfaces/User";
import { useUser } from "../hooks/useUser";
import { useLocalState } from "../hooks/useLocalStorage";
import { Link } from "react-router-dom";

const ArticlesListPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState<boolean>(true);
  const { user, isLoading }: { user: User | null; isLoading: boolean } =
    useUser();

  useEffect(() => {
    fetchArticles();
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
    setArticles(articles.filter((article) => article.author?.id === user?.id));
  };

  return (
    <div>
      {articlesLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h1>Articles</h1>
          {user && (user.role === "AUTHOR" || user.role === "ADMIN") && (
            <div>
              <button onClick={showMyArticles}>Show my articles</button>
              <button onClick={fetchArticles}>Show all articles</button>
              <Link to="/articles/create-article">Create article</Link>
            </div>
            
          )}
          
          <ArticlesList articles={articles} />
        </div>
      )}
    </div>
  );
};

export default ArticlesListPage;
