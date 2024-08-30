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
import TurnPanel from "../components/TurnPanel";

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
                    (updatedState: any) => {
                        //console.log("LISTENING");
                        //console.log("updated state " , updatedState);

                        dispatch(setGameState(updatedState));


                        // if(move){
                        //     console.log("inside subscribe move  ", move);
                        //     //dispatch(addMove(move));
                        //     if(move.color == 0){
                        //         const audio = new Audio("/sounds/remove-stone.mp3");
                        //         audio.play();
                        //     }else{ 
                        //         const audio = new Audio("/sounds/place-stone.mp3");
                        //         audio.play();
                        //     }
                        // }
                        
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
            isConnected.current = false;
            isSubscribed.current = false;
        };

    }, [dispatch, loading, error, data, roomId]);

    
    if (loading || error) return <div>waiting for player to join</div>;
    
    return (
        <div className="flex p-1 m-1 h-screen w-full bg-cover bg-center bg-[url('/images/background.jpg')]">
            <div className="flex-1 flex items-center justify-center">
                <GameBoard />
            </div>
            
            <div className="flex flex-col items-center justify-between mt-3 mb-3 ml-4 mr-4">
                <TurnPanel 
                    ownerUsername={data?.getGameStateWithRoomId?.blackPlayer.username} 
                    challengerUsername={data?.getGameStateWithRoomId?.whitePlayer.username}
                />
                <div className="flex flex-row justify-between">
                    <button className="bg-gray-200 p-1 m-2 border border-2 border-black">
                        Pass
                    </button>
                    <button className="bg-gray-200 p-1 m-2 border border-2 border-black">
                        Resign
                    </button>
                </div>
                <Chat />
            </div>
            
        </div>
    )
}; 

export default GamePage;