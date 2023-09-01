import React from "react";
import ArticleForm from "../components/ArticleForm";
import { Article } from "../interfaces/Article";

const CreateArticlePage = () => {
    const emptyArticle: Article = {
        id: 0,
        name: "",
        title: "",
        content: [],
        author: null,
        comments: [],
        creationDateTime: new Date()
      };

    return(
        <>
        <h1 className="create-article-header">Create Article</h1>
        <ArticleForm article={emptyArticle} />
        </>
    )
}

export default CreateArticlePage;