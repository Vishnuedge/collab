require("dotenv").config();
import Express from "express"
import cors from "cors"
import { spotifyAuthenticate } from "./middleware/spotifyAuthenticateMiddleware";
import SpotifyRouter from "./routes/spotify"
const app = Express();

app.use(cors())
app.use(Express.json())
app.use("/api/spotify", SpotifyRouter)

const PORT = process.env.PORT || 6000
app.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT} 🔥`)
})
