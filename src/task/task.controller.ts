import { Body, Controller, Get, Post } from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './task.dto'

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  insert(@Body() task: CreateTaskDto) {
    return this.taskService.insert(task)
  }

  @Get()
  findAll() {
    this.taskService.getAll()
  }
}
