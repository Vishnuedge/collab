import express from "express"
import { spotifyAuthenticate } from "../middleware/spotifyAuthenticateMiddleware";
import axios from "axios";

const router = express.Router();

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
        response.data["tracks"]["items"].map(ele => {
            console.log(ele?.album?.artists[0]?.name)
        })

        res.send(response.data)

    } catch (error) {
        console.log(error)
    }
})

export default router