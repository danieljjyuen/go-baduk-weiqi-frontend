import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "../services/graphql";
import { useSelector } from "react-redux";
import CreateRoom from "../components/CreateRoom";
import RoomLine from "../components/RoomLine";

const Home: React.FC = () => {
    const { loading, error, data, refetch } = useQuery(GET_ROOMS);

    const playerId = useSelector((state:any) => state.player.playerId);
    
    console.log(playerId);

    useEffect(() => {
        // Define an interval to refetch data periodically
        const intervalId = setInterval(() => {
            refetch().catch(error => console.error("Error refetching rooms:", error));
        }, 5000); // Refetch every 5 seconds

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [refetch]);

    if(loading) return <p>loading...</p>
    if(error) return <p>error:{error.message}</p>

    const rooms = data?.getRooms || [];

    return (
        <div>
            {playerId? (<CreateRoom ownerId={playerId}/>) : null}
            <h1>Rooms</h1>
            <ul>
                {rooms && rooms.length > 0 ? (
                    rooms.map((room:any) => (
                        <RoomLine 
                            key={room.id}
                            roomOwnerUsername={room.owner.username}
                            roomName={room.name}
                            roomId={room.id}
                        />
                    ))
                ) : (
                    <p>no rooms</p>
                )}

            </ul>
        </div>
    );
};

export default Home;