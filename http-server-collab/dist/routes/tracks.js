"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spotifyAuthenticateMiddleware_1 = require("../middleware/spotifyAuthenticateMiddleware");
const router = (0, express_1.default)();
router.get("/getTracks", spotifyAuthenticateMiddleware_1.spotifyAuthenticate, (req, res) => {
    console.log(req.headers.authorization);
});
exports.default = express_1.default;
