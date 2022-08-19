import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userServise: UserService) {}

    @Get()
    getUsers(): any {
        return this.userServise.findALL();
    }
    @Get(':id')
    getUserById(@Param('id') id: string): any {
        return this.userServise.findById(Number(id));
    }

    @Post()
     createUser(@Body() body: CreateUserDTO): any {
        return this.userServise.createUser(body)
     }
}
