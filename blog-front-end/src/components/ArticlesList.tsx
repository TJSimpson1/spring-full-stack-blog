import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Article } from "../interfaces/Article";

interface ArticlesListProps {
  articles: Article[];
}

const ArticleContainer = styled.div`
    max-width: 700px;
    margin: auto;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: inherit;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px; 
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  return (
    <ArticleContainer>
     {articles.map(article => (
            <StyledLink key={article.name} to={`/article/${article.id}`}>
                <h3>{article.title}</h3>
                {article.author && <h6>By {article.author.name}</h6>}
                <p>{article.content[0].substring(0, 150)}...</p>
            </StyledLink>
        ))}
    </ArticleContainer>
  );
};

export default ArticlesList;
