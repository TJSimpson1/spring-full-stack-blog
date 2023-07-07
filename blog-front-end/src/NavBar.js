import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
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
                <button onClick={() => navigate('/login')}>Log in</button>
            </div>
        </nav>
    )
}

export default NavBar;