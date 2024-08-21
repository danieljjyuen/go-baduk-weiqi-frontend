import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMove, setGameState } from "../store/gameSlice";
import { websocketService } from "../services/websocket";

const GameBoard: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dispatch = useDispatch();
    const board = useSelector((state: any) => state.game.board)||[];
    const isBlackTurn = useSelector((state:any) => state.game.isBlackTurn);
    const gameId = useSelector((state: any) => state.game.id)
    console.log("board : ", board);


    const cellSize = 25;
    const padding = 20;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if(ctx) {
            drawBoard(ctx);
            //drawStones(ctx);
        }
    }, [board]);

    const drawBoard = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;

        //vertical lines
        for(let i = 0; i < 19; i++) {
            ctx.beginPath()
            ctx.moveTo(padding + i * cellSize, padding);
            ctx.lineTo(padding + i * cellSize, padding + 18 * cellSize);
            ctx.stroke();
        //horizontal lines
            ctx.beginPath()
            ctx.moveTo(padding, padding + i * cellSize);
            ctx.lineTo(padding + 18 * cellSize, padding + i * cellSize);
            ctx.stroke();
        }
    }

    const handleMoveClick = (x: number, y: number) => {
        const color = isBlackTurn ? 1 : 2; //1 for black, 2 for white
        const move = { gameId, x, y };
        dispatch(addMove(move));

        //send to websocket
        websocketService.sendMessage(`/app/move/${gameId}`, move);
    };

    return (
        <canvas
            ref={canvasRef}
            width={cellSize * 18 + padding *2}
            height={cellSize * 18 + padding *2}

        />
    )
};

export default GameBoard