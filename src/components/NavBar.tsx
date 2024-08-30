import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const NavBar: React.FC = () => {
    const username = useSelector((state: any) => state.player.username);
    return (
        <div className="bg-blue-900 flex flex-row">
            {username == "" ? (
            <>
                <Link className="bg-gray-200 p-1 border" to="/register">Register</Link>
                <Link className="bg-gray-200 p-1 border" to="/login">Log In</Link>
            </>):
            (<Link className="bg-gray-200 p-1 border" to="/"><Logout/></Link>)
            }
        </div>
    )
}

export default NavBar;