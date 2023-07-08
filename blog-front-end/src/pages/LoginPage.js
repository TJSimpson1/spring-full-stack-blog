import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [jwt, setJwt] = useState("", "jwt");

    const sendLoginRequest = () => {
        const reqBody = {
            email: username,
            password: password,      
        };
    
        // axios.post('http://localhost:8080/api/auth/login', {
        //     username: username,
        //     password: password
        // })
        // .then((res) => {
        //     if(res.status === 200){
        //         return Promise.all([res.json(), res.headers]);
        //     } 
        //     else {
        //         return Promise.reject("Invalid login attempt");
        //     }
        // })
        // .then(([body, headers]) => {
        //         setJwt(headers.get("authorization"));
        //         window.location.href = "home";
        //     }).catch((message) => {
        //         console.log(message);
        //     });

        fetch("http://localhost:8080/api/auth/login" , {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
        .then((res) => {
            if(res.status === 200){
                return Promise.all([res.json(), res.headers]);
            } 
            else{
                return Promise.reject("Invalid login attempt");
            }
        })
        .then(([body, headers]) => {
            setJwt(headers.get("authorization"));
            window.location.href = "/";
        }).catch((message) => {
            console.log(message);
        })
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