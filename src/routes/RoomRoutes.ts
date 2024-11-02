import { Express, Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const UseRoomRoutes = (app: Express, prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {

    app.get("/rooms", async (req: Request, res: Response) => {
        const rooms = await prisma.room.findMany();
        res.status(200).json(rooms);
    })

    app.post('/rooms', async (req: Request, res: Response) => {
        const room = await prisma.room.create({
            data: req.body
        });
        res.status(201).json(room);
    });

    app.get('/rooms/:id', async (req: Request, res: Response) => {
        const room = await prisma.room.findFirst({ where: { id: req.params.id } })
        res.json(room);
    });

    app.put('/rooms/:id', async (req: Request, res: Response) => {
        const updatedRoom = await prisma.room.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.json(updatedRoom);
    });

    app.delete('/rooms/:id', async (req: Request, res: Response) => {
        const delRoom = await prisma.room.delete({ where: { id: req.params.id } })
        res.status(201).json(delRoom);
    });

}