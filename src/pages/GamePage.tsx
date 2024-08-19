import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";
import GameBoard from "../components/GameBoard"
import { websocketService } from "../services/websocket";
import { useDispatch } from "react-redux";
import { setGameState, addChatMessage } from "../store/gameSlice";
import { useQuery } from "@apollo/client";
import { GETGAMESTATEWITHROOMID } from "../services/graphql";

const GamePage: React.FC = () => {
    const dispatch = useDispatch()
    const { roomId } = useParams<{ roomId: string }>();
    //const { gameId } = useParams<{ gameId: string }>();
    const { loading, error, data } = useQuery(GETGAMESTATEWITHROOMID, {variables: {roomId}});


    
    useEffect(() => {
        if (loading) return;
        if (error) {
            console.error("Error fetching game state:", error);
            return;
        }
        

        const gameId = data?.getGameStateWithRoomId?.id;

        if(gameId) {
            console.log("game started id: ", gameId);
        }
        if (!gameId) {
            console.error("No game ID found");
            return;
        }
        websocketService.connect();

        //subscribe for updates
        websocketService.subscribe(`/topic/room/${roomId}/game/${gameId}`, (gameState: any) => {
            console.log(gameState);
            //dispatch(setGameState(gameState));
        });

        websocketService.subscribe(`/topic/room/${roomId}/chat`, (chatMessage: any) => {
            dispatch(addChatMessage(chatMessage));
        });

        return () => {
            websocketService.close();
        };
    }, [dispatch, loading, error, data, roomId])

    return (
        <div>
            <GameBoard />
            <Chat />
        </div>
    )
}; 

export default GamePage;