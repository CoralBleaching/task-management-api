import { IsNotEmpty, IsString } from 'class-validator'

export enum TaskStatus {
  PENDING = 'pending',
  CONCLUDED = 'concluded',
}

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  status: TaskStatus
}
