import React from "react"

interface TurnPanelProps {
    ownerUsername:string,
    challengerUsername:string,
}
const TurnPanel: React.FC<TurnPanelProps> = ({ownerUsername, challengerUsername}) => {

    return (
        <div className="border p-4">
            {ownerUsername} {challengerUsername}
        </div>
    )
}

export default TurnPanel;