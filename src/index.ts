import express, { Request, Response } from 'express';
import { UseRoomRoutes } from './routes/RoomRoutes';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { UseSensorDataRoutes } from './routes/SensorDataRoutes';
import apiKeyMiddleware from './middleware/auth';

const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());

const prisma = new PrismaClient();

app.use(apiKeyMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Willkommen bei deiner Express-API!');
});


UseRoomRoutes(app, prisma);
UseSensorDataRoutes(app, prisma); 

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