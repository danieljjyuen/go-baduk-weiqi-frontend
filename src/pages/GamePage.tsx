import React, { useEffect, useRef } from "react";
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
    console.log(roomId);
    const { loading, error, data, refetch } = useQuery(GETGAMESTATEWITHROOMID, {
        variables: {roomId},
        skip: !roomId,
        notifyOnNetworkStatusChange: true
    });

    const isSubscribed = useRef(false);
    
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
            console.log("game started id: ", gameId);
        }
        if (!gameId) {
            console.error("No game ID found");
            return;
        }

        if (!isSubscribed.current) {
            const onConnected = () => {
                // Subscribe for updates after successful connection
                websocketService.subscribe(
                    `/topic/room/${roomId}/game/${gameId}`,
                    (gameState: any) => {
                        console.log(gameState);
                        // dispatch(setGameState(gameState));
                    }
                );

                websocketService.subscribe(
                    `/topic/room/${roomId}/chat`,
                    (chatMessage: any) => {
                        dispatch(addChatMessage(chatMessage));
                    }
                );

                isSubscribed.current = true; // Set the flag to true after subscribing
            };

        // const onConnected = () => {
        //     // Subscribe for updates after successful connection
        //     websocketService.subscribe(`/topic/room/${roomId}/game/${gameId}`, (gameState: any) => {
        //         console.log(gameState);
        //         // dispatch(setGameState(gameState));
        //     });
    
        //     websocketService.subscribe(`/topic/room/${roomId}/chat`, (chatMessage: any) => {
        //         dispatch(addChatMessage(chatMessage));
        //     });
        // };
    
        //websocketService.connect();

        if (!websocketService.isConnected()) {
            websocketService.connect();
        }
        websocketService.client.onConnect = onConnected
    }

        return () => {
            websocketService.close();
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