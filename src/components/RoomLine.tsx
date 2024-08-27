import React from "react";
import { useMutation } from "@apollo/client";
import { JOIN_ROOM, START_GAME } from "../services/graphql";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateRoom } from "../store/playerSlice";

interface RoomLineProps {
    roomId: string,
    roomOwnerUsername: string,
    roomName: string
}
const RoomLine: React.FC<RoomLineProps> = ({roomId, roomOwnerUsername, roomName}) => {

    const [joinRoom] = useMutation(JOIN_ROOM);
    const [startGame] = useMutation(START_GAME);
    const playerId = useSelector((state:any) => state.player.playerId);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // mutation JoinRoom($roomId: ID!, playerId: ID!)
    // mutation StartGame($roomId: ID!)
    
    const handleJoinRoom = async () => {
        try {
            console.log("join" , roomId , playerId);
            dispatch(updateRoom(roomId));
            const joinRoomResponse = await joinRoom({ variables: {roomId, playerId}});
            console.log(joinRoomResponse);
            const startGameResponse = await startGame({ variables: {roomId} });
            console.log(startGameResponse);
            
//${startGameResponse.data.startGame.id}
            ///room/:roomId/game/:gameId"
            navigate(`/room/${roomId}`);
        } catch (error:any) {
            if (error.networkError) {
                console.error("Network error:", error.networkError);
            }
            if (error.graphQLErrors) {
                console.error("GraphQL error(s):", error.graphQLErrors);
            }
            console.error("ApolloError:", error);
        }
    }
    
    return(
        <div key={roomId}>
            <button className="bg-gray-100 border border-2 border-black rounded p-1 m-1" 
                    onClick={handleJoinRoom}>join</button> {roomName} - Owner: {roomOwnerUsername}
        </div>
    )
}

export default RoomLine;
