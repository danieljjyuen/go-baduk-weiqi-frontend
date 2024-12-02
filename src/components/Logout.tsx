import { useDispatch, useSelector } from "react-redux"
import { resetPlayer } from "../store/playerSlice";
import React from "react";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../services/graphql";

const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const [logout] = useMutation(LOGOUT);
    const playerUsername = useSelector((state:any) => state.player.username);

    const handleLogout = async () => {
        try {
            const { data } = await logout({variables: {username: playerUsername} });
            dispatch(resetPlayer());
            localStorage.removeItem("player");
        }catch( error) {
            console.error("logout error: ", error);
        }

    };

    return (
        <div>
            <button onClick={handleLogout}>Log out</button>
        </div>
    );    
};

export default Logout;