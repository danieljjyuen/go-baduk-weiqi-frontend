import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState { 
    playerId: string;
    username: string;
    currentRoomId: string | null;
    online: boolean;
}

const initialState: PlayerState = {
    playerId: "",
    username: "",
    currentRoomId: null,
    online: false,
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setPlayerDetails(
            state,
            action: PayloadAction<{playerId: string; username: string}>
        ) {
            state.playerId = action.payload.playerId;
            state.username = action.payload.username;
        },

        updateRoom(state, action: PayloadAction<string | null>) {
            state.currentRoomId = action.payload;
        },

        setOnlineStatus(state, action: PayloadAction<boolean>) {
            state.online = action.payload;
        },
        //on logout
        resetPlayer(state) {
            state.online = false;
            state.currentRoomId = null;
            state.username = "";
            state.playerId = "";
        }
    }
});

export const {
    setPlayerDetails,
    updateRoom,
    resetPlayer,
    setOnlineStatus,
} = playerSlice.actions;

export default playerSlice.reducer;