import { Link, useNavigate } from "react-router-dom";
import { useLocalState } from "./hooks/useLocalStorage";
import { useState } from "react";

const NavBar = () => {
    const [activePage, setActivePage] = useState('home');
    const navigate = useNavigate();
    const [jwt, setJwt] = useLocalState("", "jwt");
    const logout = () => {
        localStorage.removeItem("jwt");
        setJwt("");
        window.location.href = "/";;
    }
    return(
        <nav className="navbar">
            <ul>
                <li className={activePage === 'home' ? 'active' : ''}>
                    <Link to="/" onClick={() => setActivePage('home')}>Home</Link>
                </li>
                <li className={activePage === 'about' ? 'active' : ''}>
                    <Link to="/about" onClick={() => setActivePage('about')}>About</Link>
                </li>
            </ul>
            <div className="nav-button">
                {jwt === "" ? <button onClick={() => navigate('/login')}>Log in</button> : <button onClick={() => logout()}>Log out</button>}
            </div>
        </nav>
    )
}

export default NavBar;