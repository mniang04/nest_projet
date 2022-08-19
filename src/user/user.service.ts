import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    private users: User[] = [
        { id: 0, name: "Mohamed" }, 
        { id: 1, name: "Moustapha" },
        { id: 2, name: "Nogaye " }
    ]

    findALL(name?: string): User[] {

        if (name) {
            return this.users.filter((user: any) => user.name === name);
        }
        return this.users;
    }

    findById(userId: number): User {
        return this.users.find((user: any) => user.id === userId);
    }

    createUser(createUserDTO: CreateUserDTO): User {
        const newUser = { id: Date.now(), ...createUserDTO }
        this.users.push(newUser)

        return newUser 
    }
} 
