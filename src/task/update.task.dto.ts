import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { TaskStatus } from './TaskStatus'

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus
}
