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
const coupon_code_1 = __importDefault(require("coupon-code"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/generateRoomId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const primsa = new client_1.PrismaClient();
    const { userName, songs } = req.body;
    try {
        const newUser = yield primsa.user.create({
            data: {
                userName
            },
            select: {
                id: true,
                userName: true
            }
        });
        console.log(newUser);
        const newRoomToken = coupon_code_1.default.generate();
        const newRoom = yield primsa.room.create({
            data: {
                roomName: newRoomToken,
                roomToken: newRoomToken,
                createdBy: {
                    connect: {
                        id: newUser.id
                    }
                },
                songs: {
                    create: songs
                }
            }
        });
        res.status(201).send(newRoom);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
