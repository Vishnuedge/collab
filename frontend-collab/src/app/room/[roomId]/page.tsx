"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Room() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [allUsers, setAllUsers] = useState<string[]>([]);
    const searchParams = useSearchParams();
    const params = useParams();
    const userId = searchParams.get("userId");
    const roomId = params.roomId;

    useEffect(() => {
        if (!userId || !roomId) return;

        const ws = new WebSocket("ws://localhost:8081");
        ws.onopen = () => {
            const payload = JSON.stringify({ type: "join", roomId, userId });
            ws.send(payload);
        };

        ws.onmessage = (event) => {
            try {
                const wsData = JSON.parse(event.data);
                if (wsData.type === "userListUpdate" && wsData.roomId === roomId) {
                    setAllUsers(wsData.users);
                }
            } catch (error) {
                console.error("WebSocket message error:", error);
            }
        };

        setSocket(ws);

        return () => ws.close();
    }, [userId, roomId]);

    return (
        <div>
            <h1>Room: {roomId}</h1>
            <h2>Connected Users:</h2>
            {allUsers.map((user, index) => (
                <div key={index}>{user}</div>
            ))}
        </div>
    );
}
