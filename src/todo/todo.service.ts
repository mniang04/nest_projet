import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoEntity, TodoStatus } from './entities/todo.entity';

@Injectable()
export class TodoService {
    
    constructor(@InjectRepository(TodoEntity) private repo: Repository<TodoEntity>)  {
        
    }

    async getAllTodo(user: UserEntity) {

        const query = await this.repo.createQueryBuilder('todo');
        query.where(`todo.user_id = : user_id`, {user_id: user.user_id})
        
        try {
            return await query.getMany(); 
        } catch (err) {            
            throw new NotFoundException('Not Found Todo')
        }
    }

    async createTodo(createTodoDTO: CreateTodoDto, user: UserEntity){
        const todo = new TodoEntity();
        const {title, description} = createTodoDTO;
        todo.title = title;
        todo.description = description;
        todo.status = TodoStatus.OPEN;
        todo.user_id = user.user_id 
    
        this.repo.create(todo);
        try {
          return await this.repo.save(todo);
        } catch (err) {
            console.log(err.stack);
            
          throw new InternalServerErrorException('Something went wrong, todo not created');
    
        }
    
    }


    async update(id: number, status: TodoStatus, user: UserEntity) {
        try {
            await this.repo.update({id, user_id: user.user_id}, {status});
            return this.repo.findOne({where: {id}});
        } catch (err) {
            throw new InternalServerErrorException('Something went wrong');
        }

    }

    async delete(id: number, user: UserEntity) {
        const result = await this.repo.delete({id});

        if (result.affected === 0) {
            throw new NotFoundException('Todo not deleted');
        } else {
            return { success: true}
        }

    }

}
