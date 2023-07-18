import React, { useState } from 'react';
import { useLocalState } from '../hooks/useLocalStorage';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");

    const sendLoginRequest = () => {
        const reqBody = {
            username: username,
            password: password,      
        };

        fetch("http://localhost:8080/api/auth/login" , {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
        .then(res => {
        if(res.status === 200){
            return Promise.all([res.json(), res.headers]);
        } 
        else{
            return Promise.reject("Invalid login attempt");
        }})
        .then(data => {
            setJwt(data[0].jwt); 
        })
        .then(() => {
            window.location.href = "/";
        }).catch((message) => {
            console.log(message);
        });
    }

    return(
        <>
        <div>
            <label htmlFor='username'>Username</label>
            <input type='email' id='username' value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
            <button id='submit' type='button' onClick={() => sendLoginRequest()} >Log in</button>
        </div>
        </>
    );
}

export default LoginPage;