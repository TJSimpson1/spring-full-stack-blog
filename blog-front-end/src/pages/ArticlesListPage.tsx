import React, { useEffect, useState } from "react";
import ArticlesList from "../components/ArticlesList";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { Article } from "../interfaces/Article";
import { User } from "../interfaces/User";
import { useUser } from "../hooks/useUser";
import { useLocalState } from "../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";


const mainColor = "#9000ff"; // Define your main color here

const ArticlesContainer = styled.div`
  margin: 30px;

  button {
    margin: 5px;
  }
`;

const StyledLink = styled(Link)`
display: block;
width: 120px;
padding: 5px;
background: #00f;
text-align: center;
margin-left: auto;
text-decoration: none;
border-radius: 5px;
color: #fff;

&:hover {
  background-color: #00b;
  color: white;
}
`;

const FilterArticlesContainer = styled.div`
  text-align: center;
  margin: 10px;
`;

const ButtonStyle = css`
  margin: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;


const ShowAllButton = styled.button<{ isShowingAllArticles: boolean }>`
  ${ButtonStyle}
  ${(props) =>
    props.isShowingAllArticles
      ? css`
          background-color: ${mainColor};
          color: #fff;
          &:hover {
            background-color: ${mainColor};
          }
        `
      : css`
          background-color: #ccc;
          color: #333;
          &:hover {
            background-color: ${mainColor};
            color: #fff;
          }
        `}
`;

const ShowMyButton = styled.button<{ isShowingAllArticles: boolean }>`
  ${ButtonStyle}
  ${(props) =>
    !props.isShowingAllArticles
      ? css`
          background-color: ${mainColor};
          color: #fff;
          &:hover {
            background-color: ${mainColor};
          }
        `
      : css`
          background-color: #ccc;
          color: #333;
          &:hover {
            background-color: ${mainColor};
            color: #fff;
          }
        `}
`;

const ArticlesListPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState<boolean>(true);
  const [isShowingAllArticles, setIsShowingAllArticles] = useState(true);
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
      setIsShowingAllArticles(true);
    } catch (error) {
      console.error("Failed to fetch articles", error);
      setArticlesLoading(false);
    }
  };

  const showMyArticles = () => {
    setArticles(articles.filter((article) => article.author?.id === user?.id));
    setIsShowingAllArticles(false);
  };

  return (
    <>
      {articlesLoading ? (
        <LoadingSpinner text="Loading articles" />
      ) : (
        <ArticlesContainer>
          {user && (user.role === "AUTHOR" || user.role === "ADMIN") && (
              <StyledLink to="/articles/create-article">Create article</StyledLink>
          )}
          {user && (user.role === "AUTHOR" || user.role === "ADMIN") && (
            <FilterArticlesContainer>
            <ShowAllButton
              onClick={fetchArticles}
              isShowingAllArticles={isShowingAllArticles}
            >
              Show all articles
            </ShowAllButton>
              <ShowMyButton
                onClick={showMyArticles}
                isShowingAllArticles={isShowingAllArticles}
              >
                Show my articles
              </ShowMyButton>
            </FilterArticlesContainer>
          )}
          <ArticlesList articles={articles} />
        </ArticlesContainer>
      )}
    </>
  );
};

export default ArticlesListPage;
