import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm'

@Entity()
export class Student {
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    surname: string;
}