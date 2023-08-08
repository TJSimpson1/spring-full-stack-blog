import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Article {
    id: number;
    name: string;
    title: string;
    content: string[];
    author: {
        name: string;
    };
}

const ArticlePage: React.FC = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const [article, setArticle] = useState<Article | undefined>();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get<Article>(`http://localhost:8080/api/articles/${articleId}`);
                setArticle(response.data);
            } catch (error) {
                console.error("Failed to fetch article", error);
            }
        };

        fetchArticle();
    }, [articleId]);

    return (
        <div className="article-page">
            {article && (
                <div className="article">
                    <h1>{article.title}</h1>
                    <p>Author: {article.author.name}</p>
                    {article.content.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArticlePage;
