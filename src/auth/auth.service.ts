import { ForbiddenException, Injectable } from '@nestjs/common'
import { AuthDto } from './auth.dto'
import * as argon from 'argon2'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryFailedError, Repository } from 'typeorm'
import { User } from 'src/user/user.entity'
import { UserDto } from 'src/user/user.dto'
import { log } from 'console'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(auth: AuthDto) {
    const hash = await argon.hash(auth.password)
    const newUser = this.userRepository.create({
      firstName: auth.firstName,
      lastName: auth.lastName,
      email: auth.email,
      password: hash,
    })
    return this.userRepository.save(newUser).catch((err: QueryFailedError) => {
      throw new ForbiddenException(`Email ${newUser.email} already registered.`)
    })
  }

  findAll() {
    return `This action returns all auth`
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`
  }

  update(id: number, authDto: AuthDto) {
    return `This action updates a #${id} auth`
  }

  remove(id: number) {
    return `This action removes a #${id} auth`
  }
}
