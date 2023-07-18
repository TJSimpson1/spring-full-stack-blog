import { Link, useNavigate } from "react-router-dom";
import { useLocalState } from "./hooks/useLocalStorage";

const NavBar = () => {
    const navigate = useNavigate();
    const [jwt, setJwt] = useLocalState("", "jwt");
    const logout = () => {
        localStorage.removeItem("jwt");
        setJwt("");
        navigate('/');
    }
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
            <div className="nav-right">
                {jwt === "" ? <button onClick={() => navigate('/login')}>Log in</button> : <button onClick={() => logout()}>Log out</button>}
            </div>
        </nav>
    )
}

export default NavBar;