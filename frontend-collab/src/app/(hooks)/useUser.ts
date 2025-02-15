import { useState } from "react"

export const useUserData = () => {
    const [userData, setUserData] = useState<string>("");

    const handleSetData = (data: string) => {
        console.log(data)
        setUserData(data)
    }

    return {
        userData,
        setUserData,
        handleSetData
    }
}