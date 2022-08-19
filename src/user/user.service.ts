import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
    private users: any = [{ id: 0, name: "Mohamed" }, { id: 1, name: "Moustapha" }]

    findALL() {
        return this.users;
    }

    findById(userId: number) {
        return this.users.find((user: any) => user.id === userId);
    }

    createUser(createUserDTO: CreateUserDTO) {
        const newUser = { id: Date.now(), ...createUserDTO }
        this.users.push(newUser)

        return newUser
    }
} 
