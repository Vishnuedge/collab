"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spotifyAuthenticateMiddleware_1 = require("../middleware/spotifyAuthenticateMiddleware");
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
router.post("/getTracks", spotifyAuthenticateMiddleware_1.spotifyAuthenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req["authorization"];
    const data = req.body;
    const { search } = data;
    const url = process.env.SPOTIFY_SEARCH_URL + search + "&type=track";
    try {
        const response = yield axios_1.default.get(url, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        const songList = [];
        response.data["tracks"]["items"].map(song => {
            let songInfo = {
                id: song.id,
                songName: song.name,
                duration: song.duration_ms,
                authorName: song.artists[0].name
            };
            songList.push(songInfo);
        });
        res.send(songList);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
