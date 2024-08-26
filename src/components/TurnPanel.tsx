import React from "react"
import { useSelector } from "react-redux"

interface TurnPanelProps {
    ownerUsername:string,
    challengerUsername:string,
}
const TurnPanel: React.FC<TurnPanelProps> = ({ownerUsername, challengerUsername}) => {
    const isBlackTurn = useSelector((state:any) => state.game.isBlackTurn);
    const colorStyle = isBlackTurn ? "bg-black" : "bg-white";
    
    return (
        <div className="w-[400px] border p-4 bg-gray-200 flex flex-col items-center justify-center">
           <div><span className={`${colorStyle} inline-block w-4 h-4 rounded-full border justify-center`}></span></div>
           
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
        </div>
    )
}

export default TurnPanel;