import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const NavBar: React.FC = () => {
    const username = useSelector((state: any) => state.player.username);
    return (
        <div>
            {username == "" ? (
            <>
                <Link to="/register">Register</Link>
                <Link to="/login">Log In</Link>
            </>):
            (<Link to="/"><Logout/></Link>)
            }
        </div>
    )
}

export default NavBar;