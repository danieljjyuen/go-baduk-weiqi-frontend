import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Move {
    gameId: string;
    x: number;
    y: number;
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
}

const initialState: GameState = {
    board: Array.from(Array(19), () => new Array(19).fill(0)),
    chatMessages: [],
    isBlackTurn: true,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setBoard(state, action: PayloadAction<number[][]>) {
            state.board = action.payload;
        },
        addMove(state, action: PayloadAction<Move>) {
            const color = state.isBlackTurn ? 1 : 2;
            state.board[action.payload.x][action.payload.y] = color;
            state.isBlackTurn = !state.isBlackTurn;
        },
        removeStone(state, action: PayloadAction<Move>) {
            state.board[action.payload.x][action.payload.y] = 0;
        },
        addChatMessage(state, action: PayloadAction<ChatMessage>) {
            state.chatMessages.push(action.payload);
        },
        setGameState(state, action: PayloadAction<GameState>) {
            state.board = action.payload.board;
            state.isBlackTurn = action.payload.isBlackTurn;
        }
    }
});

export const { setBoard, addMove, addChatMessage, setGameState, removeStone } = gameSlice.actions;
export default gameSlice.reducer;