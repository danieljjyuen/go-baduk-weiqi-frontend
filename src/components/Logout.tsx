import { useDispatch } from "react-redux"
import { resetPlayer } from "../store/playerSlice";
import React from "react";

const Logout: React.FC = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(resetPlayer());
    };

    return (
        <div>
            <button onClick={handleLogout}>Log out</button>
        </div>
    );    
};

export default Logout;