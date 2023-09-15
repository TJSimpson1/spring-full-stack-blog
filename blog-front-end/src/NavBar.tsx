import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const [activePage, setActivePage] = useState("home");
  const [jwt, setJwt] = useState(localStorage.getItem("jwt") || ""); // Initialize jwt from local storage

  const location = useLocation();

  const handleNavigation = (page: string) => {
    setActivePage(page);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setJwt(""); // Update the jwt state
  };

  useEffect(() => {
    const path = location.pathname.substring(1);
    setActivePage(path || "home");
  }, [location]);

  return (
    <nav className="navbar">
      <ul>
        <li className={activePage === "home" ? "active" : ""}>
          <Link to="/" onClick={() => handleNavigation("home")}>
            Home
          </Link>
        </li>
        <li className={activePage === "about" ? "active" : ""}>
          <Link to="/about" onClick={() => handleNavigation("about")}>
            About
          </Link>
        </li>
        <li className={activePage === "articles" ? "active" : ""}>
          <Link to="/articles" onClick={() => handleNavigation("articles")}>
            Articles
          </Link>
        </li>
        <li className={activePage === "login" ? "active nav-right" : "nav-right"}>
          {jwt === "" ? (
            <Link to="/login" onClick={() => handleNavigation("login")}>
              Log in
            </Link>
          ) : (
            <Link to="#" onClick={logout}>
              Log out
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
