import { Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { type } from 'os';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags ('users')
@Controller('user')
export class UserController {
    constructor(private userServise: UserService) {
         
    }

    /*
    // Get all elements
    @ApiOkResponse({ type: UserEntity, isArray: true })  
    @ApiQuery({ name: 'name' , required: false })
    @Get()
    getUsers(@Query('name') name?: string): UserEntity[] {
        return this.userServise.findALL(name );
    }

    // Get element by id 
    @ApiNotFoundResponse({ type: UserEntity, description: 'The User' })
    @Get(':id')
    getUserById(@Param('id') id: string): UserEntity {
        const user = this.userServise.findById(Number(id));

        if (!user) {
            throw new NotFoundException
        }
        return user
    }
    */
    
    // Post element
    //@ApiCreatedResponse({ type: UserEntity })
    @Post('register')
    registration(@Body() createDTO: CreateUserDTO) {
        return this.userServise.createUser(createDTO)
    }

    @Post('login')
    signin(@Body() loginDTO: LoginUserDTO) {
        return this.userServise.loginUser(loginDTO)
    }

    @Get('users')
    getUsers() {
        return this.userServise.getAllUsers();
    }
}
