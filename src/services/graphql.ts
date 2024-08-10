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
        startGame(roomId:$RoomId)
    }
`;
