import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addChatMessage } from "../store/gameSlice";
import { websocketService } from "../services/websocket";

const Chat: React.FC = () => {
    //const dispatch = useDispatch();
    const chatMessages = useSelector((state: any) => state.game.chatMessages);
    const [message, setMessage] = useState("");
    console.log(chatMessages);
    const roomId = useSelector((state: any) => state.player.currentRoomId);
    const playerId = useSelector((state: any) => state.player.playerId);
    const playerUsername = useSelector((state: any) => state.player.username);
    console.log(roomId);

    const handleSendMessage = () => {
        if(message == ""){
            return;
        }
        const chatMessage = {
            roomId,
            playerId,
            playerUsername,
            message,
            timestamp: new Date().toISOString(),
        };

        console.log(chatMessage);
        //dispatch(addChatMessage(chatMessage));

        websocketService.sendMessage(`/app/room/${roomId}/chat`, chatMessage);
        console.log(playerUsername , " sends message");
        setMessage("");
    };

    // const processedMessage = Array.from(
    //     new Map(
    //         chatMessages.map((msg:any) => [
    //             `${msg.message}-${msg.timestamp}`, // Unique key based on message content and timestamp
    //             msg,
    //         ])
    //     ).values()
    // );

    return (
        <div className="border bg-gray-200 p-2 w-full">
            <div className="w-full h-[300px] overflow-y-auto bg-white p-1">
                {chatMessages.map((msg:any, index:any) => (
                    <div key={index}>
                        <strong>{msg.playerUsername} :</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div className="border overflow-y-auto flex justify-between w-full p-1">
                <textarea
                    className="w-full h-12 p-1 m-1 border rounded resize-none"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Type your message..."
                />
                <button className="ml-2 p-2 border-2 border-black rounded" onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;