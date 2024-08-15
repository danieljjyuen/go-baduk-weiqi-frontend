import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "../services/graphql";

const Home: React.FC = () => {
    const { loading, error, data } = useQuery(GET_ROOMS);

    if(loading) return <p>loading...</p>
    if(error) return <p>error:{error.message}</p>

    const rooms = data?.getRooms || [];

    return (
        <div>
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