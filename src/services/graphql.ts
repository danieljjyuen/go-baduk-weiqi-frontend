import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache(),
});

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

export const CREATE_PLAYER = gql`
    mutation createPlayer($username: String!, $password:String!) {
        createPlayer(username: $username, password: $password ){
                id
                username
        }
    }
`;
