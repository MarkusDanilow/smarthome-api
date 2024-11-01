import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, Generated } from 'typeorm';
import { SensorData } from './SensorData';

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name: string = "";

}
