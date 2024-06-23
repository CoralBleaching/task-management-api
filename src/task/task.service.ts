import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './create.task.dto'
import { TaskStatus } from './TaskStatus'
import { User } from 'src/user/user.entity'
import { UpdateTaskDto } from './update.task.dto'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(task: CreateTaskDto, user: User): Promise<Task> {
    const newTask = this.taskRepository.create(task)
    newTask.user = user
    return this.taskRepository.save(newTask)
  }

  async findAll(user: User, status?: TaskStatus): Promise<Task[]> {
    const where: any = { user }
    if (status) {
      where.status = status
    }
    return this.taskRepository.find({ where })
  }

  async update(updateTaskDto: UpdateTaskDto): Promise<Task> {
    const id = updateTaskDto.id
    const task = await this.taskRepository.findOneBy({ id })
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }
    if (updateTaskDto.title) {
      task.title = updateTaskDto.title
    }
    if (updateTaskDto.description) {
      task.description = updateTaskDto.description
    }
    if (updateTaskDto.status) {
      task.status = updateTaskDto.status
    }
    if (updateTaskDto.deadline) {
      task.deadline = updateTaskDto.deadline
    }

    await this.taskRepository.save(task)
    return task
  }

  async remove(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id })
    if (!task) {
      throw new NotFoundException(`Couldn't find task with id ${id}.`)
    }
    if (task.user.id !== user.id) {
      throw new UnauthorizedException(
        'User is not authorized to delete this task.',
      )
    }
    return this.taskRepository.remove(task)
  }
}
