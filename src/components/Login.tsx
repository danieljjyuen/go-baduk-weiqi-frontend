import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../services/graphql";
import { useDispatch } from "react-redux";
import { setPlayerDetails, setOnlineStatus } from "../store/playerSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useMutation(LOGIN);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (event:any) => {
        event.preventDefault();
        try {
            const { data } = await login({ variables: {username, password }});
            
            dispatch(setPlayerDetails({
                playerId: data.login.id,
                username:data.login.username,
            }));
            dispatch(setOnlineStatus(true));
            
            console.log("logging in", data);
            
            navigate("/");
        } catch (error) {
            console.error("login error: ", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-center bg-cover bg-[url('/images/form-background.jpg')]">
            <form onSubmit={handleLogin} className="bg-gray-200 p-2 border border-2 border-black rounded">

                <div className="p-1 m-1 w-full">
                    username: <input 
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="p-1 m-1 w-full">
                    password: <input 
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="flex justify-center">
                    <button className="rounded border border-2 border-black p-1 m-1 ">log in</button>
                </div>

            </form>
            
        </div>
    );
};

export default Login;