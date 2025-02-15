require("dotenv").config();
import Express from "express"
import cors from "cors"
import { spotifyAuthenticate } from "./middleware/spotifyAuthenticateMiddleware";
import SpotifyRouter from "./routes/spotify"
import RoomRouter from "./routes/room"
const app = Express();

app.use(cors())
app.use(Express.json())
app.use("/api/spotify", SpotifyRouter)
app.use("/api/room", RoomRouter)


const PORT = process.env.PORT || 6000
app.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT} 🔥`)
})
