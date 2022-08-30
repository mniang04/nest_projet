import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import * as bcrypt from 'bcryptjs'
import { TodoEntity } from "src/todo/entities/todo.entity";


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    nom_user: string;

    @Column()
    prenom_user: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    entreprise_user : string

    @Column()
    poste_user: string;

    @Column()
    mail_user: string;

    @Column()
    tel_user: string;

    @Column()
    status : UserStatus

    @OneToMany(() => TodoEntity, (todo) => todo.user )
    todo: TodoEntity[]

    /* @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 20);
    }
    */
    async verifyPassword(password: string){
        return await bcrypt.compare(password, this.password)
    }
     
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    DESACTIVE = 'DESACTIVER',

}