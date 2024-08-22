import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
    client: Client;

    constructor() {
        this.client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            connectHeaders: {},
            debug: (str) => console.log(str),
            onConnect: (frame) => {
                console.log("Connected: " + frame);
            },
            onDisconnect: (frame) => {
                console.log("Disconnected: " + frame);
            },
            onStompError: (frame) => {
                console.error("STOMP error: " + frame);
            }
        });
    }

    connect() {
        console.log("connecting ");
        this.client.activate();
    }

    sendMessage(destination: string, payload: any) {
        this.client.publish({destination, body: JSON.stringify(payload)});
    }

    subscribe(destination: string, callback: (data: any) => void): StompSubscription {
        return this.client.subscribe(destination, (message) => {
            callback(JSON.parse(message.body));
        });
    }

    isConnected(): boolean {
        return this.client.connected;
    }
    
    close() {
        this.client.deactivate();
    }
}

export const websocketService = new WebSocketService();
