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
    board: number[][];
    chatMessages: ChatMessage[];
    isBlackTurn: boolean;
    gameId: string;
};

const initialState: GameState = {
    board: Array.from(Array(19), () => new Array(19).fill(0)),
    chatMessages: [],
    isBlackTurn: true,
    gameId: ""
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setBoard(state, action: PayloadAction<number[][]>) {
            state.board = action.payload;
        },
        addMove(state, action: PayloadAction<Move>) {
            const color = action.payload.color;
            state.board[action.payload.x][action.payload.y] = color;
            if(color == 1 || color==2) {
                state.isBlackTurn = !state.isBlackTurn;
            }
        },
        addChatMessage(state, action: PayloadAction<ChatMessage>) {
            state.chatMessages.push(action.payload);
        },
        setGameState(state, action: PayloadAction<GameState>) {
            state.board = action.payload.board;
            state.isBlackTurn = action.payload.isBlackTurn;
        },
        setGameId(state, action: PayloadAction<string>) {
            state.gameId = action.payload;
        }
    }
});

export const { setBoard, addMove, addChatMessage, setGameState, setGameId } = gameSlice.actions;
export default gameSlice.reducer;
export type { GameState };