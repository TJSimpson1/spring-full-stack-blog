import React from "react";
import ArticleForm from "../components/ArticleForm";
import { Article } from "../interfaces/Article";
import axios from "axios";
import { useNavigate } from "react-router";

const CreateArticlePage = () => {
    const navigate = useNavigate();
  const emptyArticle: Article = {
    id: 0,
    name: "",
    title: "",
    content: [],
    author: null,
    creationDateTime: new Date(),
  };

  const handleCreateArticle = (article: Article) => {
    // Make a POST request to create the article
    axios
      .post("http://localhost:8080/api/articles", article)
      .then(() => {
        navigate('/articles');
      })
      .catch((error) => {
        console.error("Could not create article", error);
      });
  };

  return (
    <>
      <h1 className="create-article-header">Create Article</h1>
      <ArticleForm article={emptyArticle} onSubmit={handleCreateArticle} />
    </>
  );
};

export default CreateArticlePage;
