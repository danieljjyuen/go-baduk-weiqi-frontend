import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../services/graphql";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useMutation(LOGIN);

    const handleLogin = async () => {
        try {
            const { data } = await login({ variables: {username, password }});
            console.log("logging in", data.login);
        } catch (error) {
            console.error("login error: ", error);
        }
    };

    return (
        <div>
            <input 
                type="text"
                placeholder="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
        </div>
    );
};

export default Login;