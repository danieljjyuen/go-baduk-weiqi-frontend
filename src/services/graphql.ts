import { ApolloClient, InMemoryCache, gql, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from '@apollo/client/link/ws';

// const httpLink = new HttpLink({
//     uri: "http://localhost:8080/graphql",
// });

// const wsLink = new WebSocketLink({

//       uri: "ws://localhost:8080/graphql-ws",
//       options: {
//         reconnect: true,
//       },
    
//   });

//   const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );


// export const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache(),
// });
export const client = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache(),
});

// export const GAME_START_SUBSCRIPTION = gql`
//   subscription OnGameStart($roomId: ID!) {
//     onGameStart(roomId: $roomId) {
//       id
//       roomId
//     }
//   }
// `;

export const LOGIN = gql`
    mutation Login($username: String!, $password:String!) {
        login(username: $username, password: $password) {
            id
            username
            online    
        }
    }
`;

export const CREATE_ROOM = gql`
    mutation CreateRoom($name: String!, $ownerId: ID!) {
        createRoom(name: $name, ownerId: $ownerId) {
            id
            name
            owner {
                id
                username
            }
            challenger {
                id
                username
            }
        }
    }
`;

export const START_GAME = gql`
    mutation StartGame($roomId: ID!) {
        startGame(roomId:$roomId) {
            id
        }
    }
`;

export const JOIN_ROOM = gql`
    mutation JoinRoom($roomId: ID!, $playerId: ID!) {
        joinRoom(roomId: $roomId, playerId: $playerId) {
            id
            name
        }
    }
`

export const GET_ROOMS = gql`
    query getRooms {
        getRooms {
            id
            name
            owner {
                username
            }
        }
    }
`;

export const GETGAMESTATEWITHROOMID = gql`
    query GETGAMESTATEWITHROOMID($roomId:ID!) {
        getGameStateWithRoomId(roomId: $roomId) {
            id
        }
    }
`;

export const CREATE_PLAYER = gql`
    mutation createPlayer($username: String!, $password:String!) {
        createPlayer(username: $username, password: $password ){
                id
                username
        }
    }
`;
