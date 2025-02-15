import express from "express"
import axios from "axios";
import cc from "coupon-code";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

router.post('/generateRoomId', async (req, res) => {
    const primsa = new PrismaClient();
    const { userName, songs } = req.body;

    try {
        const newUser = await primsa.user.create({
            data: {
                userName
            },
            select: {
                id: true,
                userName: true
            }
        });
        console.log(newUser)


        const newRoomToken = cc.generate();
        const newRoom = await primsa.room.create({
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
        })
        res.status(201).send(newRoom)
    } catch (error) {
        console.log(error)
    }





})

export default router;