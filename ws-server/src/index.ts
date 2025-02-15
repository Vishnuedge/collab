require("dotenv").config()
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
const server = http.createServer();

const PORT = process.env.PORT || 5001;
const wss = new WebSocketServer({ server });
const users: any = {}
wss.on("connection", (ws) => {
    ws.on("error", console.error);
    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message.toString())
            if (data.type == "join") {
                users[data.userId] = ws;

                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: "userList", users: Object.keys(users) }))
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }


    })
})
server.listen(PORT, () => {
    console.log(`WS is running on port ${PORT} 🔫`)
})
