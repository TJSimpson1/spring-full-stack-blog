import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./Footer";
import AdminRoute from "./routes/AdminRoute";
import AuthorRoute from "./routes/AuthorRoute";
import AdminPage from "./pages/AdminPage";
import ForbiddenPage from "./pages/Forbidden";
import PageNotFoundPage from "./pages/PageNotFound";
import ArticlesListPage from "./pages/ArticlesListPage";
import ArticlePage from "./pages/ArticlePage";
import CreateArticlePage from "./pages/CreateArticlePage";
import CreateAccountPage from "./pages/CreateAccountPage";
import UpdateArticlePage from "./pages/UpdateArticlePage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articles" element={<ArticlesListPage />} />
            <Route path="/article/:articleId" element={<ArticlePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
            <Route
              path="/articles/create-article"
              element={
                <AuthorRoute>
                  <CreateArticlePage />
                </AuthorRoute>
              }
            />
            <Route
              path="/articles/update-article/:articleId"
              element={
                <AuthorRoute>
                  <UpdateArticlePage />
                </AuthorRoute>
              }
            />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="*" element={<PageNotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
