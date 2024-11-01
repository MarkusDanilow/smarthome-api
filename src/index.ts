import express, { Request, Response } from 'express';
import { InitDatabase } from './database';
import { UseRoomRoutes } from './routes/RoomRoutes';

const app = express();
const port = 3000;

app.use(express.json());

// Beispiel-Route: GET
app.get('/', (req: Request, res: Response) => {
  res.send('Willkommen bei deiner Express-API!');
});


UseRoomRoutes(app); 

// Starte den Server
app.listen(port, async () => {
  await InitDatabase(); 
  console.log(`Server läuft unter http://localhost:${port}`);
});


// important!!! 
export default app;