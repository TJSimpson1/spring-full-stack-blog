import { useLocalState } from "../hooks/useLocalStorage";

const HomePage = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    return (
        <>
        <h1>Welcome to the home page</h1>
        <p>JWT token is {jwt}</p>
        </> 
    )
    
}

export default HomePage;