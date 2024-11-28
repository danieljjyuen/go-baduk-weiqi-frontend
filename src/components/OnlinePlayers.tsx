import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ONLINE_PLAYERS } from '../services/graphql';

const OnlinePlayers: React.FC = () => {
    const { loading, error, data, refetch } = useQuery(GET_ONLINE_PLAYERS);

    useEffect(() => {
        //5 sec refetch online player list
        const intervalId = setInterval(() => {
            refetch().catch(error => console.error("error fetchign onlines players", error));
        }, 5000);

        return () => clearInterval(intervalId);
    }, [refetch]);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error.message}</p>

    const onlinePlayers = data?.getOnlinePlayers || [];
    console.log(onlinePlayers);
    return (
        <div>
            <h2>{onlinePlayers.length} Players Online</h2>
            <ul>
                {onlinePlayers.length > 0 ? (
                    onlinePlayers.map((player: any) => (
                        <li key={player.id}>
                            {player.username}
                        </li>
                    )) 
                ): (
                    <p>No Players Online</p>
                )}
            </ul>
        </div>
    )
}

export default OnlinePlayers;