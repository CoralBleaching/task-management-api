import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) {}
    
    @Post()
    insert(@Body() task: TaskDto) {
        return this.taskService.insert(task)
    }

    @Get()
    findAll() {
        this.taskService.getAll()
    }
}
