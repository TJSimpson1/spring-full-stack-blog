import React, { useState } from "react";
import { useLocalState } from "../hooks/useLocalStorage";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Background = styled.div`
  display: flex;
  background-image: url("/images/login.png"); /* Set the background image */
  background-size: cover; /* Cover the entire div */
  height: 100vh; /* 100% viewport height to fill the entire page */
`;

const LoginContainer = styled.div`
  background: #fff;
  padding: 20px;
  margin: auto;
  max-height: 700px;
  width: 30%;
  border-radius: 20px;

  h1 {
    text-align: center;
    margin: 10px 0px 40px 0px;
  }

  input {
    width: 100%;
    border-radius: 10px;
    padding: 5px;
    transition: border-color 0.3s, box-shadow 0.3s;
    border: 1px solid #ccc; /* Initial border color */
    box-shadow: none; /* Initial box shadow */
  }
  
  input:focus {
    border-color: #00f; /* Border color when focused (blue in this example) */
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.8); /* Box shadow when focused */
  }

  label {
    margin: 20px 0px 5px 0px;
  }

  button {
    width: 100%;
    padding: 5px;
    display: block;
    margin: 30px auto 10px auto;
    border-radius: 10px;
    background: linear-gradient(to right, rgb(255, 105, 180), rgb(50, 0, 169)); /* Gradient background */
    color: white; /* Text color */
    border: none; /* Remove border */
  }  

  hr {
    margin: 50px 0px;
  }

  p {
    text-align: center;
  }
`;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useLocalState("", "jwt");

  const sendLoginRequest = () => {
    const reqBody = {
      username: username,
      password: password,
    };

    fetch("http://localhost:8080/api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        if (res.status === 200) {
          return Promise.all([res.json(), res.headers]);
        } else {
          return Promise.reject("Invalid login attempt");
        }
      })
      .then((data) => {
        setJwt(data[0].jwt);
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch((message) => {
        console.log(message);
      });
  };

  return (
    <Background>
      <LoginContainer>
        {/* Content for the right div goes here */}
        <h1>Sign in</h1>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="email"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button id="submit" type="button" onClick={() => sendLoginRequest()}>
            Log in
          </button>
        </div>
        <hr/>
        <p>Not got an account? <Link to="#">Register here!</Link></p>
      </LoginContainer>
    </Background>
  );
};

export default LoginPage;
