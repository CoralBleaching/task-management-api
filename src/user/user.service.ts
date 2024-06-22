import { Injectable } from '@nestjs/common'
import { UserDto } from './user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRespository: Repository<User>,
  ) {}

  findOne(id: number) {
    return this.userRespository.findOne({
      where: { id },
    })
  }
}
