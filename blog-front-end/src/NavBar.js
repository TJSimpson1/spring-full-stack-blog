import { Link, useLocation } from "react-router-dom";
import { useLocalState } from "./hooks/useLocalStorage";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [activePage, setActivePage] = useState("home");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const location = useLocation();

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setJwt("");
    window.location.href = "/";
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
        <li className={activePage === "login" ? "active nav-right" : "nav-right"}>
          {jwt === "" ? (
            <Link to="/login" onClick={() => handleNavigation("login")}>
              Log in
            </Link>
          ) : (
            <Link to="/" onClick={logout}>
              Log out
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
