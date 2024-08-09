import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

@Entity()
export class Task {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string
    @Column({nullable: true})
    description: string

    @Column()
    status: TaskStatus

    @Column({nullable:true})
    initialDate?: Date

    @Column({nullable:true})
    endDate?: Date
}