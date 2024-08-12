import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import playerReducer from "./playerSlice"

const store = configureStore({
    reducer: {
        game: gameReducer,
        player: playerReducer,
    }
});

export default store;