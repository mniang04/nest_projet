import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @MessagePattern('createTodo')
  create(@Payload() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @MessagePattern('findAllTodos')
  findAll() {
    return this.todosService.findAll();
  }

  @MessagePattern('findOneTodo')
  findOne(@Payload() id: number) {
    return this.todosService.findOne(id);
  }

  @MessagePattern('updateTodo')
  update(@Payload() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(updateTodoDto.id, updateTodoDto);
  }

  @MessagePattern('removeTodo')
  remove(@Payload() id: number) {
    return this.todosService.remove(id);
  }
}
