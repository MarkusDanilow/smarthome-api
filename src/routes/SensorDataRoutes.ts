import { Express, Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const UseSensorDataRoutes = (app: Express, prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {

    // Route: Neue Sensordaten hinzufügen
    app.post('/sensor-data', async (req, res) => {
        const { temperature, humidity, roomId } = req.body;

        try {
            const sensorData = await prisma.sensorData.create({
                data: {
                    temperature,
                    humidity,
                    roomId,
                },
            });
            res.status(201).json(sensorData);
        } catch (error) {
            res.status(500).json({ error: 'Fehler beim Hinzufügen der Sensordaten' });
        }
    });

    // Route: Alle Sensordaten für einen Raum abrufen
    app.get('/sensor-data/room/:roomId', async (req, res) => {
        const { roomId } = req.params;

        try {
            const sensorData = await prisma.sensorData.findMany({
                where: { roomId },
                orderBy: { timestamp: 'desc' },
            });
            res.json(sensorData);
        } catch (error) {
            res.status(500).json({ error: 'Fehler beim Abrufen der Sensordaten' });
        }
    });

    // Route: Sensordaten nach ID abrufen
    app.get('/sensor-data/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const sensorData = await prisma.sensorData.findUnique({
                where: { id },
            });

            if (sensorData) {
                res.json(sensorData);
            } else {
                res.status(404).json({ error: 'Sensordaten nicht gefunden' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Fehler beim Abrufen der Sensordaten' });
        }
    });

    // Route: Sensordaten aktualisieren
    app.put('/sensor-data/:id', async (req, res) => {
        const { id } = req.params;
        const { temperature, humidity } = req.body;

        try {
            const updatedSensorData = await prisma.sensorData.update({
                where: { id },
                data: { temperature, humidity },
            });
            res.json(updatedSensorData);
        } catch (error) {
            res.status(404).json({ error: 'Sensordaten nicht gefunden' });
        }
    });

    // Route: Sensordaten löschen
    app.delete('/sensor-data/:id', async (req, res) => {
        const { id } = req.params;

        try {
            await prisma.sensorData.delete({
                where: { id },
            });
            res.status(204).send(); // Erfolgreiches Löschen, kein Inhalt zurück
        } catch (error) {
            res.status(404).json({ error: 'Sensordaten nicht gefunden' });
        }
    });

    // Route: Sensordaten für einen Raum innerhalb eines Zeitraums abrufen
    app.get('/sensor-data/room/:roomId/range', async (req, res) => {
        const { roomId } = req.params;
        const { start, end } = req.query;

        // Überprüfen, ob start und end gültige Datumswerte sind
        const startDate = new Date(start as string);
        const endDate = new Date(end as string);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            res.status(400).json({ error: 'Ungültige Datumswerte' });
            return;
        }

        try {
            const sensorData = await prisma.sensorData.findMany({
                where: {
                    roomId,
                    timestamp: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
                orderBy: { timestamp: 'asc' },
            });
            res.json(sensorData);
        } catch (error) {
            res.status(500).json({ error: 'Fehler beim Abrufen der Sensordaten' });
        }
    });


}