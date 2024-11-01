import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

// Beispiel-Route: GET
app.get('/', (req: Request, res: Response) => {
  res.send('Willkommen bei deiner Express-API!');
});

app.get('/demo', (req: Request, res: Response) => {
    res.send({message: "Hello World"});
  });

// Beispiel-Route: POST
app.post('/data', (req: Request, res: Response) => {
  const data = req.body;
  res.json({ message: 'Daten erhalten!', receivedData: data });
});

// Starte den Server
app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});
