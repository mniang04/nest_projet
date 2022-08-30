import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity() 
export class TodoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status : TodoStatus
 
    @ManyToOne( () => UserEntity, (user) => user.todo)
    user: UserEntity

    @Column()
    user_id: number

}

export enum TodoStatus {
    OPEN = 'OPEN',
    WIP = 'WIP',
    COMPLETED = 'COMPLETED' 
}