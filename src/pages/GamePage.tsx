import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";
import GameBoard from "../components/GameBoard"
import { websocketService } from "../services/websocket";
import { useDispatch } from "react-redux";
import { setGameState, addChatMessage } from "../store/gameSlice";

const GamePage: React.FC = () => {
    const dispatch = useDispatch()
   
    useEffect(() => {
        const { roomId } = useParams<{ roomId: string }>();
        const { gameId } = useParams<{ gameId: string }>();
        websocketService.connect();

        //subscribe for updates
        websocketService.subscribe(`/topic/room/${roomId}/game/${gameId}`, (gameState: any) => {
            dispatch(setGameState(gameState));
        });

        websocketService.subscribe(`/topic/room/${roomId}/chat`, (chatMessage: any) => {
            dispatch(addChatMessage(chatMessage));
        });

        return () => {
            websocketService.connect().close();
        };
    }, [dispatch])



    return (
        <div>
            <GameBoard />
            <Chat />
        </div>
    )
};

export default GamePage