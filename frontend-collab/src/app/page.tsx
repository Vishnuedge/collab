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

export default function Home() {

  const searchInputRef = useRef(null)
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [artistInfo, setArtistInfo] = useState<string[]>([]);
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
    let info = data.tracks.items.map((item: any) => {
      let artistList = ""
      item.artists.forEach((artist: any) => artistList = artistList + artist.name + "|")
      return artistList;
    })
    setArtistInfo(info)
  }

  const handleSearchValue = (value: string) => {
    setSearchValue(value)
  }

  const handleSearchSubmit = () => {
    searchTracks()
  }
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to collab!</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleOpenMusicModal}>Create Room</Button>
        </CardContent>
      </Card>

      <DialogMenu
        open={open}
        onClose={handleOpenChange}
        handleSearch={handleSearchValue}
        handleSubmit={handleSearchSubmit}
        info={artistInfo}

      />
    </div>
  );
}
