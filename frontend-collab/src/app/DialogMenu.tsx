import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { JSXElementConstructor, RefObject, useState } from "react";


interface DialogProps {
    open: boolean,
    onClose: () => void,
    handleSearch: (value: string) => void,
    handleSubmit: () => void,
    info: string[],
}

export function DialogMenu(props: DialogProps) {

    const {
        open,
        onClose,
        handleSearch,
        handleSubmit,
        info
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

    const handleCheck = (e: any) => {
        console.log(e.target.checked)
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
                                <Checkbox onClick={handleCheck} />
                                <p >{ele}</p>
                            </div>
                        ))
                    }
                </div>
                <Button variant="outline" >Generate Room Id</Button>
            </DialogContent>
        </Dialog>

    )
}
