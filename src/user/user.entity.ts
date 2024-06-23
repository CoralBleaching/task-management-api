import { Task } from 'src/task/task.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: 0 })
  tokenVersion: number

  @OneToMany(() => Task, (task: Task) => task.user)
  tasks: Task[]
}
