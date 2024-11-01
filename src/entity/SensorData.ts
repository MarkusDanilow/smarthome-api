import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class SensorData {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('float')
    temperature: number = 0;

    @Column('float')
    humidity: number = 0;

    @CreateDateColumn()
    timestamp: Date = new Date();

    @Column('int')
    room: number = 0
}
