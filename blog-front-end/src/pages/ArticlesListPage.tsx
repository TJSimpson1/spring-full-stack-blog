import React, { useEffect, useState } from "react";
import ArticlesList from "../components/ArticlesList";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { Article } from "../interfaces/Article";

const ArticlesListPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/articles");
        setArticles(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch articles", error);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  console.log(articles)

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h1>Articles</h1>
          <ArticlesList articles={articles} />
        </div>
      )}
    </div>
  );
};

export default ArticlesListPage;
