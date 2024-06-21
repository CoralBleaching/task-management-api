import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    findAll() {
        return this.taskRepository.find()
    }

    findOne(id: number) {
        return this.taskRepository.findOneBy(
            {id}
        )
    }

    async remove(id: number) {
        await this.taskRepository.delete(id)
    }
}
