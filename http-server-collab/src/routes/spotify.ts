import express from "express"
import { spotifyAuthenticate } from "../middleware/spotifyAuthenticateMiddleware";
import axios from "axios";

const router = express.Router();

interface SongList {
    id: string,
    songName: string,
    duration: number,
    authorName: string
}

router.post("/getTracks", spotifyAuthenticate, async (req, res) => {
    const accessToken = req["authorization"];
    const data = req.body;
    const { search } = data;
    const url = process.env.SPOTIFY_SEARCH_URL + search + "&type=track"

    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        })
        const songList: SongList[] = []

        response.data["tracks"]["items"].map(song => {
            let songInfo = {
                id: song.id,
                songName: song.name,
                duration: song.duration_ms,
                authorName: song.artists[0].name
            }
            songList.push(songInfo);
        })

        res.send(songList)

    } catch (error) {
        console.log(error)
    }
})

export default router