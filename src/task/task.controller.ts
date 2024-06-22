import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './create.task.dto'
import { TaskStatus } from './TaskStatus'
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard'
import { Request } from 'express'
import { User } from 'src/user/user.entity'
import { UpdateTaskDto } from './update.task.dto'

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: Request, @Body() newTask: CreateTaskDto) {
    const user = req.user as User
    return this.taskService.create(newTask, user)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: Request, @Query('status') status?: TaskStatus) {
    const user = req.user as User
    return this.taskService.findAll(user, status)
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateOne(@Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as User
    const taskId = +id
    return this.taskService.remove(taskId, user)
  }
}
