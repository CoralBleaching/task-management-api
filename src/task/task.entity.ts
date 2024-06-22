import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TaskStatus } from './task.dto'
import { User } from 'src/user/user.entity'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: false })
  title: string

  @Column({ nullable: false })
  description: string

  @Column({
    type: 'enum',
    enum: TaskStatus,
  })
  status: TaskStatus

  @ManyToOne(() => User, (user: User) => user.tasks)
  user: User
}
