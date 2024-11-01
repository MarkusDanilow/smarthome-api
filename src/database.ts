import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Room } from './entity/Room';
import { SensorData } from './entity/SensorData';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    entities: [Room, SensorData],
});

export const InitDatabase = async () => {
    await AppDataSource.initialize();
}
