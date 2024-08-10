import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_ROOM } from "../services/graphql";

interface CreateRoomProps {
    ownerId: string;
}

const CreateRoom: React.FC<CreateRoomProps> = ({ ownerId }) => {
    const [roomName, setRoomName] = useState("");
    const [createRoom] = useMutation(CREATE_ROOM);
    
    const handleCreateRoom = async () => {
        try {
            const { data } = await createRoom({ variables: { name: roomName, ownerId } });
            console.log("room created: ", data.createRoom);
        } catch (error) {
            console.error("error creating room: ", error);
        }
    };

    return (
        <div>
            <input 
                type="text"
                placeholder="room name"
                value={roomName}
                onChange={(event) => setRoomName(event.target.value)}
            />
            <button onClick={handleCreateRoom}>Create Room</button>
        </div>
    );    
};

export default CreateRoom;
