import { Body, Controller, Get, Param, Patch, ValidationPipe, Post, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/user/user.decorator';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatus } from './entities/todo.entity';
import { TodoStatusValidationPipe } from './pipes/todoStatusValidation.pipe';
import { TodoService } from './todo.service';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
    constructor(private todoService: TodoService)
    {}

    @Get()
    getAllTodo(
        @User() user: UserEntity

    ) { 
        return this.todoService.getAllTodo(user);
    }

    @Post()
    createNewTodo(@Body(ValidationPipe) data: CreateTodoDto,
        @User() user: UserEntity
    ) {
        //const {title, description} = data
        return this.todoService.createTodo(data, user)
    }

    @Patch(":id")
    updateTodo(
        @Body("status", TodoStatusValidationPipe) status: TodoStatus,
        @Param("id") id: number,
        @User() user: UserEntity
    ) {
        return this.todoService.update(id, status, user);
    }

    @Delete (":id")
    deleteTodo(@Param("id") id: number,
                @User() user: UserEntity) {
        return this.todoService.delete(id, user);
    }


}
