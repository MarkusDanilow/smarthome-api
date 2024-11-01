import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Room } from './entity/Room';
import { SensorData } from './entity/SensorData';
import path from 'path';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.NODE_ENV === "production"
        ? ":memory:"
        : path.join(__dirname, "database.sqlite"),
    synchronize: true,
    entities: [Room, SensorData],
});

export const InitDatabase = async () => {
    await AppDataSource.initialize();
}
