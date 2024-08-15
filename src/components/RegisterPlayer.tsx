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
        <form onSubmit={handleRegister}>
            <div>
                username: <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div>
                password: <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div>
                <button>register</button>
            </div>
        </form>
    )

}

export default RegisterPlayer;