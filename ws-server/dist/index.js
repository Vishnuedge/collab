"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const http_1 = __importDefault(require("http"));
const ws_1 = __importStar(require("ws"));
const server = http_1.default.createServer();
const PORT = process.env.PORT || 5001;
const wss = new ws_1.WebSocketServer({ server });
let socketRooms = [];
wss.on("connection", (ws) => {
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
                    if (client.roomId === data.roomId &&
                        client.readyState === ws_1.default.OPEN) {
                        client.send(JSON.stringify({
                            type: "userListUpdate",
                            roomId: data.roomId,
                            users: room.users,
                        }));
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
});
server.listen(PORT, () => {
    console.log(`WS is running on port ${PORT} 🔫`);
});
