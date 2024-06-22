import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { TaskStatus } from './TaskStatus'

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsEnum(TaskStatus)
  status: TaskStatus
}
