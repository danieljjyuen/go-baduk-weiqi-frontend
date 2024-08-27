import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PLAYER } from "../services/graphql";

const RegisterPlayer: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [createPlayer] = useMutation(CREATE_PLAYER);

    const handleRegister = async (event:any) => {
        event.preventDefault();
        if(username && password) {
            try {
                const { data } = await createPlayer({variables: {username, password}});
                console.log("register user : ", data);
                setUsername("");
                setPassword("");
            } catch (error) {
                console.error("register error: ", error);
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-center bg-cover bg-[url('images/form-background.jpg')]">
            <form onSubmit={handleRegister} className="bg-gray-200 p-2 border border-2 border-black rounded">
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
                    <button className="border border-2 border-black p-1 m-1 rounded">register</button>
                </div>
            </form>
        </div>
    )

}

export default RegisterPlayer;