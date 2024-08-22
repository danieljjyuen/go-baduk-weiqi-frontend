import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";
import GameBoard from "../components/GameBoard"
import { websocketService } from "../services/websocket";
import { useDispatch, useSelector } from "react-redux";
import { setGameState, addChatMessage } from "../store/gameSlice";
import { useQuery } from "@apollo/client";
import { GETGAMESTATEWITHROOMID } from "../services/graphql";
import { addMove, setGameId } from "../store/gameSlice";

const GamePage: React.FC = () => {
    const dispatch = useDispatch()
    //
    const playerId = useSelector((state: any) => state.player.playerId);
    const { roomId } = useParams<{ roomId: string }>();
    //const { gameId } = useParams<{ gameId: string }>();
    console.log(roomId);
    const { loading, error, data, refetch } = useQuery(GETGAMESTATEWITHROOMID, {
        variables: {roomId},
        skip: !roomId,
        notifyOnNetworkStatusChange: true
    });

    const isSubscribed = useRef(false);
    const isConnected = useRef(false);
    
    useEffect(() => {
        console.log(roomId);
        console.log("load", loading);
        console.log("data: ", data);
        if (loading || error) {
                const interval = setInterval(() => {
                    refetch();
                },  5000);
                
                return () => clearInterval(interval);
        }
        

        const gameId = data?.getGameStateWithRoomId?.id;

        if(gameId) {
            dispatch(setGameId(gameId));
            console.log("game started id: ", gameId);
        }
        if (!gameId) {
            console.error("No game ID found");
            return;
        }
        if (!isConnected.current) {
            websocketService.connect();
            isConnected.current = true;
        }

        if (!isSubscribed.current && isConnected.current) {
            console.log("subscribing");
            const onConnected = () => {
                // Subscribe for updates after successful connection
                websocketService.subscribe(
                    `/topic/room/${roomId}/game/${gameId}`,
                    (move: any) => {
                        if(move){
                            console.log("inside subscribe move  ", move);
                            dispatch(addMove(move));
                        }
                        
                        // dispatch(setGameState(gameState));
                    }
                );

                websocketService.subscribe(
                    `/topic/room/${roomId}/chat`,
                    (chatMessage: any) => {
                        console.log("message receive and sending", playerId);
                        dispatch(addChatMessage(chatMessage));
                    }
                );
                // Set the flag to true after subscribing
                isSubscribed.current = true; 
            };

        websocketService.client.onConnect = onConnected
    }

        return () => {
            websocketService.close();
            isSubscribed.current = false;
            isConnected.current = false;
        };

    }, [dispatch, loading, error, data, roomId]);

    
    if (loading || error) return <div>waiting for player to join</div>;
    
    return (
        <div>
            <GameBoard />
            <Chat />
        </div>
    )
}; 

export default GamePage;