import React, { useEffect } from "react"
import { useSelector } from "react-redux"

interface TurnPanelProps {
    ownerUsername:string,
    challengerUsername:string,
}
const TurnPanel: React.FC<TurnPanelProps> = ({ownerUsername, challengerUsername}) => {
    const isBlackTurn = useSelector((state:any) => state.game.isBlackTurn);
    const colorStyle = isBlackTurn ? "bg-black" : "bg-white";
    const blackPlayerCaptures = useSelector((state: any) => state.game.blackPlayerCaptures);
    const whitePlayerCaptures = useSelector((state:any) => state.game.whitePlayerCaptures);
    const gameOver = useSelector((state:any) =>  state.game.gameOver);
    const resign = useSelector((state:any) => state.game.resign);
    const blackScore = useSelector((state:any) => state.game.blackScore);
    const whiteScore = useSelector((state:any) => state.game.whiteScore);

        console.log(gameOver);
        console.log(resign);
        console.log(whiteScore);
        console.log(blackScore);


    return (
        <div className="w-[400px] border p-4 bg-gray-200 flex flex-col items-center justify-center">
           <div className="flex flex-row justify-between w-full items-center">
            <span>{blackPlayerCaptures} captures</span>
            <span className={`${colorStyle} inline-block w-5 h-5 rounded-full border justify-center`}></span>
            <span>{whitePlayerCaptures} captures</span>
            </div>
           
           <div className="w-full flex flex-row items-center justify-between">
                <div className="flex items-center justify-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-black border mr-2"> </span>
                    <span> {ownerUsername} </span> 
                </div>
                <div className="flex items-center justify-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-white border mr-2"> </span>
                    <span> {challengerUsername}</span>
                </div>
           </div>

           {gameOver ? (
            resign != 0 ? 
            (<div>{resign == 1? "Black" : "White"} has resigned</div>)
            :
           (<div className="w-full flex flex-row items-center justify-between">
                <div className="flex items-center justify-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-black border mr-2"> </span>
                    <span> {blackScore} </span> 
                </div>
                <div>
                    {blackScore > whiteScore ? "Black Wins" : "White Wins"}
                </div>
                <div className="flex items-center justify-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-white border mr-2"> </span>
                    <span> {whiteScore}</span>
                </div>
            </div>)
           )
           : null}
        </div>
    )
}

export default TurnPanel;