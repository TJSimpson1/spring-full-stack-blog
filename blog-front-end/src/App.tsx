import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import Footer from './Footer';
import AdminRoute from './routes/AdminRoute';
import AdminPage from './pages/AdminPage';
import ForbiddenPage from './pages/Forbidden';
import PageNotFoundPage from './pages/PageNotFound';

function App() {
  return (
    <BrowserRouter>
        <div>
          <NavBar />
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminRoute >
                                                              <AdminPage />
                                                        </AdminRoute>} />
              <Route path="/forbidden" element={<ForbiddenPage />} />
              <Route path='*' element={<PageNotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;
