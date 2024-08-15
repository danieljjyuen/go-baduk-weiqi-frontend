import React from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_ROOMS } from "../services/graphql";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    const { loading, error, data } = useQuery(GET_ROOMS);

    if(loading) return <p>loading...</p>
    if(error) return <p>error:{error.message}</p>

    const rooms = data?.getRooms || [];

    return (
        <div>
            <Link to="/register">Register</Link>
            <Link to="/login">Log In</Link>
            <h1>Rooms</h1>
            <ul>
                {rooms && rooms.length > 0 ? (
                    rooms.map((room:any) => (
                        <li key={room.id}>
                            {room.name} - Owner: {room.owner.username}
                        </li>
                    ))
                ) : (
                    <p>no rooms</p>
                )}

            </ul>
        </div>
    );
};

export default Home;