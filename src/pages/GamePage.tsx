import React from "react";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";

const GamePage: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();

    return (
        <div>
            
        </div>
    )
};

export default GamePage