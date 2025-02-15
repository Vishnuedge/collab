"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import { useRef, useState } from "react";
import { DialogMenu } from "./DialogMenu";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
interface SongList {
  id: string,
  songName: string,
  duration: number,
  authorName: string
}

interface CreatedRoom {
  id?: string,
  roomName?: string,
  roomToken?: string,
  createdAt?: string,
  userId?: string
}


export default function Home() {
  const router = useRouter()
  const searchInputRef = useRef(null)
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [artistInfo, setArtistInfo] = useState<SongList[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<SongList[]>([])
  const [room, setRoom] = useState<CreatedRoom>({})
  const [joiningRoom, setJoiningRoom] = useState("")
  const API_URL = "http://localhost:8080/api/spotify/"

  const handleOpenMusicModal = () => {
    setOpen(true)
  }

  const handleOpenChange = () => {
    setOpen(false)
  }

  const searchTracks = async () => {
    const response = await fetch(API_URL + "getTracks", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ search: searchValue })
    });
    const data = await response.json();
    setArtistInfo(data)
  }

  const handleSearchValue = (value: string) => {
    setSearchValue(value)
  }

  const handleSearchSubmit = () => {
    searchTracks()
  }
  const handleCheckParent = (song: SongList) => {

    let songs = [...selectedSongs]
    songs.push({ ...song })
    setSelectedSongs(songs)

  }

  const handleGenerateRoom = async () => {

    try {
      const response = await fetch("http://localhost:8080/api/room/generateRoomId", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName: `Vishnu ${crypto.randomUUID()}`, songs: selectedSongs })
      })
      const data = await response.json();
      setRoom(data)

      setOpen(false)
    } catch (error) {

    }

  }

  const handleJoinRoom = (e: any) => {
    const { target: { value } } = e;

    setJoiningRoom(value)
  }

  const handleCopy = () => {
    if (room && room.roomToken) {
      navigator.clipboard.writeText(room?.roomToken)
    }
    toast({
      title: "Copied"
    })
  }

  const handleRoute = () => {
    router.push(`/room/${joiningRoom}?userId=${room.userId}`)
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Card className="w-[500px]" >
        <CardHeader>
          <CardTitle>Welcome to collab!</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleOpenMusicModal}>Create Room</Button>
        </CardContent>

        {
          Object.keys(room).length > 0 && <div className="flex items-center">
            <p className="p-4" >{room?.roomToken}</p>
            <Button className="mx-1" variant="outline" onClick={handleCopy} >Copy</Button>
          </div>
        }

        <div className="flex items-center justify-center" >
          <Input type="text" onChange={handleJoinRoom} />
          <Button onClick={handleRoute} disabled={joiningRoom == ""}>Join</Button>
        </div>
      </Card>

      <DialogMenu
        open={open}
        onClose={handleOpenChange}
        handleSearch={handleSearchValue}
        handleSubmit={handleSearchSubmit}
        info={artistInfo}
        handleCheckParent={handleCheckParent}
        handleGenerateRoom={handleGenerateRoom}

      />
      <Toaster />
    </div>
  );
}
