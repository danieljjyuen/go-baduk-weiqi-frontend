import React, { useState, useEffect } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { CREATE_ROOM } from "../services/graphql";
import { useDispatch } from "react-redux"
import { updateRoom } from "../store/playerSlice";
import { useNavigate } from "react-router-dom";

interface CreateRoomProps {
    ownerId: string;
}

const CreateRoom: React.FC<CreateRoomProps> = ({ ownerId }) => {
    const [roomName, setRoomName] = useState("");
    const [roomId, setRoomId] = useState<string | null>(null);
    const [createRoom] = useMutation(CREATE_ROOM);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { data: gameStartData, error: subscriptionError } = useSubscription(GAME_START_SUBSCRIPTION, {
    //     variables: { roomId },
    //     skip: !roomId, // Skip subscription if roomId is null
    // });

    // useEffect(() => {
    //     console.log("roomId:", roomId);
    //     if (subscriptionError) {
    //         console.error("Subscription error:", subscriptionError);
    //     }
    //     if (gameStartData) {
    //         console.log("Game started:", gameStartData);
    //         navigate(`/room/${roomId}/game/${gameStartData.onGameStart.id}`);
    //     }
    // }, [gameStartData, subscriptionError, roomId, navigate]);

    const handleCreateRoom = async () => {
        try {
            const { data } = await createRoom({ variables: { name: roomName, ownerId } });
            if(data) {
                dispatch(updateRoom(data.createRoom.id));
                setRoomId(data.createRoom.id);
                navigate(`/room/${data.createRoom.id}`);
                
                console.log("room created: ", data.createRoom.id);
            }

        } catch (error) {
            console.error("error creating room: ", error);
        }
    };

    return (
        <div className="bg-gray-200">
            <input 
                type="text"
                placeholder="room name"
                value={roomName}
                onChange={(event) => setRoomName(event.target.value)}
            />
            <button className="p-1 m-1 border border-2 border-black" onClick={handleCreateRoom}>Create Room</button>
        </div>
    );    
};

export default CreateRoom;
