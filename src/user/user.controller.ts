import { Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { type } from 'os';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags ('users')
@Controller('user')
export class UserController {
    constructor(private userServise: UserService) {}

    // Get all elements
    @ApiOkResponse({ type: User, isArray: true })  
    @ApiQuery({ name: 'name' , required: false })
    @Get()
    getUsers(@Query('name') name?: string): User[] {
        return this.userServise.findALL(name );
    }

    // Get element by id 
    @ApiNotFoundResponse({ type: User, description: 'The User' })
    @Get(':id')
    getUserById(@Param('id') id: string): User {
        const user = this.userServise.findById(Number(id));

        if (!user) {
            throw new NotFoundException
        }
        return user
    }
    
    // Post element
    @ApiCreatedResponse({ type: User })
    @Post()
     createUser(@Body() body: CreateUserDTO): User {
        return this.userServise.createUser(body)
     }
}
