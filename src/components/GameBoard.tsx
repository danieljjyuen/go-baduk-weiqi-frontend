import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMove, setGameState } from "../store/gameSlice";
import { websocketService } from "../services/websocket";

const GameBoard: React.FC = () => {
    const dispatch = useDispatch();
    const board = useSelector((state: any) => state.game.boardState)||[];
    const isBlackTurn = useSelector((state:any) => state.game.isBlackTurn);
    const gameId = useSelector((state: any) => state.game.id)
    
    const handleMoveClick = (x: number, y: number) => {
        const color = isBlackTurn ? 1 : 2; //1 for black, 2 for white
        const move = { gameId, x, y };
        dispatch(addMove(move));

        //send to websocket
        websocketService.sendMessage(`/app/move/${gameId}`, move);
    };

    return (
        <div className="gameBoard">
            {board.map((row, x) => (
                <div key={x} className="boardRow">
                    {row.map((column, y) => {
                        <div 
                            key={y} 
                            className="boardColumn" 
                            onClick={() => handleMoveClick(x,y)}>
                            {column}
                        </div>
                    })};
                </div>
            ))};
        </div>
    );
};

export default GameBoard