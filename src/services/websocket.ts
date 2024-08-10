class WebSocketService {
    private socket: WebSocket | null = null;

    connect() {
        this.socket = new WebSocket("ws://localhost:8080/ws");

        this.socket.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        this.socket.onclose = () => {
            console.log("Disconnected from WebSocket server");
        };

        this.socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }

    sendMessage(destination: string, payload: any) {
        if(this.socket) {
            const message = JSON.stringify({destination, payload});
            this.socket.send(message);
        } else {
            console.error("WebSocket connection is not open");
        }
    }

    subscribe(destination: string, callback: (data: any) => void) {
        if (this.socket) {
            this.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if(data.destination === destination) {
                    callback(data.payload);
                }
            };
        }
    }
}

export const websocketService = new WebSocketService();