import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { TaskStatus } from './TaskStatus'
import { Transform } from 'class-transformer'

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

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  deadline: Date
}
