import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addChatMessage } from "../store/gameSlice";
import { websocketService } from "../services/websocket";

const Chat: React.FC = () => {
    const dispatch = useDispatch();
    const chatMessages = useSelector((state: any) => state.game.chatMessages);
    const [message, setMessage] = useState("");
    
    const roomId = useSelector((state: any) => state.player.roomId);
    const playerId = useSelector((state: any) => state.player.playerId);
    const playerUsername = useSelector((state: any) => state.player.username);

    const handleSendMessage = () => {
        const chatMessage = {
            roomId,
            playerId,
            message,
            timestamp: new Date().toISOString(),
        };

        dispatch(addChatMessage(chatMessage));

        websocketService.sendMessage(`/app/chat`, chatMessage);
        setMessage("");
    };

    return (
        <div>
            <div>
                {chatMessages.map((msg, index) => (
                    <div>
                        <strong>{playerUsername}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div>
                <input 
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;