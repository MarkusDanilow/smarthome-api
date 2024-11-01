import express, { Request, Response } from 'express';
import { UseRoomRoutes } from './routes/RoomRoutes';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 3000;

app.use(express.json());

const prisma = new PrismaClient();

// Beispiel-Route: GET
app.get('/', (req: Request, res: Response) => {
  res.send('Willkommen bei deiner Express-API!');
});


UseRoomRoutes(app, prisma);

// Starte den Server
app.listen(port, async () => {
  console.log(`Server läuft unter http://localhost:${process.env.PORT}`);
});


process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// important!!! 
export default app;