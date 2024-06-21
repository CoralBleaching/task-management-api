import { Body, Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) {}
    
    // @Post()
    // create(@Body() task: TaskDto)

    @Get()
    findAll() {
        this.taskService.findAll()
    }
}
