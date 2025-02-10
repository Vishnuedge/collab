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
exports.spotifyAuthenticate = void 0;
const axios_1 = __importDefault(require("axios"));
let accessToken = null;
let tokenExpiryTime = null;
const spotifyAuthenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!accessToken || Date.now() >= tokenExpiryTime) {
        yield generateNewAccessToken();
    }
    req.authorization = accessToken;
    next();
});
exports.spotifyAuthenticate = spotifyAuthenticate;
const generateNewAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const accessTokenUrl = process.env.SPOTIFY_ACCESS_TOKEN_URL;
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", CLIENT_ID);
    data.append("client_secret", CLIENT_SECRET);
    try {
        const response = yield axios_1.default.post(accessTokenUrl, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        accessToken = response.data["access_token"];
        const expiresIn = response.data["expires_in"];
        tokenExpiryTime = Date.now() + expiresIn * 1000;
    }
    catch (error) {
        console.log(error);
    }
});
