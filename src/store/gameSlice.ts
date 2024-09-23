import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Move {
    gameId: string;
    x: number;
    y: number;
    color: number;
}

interface ChatMessage {
    roomId: string;
    playerId: string;
    message: string;
    timestamp: string;
}

interface GameState {
    boardState: number[][];
    chatMessages: ChatMessage[];
    isBlackTurn: boolean;
    gameId: string;
    blackPlayerCaptures: number;
    whitePlayerCaptures: number;
    gameOver: boolean;
    resign: number;
    whiteScore: number;
    blackScore: number;
};

const initialState: GameState = {
    boardState: Array.from(Array(19), () => new Array(19).fill(0)),
    chatMessages: [],
    isBlackTurn: true,
    gameId: "",
    blackPlayerCaptures: 0,
    whitePlayerCaptures: 0,
    gameOver: false,
    resign: 0,
    whiteScore: 7.5,
    blackScore: 0,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setBoard(state, action: PayloadAction<number[][]>) {
            state.boardState = action.payload;
        },
        addMove(state, action: PayloadAction<Move>) {
            const color = action.payload.color;
            state.boardState[action.payload.x][action.payload.y] = color;
            if(color == 1 || color==2) {
                state.isBlackTurn = !state.isBlackTurn;
            }
        },
        addChatMessage(state, action: PayloadAction<ChatMessage>) {
            state.chatMessages.push(action.payload);
        },
        setGameState(state, action: PayloadAction<GameState>) {
            //console.log("inside state", action.payload);
            state.boardState = action.payload.boardState;
            state.isBlackTurn = action.payload.isBlackTurn;
            state.blackPlayerCaptures = action.payload.blackPlayerCaptures;
            state.whitePlayerCaptures = action.payload.whitePlayerCaptures;
            state.gameOver = action.payload.gameOver;
            state.resign = action.payload.resign;
            state.blackScore = action.payload.blackScore;
            state.whiteScore = action.payload.whiteScore;
            const audio = new Audio("/sounds/place-stone.mp3");
            audio.play();
        },
        setGameId(state, action: PayloadAction<string>) {
            state.gameId = action.payload;
        }
    }
});

export const { setBoard, addMove, addChatMessage, setGameState, setGameId } = gameSlice.actions;
export default gameSlice.reducer;
export type { GameState };