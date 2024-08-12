import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../services/graphql";
import { useDispatch } from "react-redux";
import { setPlayerDetails, setOnlineStatus } from "../store/playerSlice";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useMutation(LOGIN);

    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const { data } = await login({ variables: {username, password }});
            dispatch(setPlayerDetails({
                playerId: data.playerId,
                username:data.username,
            }));
            dispatch(setOnlineStatus(true));
            
            console.log("logging in", data);
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
            <button onClick={handleLogin}>log in</button>
        </div>
    );
};

export default Login;