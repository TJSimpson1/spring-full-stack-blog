import React, { useEffect, useState } from "react";
import ArticlesList from "../components/ArticlesList";
import axios from "axios";

const ArticlesListPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/articles");
                setArticles(response.data);
            } catch (error) {
                console.error("Failed to fetch articles", error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <>
            <h1>Articles</h1>
            <ArticlesList articles={articles} />
        </>
    );
};

export default ArticlesListPage;
