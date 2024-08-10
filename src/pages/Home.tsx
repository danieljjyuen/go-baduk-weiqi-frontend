import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_ROOMS = gql`
    query GetRooms {
        rooms {
            id
            name
            owner {
                username
            }
        }
    }
`;

const Home: React.FC = () => {
    const { loading, error, data } = useQuery(GET_ROOMS);

    if(loading) return <p>loading...</p>
    if(error) return <p>error:{error.message}</p>
    
    return (
        <div>
            <h1>Rooms</h1>
            <ul>
                {data.rooms.map((room:any) => (
                    <li key={room.id}>
                        {room.name} - Owner: {room.owner.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;