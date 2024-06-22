import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './task.dto'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async insert(task: CreateTaskDto) {
    const newTask = this.taskRepository.create(task)
    console.log(newTask)
    return this.taskRepository.save(newTask)
  }

  getAll() {
    return this.taskRepository.find()
  }

  findOneById(id: number) {
    return this.taskRepository.findOneBy({ id })
  }

  async remove(id: number) {
    await this.taskRepository.delete(id)
  }
}
