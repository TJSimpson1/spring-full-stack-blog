import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLocalState } from "../hooks/useLocalStorage";
import { useUser } from "../hooks/useUser";
import { User } from "../interfaces/User";
import styled from "styled-components";

const HomePage = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const { user, isLoading }: { user: User | null; isLoading: boolean } =
    useUser();

  if (isLoading) {
    // Render a loading indicator while user data is being fetched
    return <LoadingSpinner />;
  }

  const DivContainer = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: #222;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  `;

  const InfoBox = styled.div`
  padding: 20px;
  background-color: #333;
  border-radius: 8px;
  color: #fff;
  text-align: center;
  flex: 1;
  margin: 0 10px;
  `;

  return (
    <>
      <DivContainer>
        <InfoBox>
          <h2>Info Box 1</h2>
          <p>This is the first information box.</p>
        </InfoBox>
        <InfoBox>
          <h2>Info Box 2</h2>
          <p>This is the second information box.</p>
        </InfoBox>
        <InfoBox>
          <h2>Info Box 3</h2>
          <p>This is the third information box.</p>
        </InfoBox>
      </DivContainer>
      <div className="text-container">
        <h1>Welcome to the home page {user?.username}</h1>
        <p>JWT token is {jwt}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          efficitur lectus id augue gravida, in volutpat ligula posuere. Sed
          congue, urna sed aliquet eleifend, turpis odio vehicula libero, nec
          dapibus orci arcu a lectus. Morbi auctor tortor non ipsum blandit, sed
          aliquam est ultrices. Fusce gravida est ac malesuada iaculis. Aliquam
          dignissim auctor libero, ut dapibus ligula bibendum eu. Nam pharetra
          justo vel finibus suscipit. Praesent rutrum ligula at tortor rhoncus
          viverra. Suspendisse egestas finibus feugiat. Vivamus ultrices ante
          sit amet justo dignissim ultrices. Mauris et arcu felis. Integer ut
          condimentum leo, nec blandit ex. Donec consequat varius quam, sit amet
          eleifend mi tempus eget.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          efficitur lectus id augue gravida, in volutpat ligula posuere. Sed
          congue, urna sed aliquet eleifend, turpis odio vehicula libero, nec
          dapibus orci arcu a lectus. Morbi auctor tortor non ipsum blandit, sed
          aliquam est ultrices. Fusce gravida est ac malesuada iaculis. Aliquam
          dignissim auctor libero, ut dapibus ligula bibendum eu. Nam pharetra
          justo vel finibus suscipit. Praesent rutrum ligula at tortor rhoncus
          viverra. Suspendisse egestas finibus feugiat. Vivamus ultrices ante
          sit amet justo dignissim ultrices. Mauris et arcu felis. Integer ut
          condimentum leo, nec blandit ex. Donec consequat varius quam, sit amet
          eleifend mi tempus eget.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          efficitur lectus id augue gravida, in volutpat ligula posuere. Sed
          congue, urna sed aliquet eleifend, turpis odio vehicula libero, nec
          dapibus orci arcu a lectus. Morbi auctor tortor non ipsum blandit, sed
          aliquam est ultrices. Fusce gravida est ac malesuada iaculis. Aliquam
          dignissim auctor libero, ut dapibus ligula bibendum eu. Nam pharetra
          justo vel finibus suscipit. Praesent rutrum ligula at tortor rhoncus
          viverra. Suspendisse egestas finibus feugiat. Vivamus ultrices ante
          sit amet justo dignissim ultrices. Mauris et arcu felis. Integer ut
          condimentum leo, nec blandit ex. Donec consequat varius quam, sit amet
          eleifend mi tempus eget.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          efficitur lectus id augue gravida, in volutpat ligula posuere. Sed
          congue, urna sed aliquet eleifend, turpis odio vehicula libero, nec
          dapibus orci arcu a lectus. Morbi auctor tortor non ipsum blandit, sed
          aliquam est ultrices. Fusce gravida est ac malesuada iaculis. Aliquam
          dignissim auctor libero, ut dapibus ligula bibendum eu. Nam pharetra
          justo vel finibus suscipit. Praesent rutrum ligula at tortor rhoncus
          viverra. Suspendisse egestas finibus feugiat. Vivamus ultrices ante
          sit amet justo dignissim ultrices. Mauris et arcu felis. Integer ut
          condimentum leo, nec blandit ex. Donec consequat varius quam, sit amet
          eleifend mi tempus eget.
        </p>
      </div>
    </>
  );
};

export default HomePage;
