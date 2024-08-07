import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from 'src/user/user.entity'
import { TaskStatus } from './TaskStatus'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ nullable: true })
  description: string

  @Column({
    type: 'enum',
    enum: TaskStatus,
    nullable: false,
  })
  status: TaskStatus

  @Column({ nullable: true })
  deadline: Date

  @ManyToOne(() => User, (user: User) => user.tasks)
  user: User
}
