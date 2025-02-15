import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { JSXElementConstructor, RefObject, useState } from "react";

interface SongList {
    id: string,
    songName: string,
    duration: number,
    authorName: string
}

interface DialogProps {
    open: boolean,
    onClose: () => void,
    handleSearch: (value: string) => void,
    handleSubmit: () => void,
    handleCheckParent: (value: SongList) => void,
    info: SongList[],
    handleGenerateRoom: () => void
}

export function DialogMenu(props: DialogProps) {

    const {
        open,
        onClose,
        handleSearch,
        handleSubmit,
        handleCheckParent,
        info,
        handleGenerateRoom
    } = props;

    const handleClose = () => {
        onClose()
    }

    const handleOnSearch = (e: any) => {
        handleSearch(e.target["value"])
    }

    const handleSearchSubmit = () => {
        handleSubmit()
    }

    const handleCheck = (song: SongList) => {
        handleCheckParent(song)
    }

    const handleGenerateButton = () => {
        handleGenerateRoom()
    }
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select your first 3 songs</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1" >
                    <Input type="search" onChange={handleOnSearch} />
                    <Button onClick={handleSearchSubmit}>Search</Button>
                </div>

                <div className="border bottom-1" >
                    {
                        info.map((ele, index) => (
                            <div key={index} className="flex" >
                                <Checkbox onCheckedChange={() => handleCheck(ele)} />
                                <p >{ele.songName}</p>
                                <p >{ele.authorName}</p>
                            </div>
                        ))
                    }
                </div>
                <Button variant="outline" onClick={handleGenerateButton} >Generate Room Id</Button>
            </DialogContent>
        </Dialog>

    )
}
