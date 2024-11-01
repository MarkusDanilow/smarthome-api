import { Express, Request, Response } from 'express';
import { AppDataSource } from '../database';
import { Room } from '../entity/Room';

export const UseRoomRoutes = (app: Express) => {

    app.get("/rooms", async (req: Request, res: Response) => {
        const rooms = await AppDataSource.getRepository(Room).find();
        res.status(200).json(rooms);
    })

    app.post('/rooms', async (req: Request, res: Response) => {
        const r2 = AppDataSource.getRepository(Room).create(req.body as Room);
        await AppDataSource.getRepository(Room).save(r2);
        res.status(201).json(r2);
    });

    app.get('/rooms/:id', async (req: Request, res: Response) => {
        const room = await AppDataSource.getRepository(Room).findOneBy({ id: req.params.id })
        res.json(room);
    });

    app.put('/rooms/:id', async (req: Request, res: Response) => {
        const room = await AppDataSource.getRepository(Room).findOneBy({ id: req.params.id })
        AppDataSource.getRepository(Room).merge(room!, req.body)
        const updateRoom = await AppDataSource.getRepository(Room).save(room!);
        res.status(201).json(updateRoom);
    });
    
    app.delete('/rooms/:id', async (req: Request, res: Response) => {
        const delRoom = await AppDataSource.getRepository(Room).delete(req.params.id);
        res.status(201).json(delRoom);
    });

}