"use client"

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Room() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const searchParams = useSearchParams();
    const [allUsers, setAllUsers] = useState<any[]>([])
    const userId = searchParams.get("userId");

    useEffect(() => {

        const socket = new WebSocket("http://localhost:8081");
        socket.onopen = () => {
            const payload = JSON.stringify({ type: "join", userId })
            socket.send(payload)
        }
        socket.onmessage = (data: any) => {
            if (data) {
                console.log(JSON.parse(data.data))
                const wsData = JSON.parse(data.data);
                setAllUsers([...allUsers, wsData.users]);
            }

        }

        setSocket(socket)

        return () => socket.close()
    }, [])

    const params = useParams()
    return (
        <div className="">
            {params.roomId}
            {
                allUsers.map((user, index) => (
                    <div key={index} className="">{user}</div>
                ))
            }
        </div>
    );
}
