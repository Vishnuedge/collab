require("dotenv").config();
import http from "http";
import WebSocket, { WebSocketServer } from "ws";

const server = http.createServer();
const PORT = process.env.PORT || 5001;
const wss = new WebSocketServer({ server });

interface Room {
    roomId: string;
    users: string[];
}

interface CustomWebSocket extends WebSocket {
    roomId?: string;
}

let socketRooms: Room[] = [];

wss.on("connection", (ws: CustomWebSocket) => {
    ws.on("error", console.error);

    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message.toString());

            if (data.type === "join") {
                let room = socketRooms.find((r) => r.roomId === data.roomId);

                if (!room) {
                    room = { roomId: data.roomId, users: [] };
                    socketRooms.push(room);
                }

                if (!room.users.includes(data.userId)) {
                    room.users.push(data.userId);
                }

                // Associate WebSocket connection with the room
                ws.roomId = data.roomId;

                // Only notify clients **in the same room**
                wss.clients.forEach((client) => {
                    if (
                        (client as CustomWebSocket).roomId === data.roomId &&
                        client.readyState === WebSocket.OPEN
                    ) {
                        client.send(
                            JSON.stringify({
                                type: "userListUpdate",
                                roomId: data.roomId,
                                users: room.users,
                            })
                        );
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    });
});

server.listen(PORT, () => {
    console.log(`WS is running on port ${PORT} 🔫`);
});
