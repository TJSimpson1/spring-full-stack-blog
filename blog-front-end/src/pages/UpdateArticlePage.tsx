import React, { useEffect, useState } from "react";
import ArticleForm from "../components/ArticleForm";
import { Article } from "../interfaces/Article";
import axios from "axios";
import { useNavigate, useParams } from "react-router";



const UpdateArticlePage = () => {
    const {articleId} = useParams();
    const navigate = useNavigate();
    
  const [article, setArticle] = useState<Article>();
  const [articleLoading, setArticleLoading] = useState<boolean>(true);

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

  const handleUpdateArticle = (article: Article) => {
    // Make a PUT request to update the article
    axios
      .put(`http://localhost:8080/api/articles/${articleId}`, article)
      .then(() => {
        navigate('/articles');
      })
      .catch((error) => {
        console.error("Could not update article", error);
      });
  };

  return (
    <>
      <h1 className="create-article-header">Create Article</h1>
      {article && <ArticleForm article={article} onSubmit={handleUpdateArticle} />}
    </>
  );
};

export default UpdateArticlePage;
