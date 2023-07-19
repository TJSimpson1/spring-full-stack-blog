import LoadingSpinner from "../components/LoadingSpinner";
import { useLocalState } from "../hooks/useLocalStorage";
import { useUser } from "../hooks/useUser";

const HomePage = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const { user, isLoading } = useUser();

    if (isLoading) {
        // Render a loading indicator while user data is being fetched
        return <LoadingSpinner />;
      }

    return (
        <>
        <h1>Welcome to the home page {user?.username}</h1>
        <p>JWT token is {jwt}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lectus id augue gravida, in volutpat ligula posuere. Sed congue, urna sed aliquet eleifend, turpis odio vehicula libero, nec dapibus orci arcu a lectus. Morbi auctor tortor non ipsum blandit, sed aliquam est ultrices. Fusce gravida est ac malesuada iaculis. Aliquam dignissim auctor libero, ut dapibus ligula bibendum eu. Nam pharetra justo vel finibus suscipit. Praesent rutrum ligula at tortor rhoncus viverra. Suspendisse egestas finibus feugiat. Vivamus ultrices ante sit amet justo dignissim ultrices. Mauris et arcu felis. Integer ut condimentum leo, nec blandit ex. Donec consequat varius quam, sit amet eleifend mi tempus eget.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lectus id augue gravida, in volutpat ligula posuere. Sed congue, urna sed aliquet eleifend, turpis odio vehicula libero, nec dapibus orci arcu a lectus. Morbi auctor tortor non ipsum blandit, sed aliquam est ultrices. Fusce gravida est ac malesuada iaculis. Aliquam dignissim auctor libero, ut dapibus ligula bibendum eu. Nam pharetra justo vel finibus suscipit. Praesent rutrum ligula at tortor rhoncus viverra. Suspendisse egestas finibus feugiat. Vivamus ultrices ante sit amet justo dignissim ultrices. Mauris et arcu felis. Integer ut condimentum leo, nec blandit ex. Donec consequat varius quam, sit amet eleifend mi tempus eget.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lectus id augue gravida, in volutpat ligula posuere. Sed congue, urna sed aliquet eleifend, turpis odio vehicula libero, nec dapibus orci arcu a lectus. Morbi auctor tortor non ipsum blandit, sed aliquam est ultrices. Fusce gravida est ac malesuada iaculis. Aliquam dignissim auctor libero, ut dapibus ligula bibendum eu. Nam pharetra justo vel finibus suscipit. Praesent rutrum ligula at tortor rhoncus viverra. Suspendisse egestas finibus feugiat. Vivamus ultrices ante sit amet justo dignissim ultrices. Mauris et arcu felis. Integer ut condimentum leo, nec blandit ex. Donec consequat varius quam, sit amet eleifend mi tempus eget.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lectus id augue gravida, in volutpat ligula posuere. Sed congue, urna sed aliquet eleifend, turpis odio vehicula libero, nec dapibus orci arcu a lectus. Morbi auctor tortor non ipsum blandit, sed aliquam est ultrices. Fusce gravida est ac malesuada iaculis. Aliquam dignissim auctor libero, ut dapibus ligula bibendum eu. Nam pharetra justo vel finibus suscipit. Praesent rutrum ligula at tortor rhoncus viverra. Suspendisse egestas finibus feugiat. Vivamus ultrices ante sit amet justo dignissim ultrices. Mauris et arcu felis. Integer ut condimentum leo, nec blandit ex. Donec consequat varius quam, sit amet eleifend mi tempus eget.</p>
        </> 
    )
    
}

export default HomePage;