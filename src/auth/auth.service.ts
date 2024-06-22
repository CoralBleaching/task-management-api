import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { AuthDto } from './auth.dto'
import * as argon from 'argon2'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryFailedError, Repository } from 'typeorm'
import { User } from 'src/user/user.entity'

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
    let saved = await this.userRepository
      .save(newUser)
      .catch((_err: QueryFailedError) => {
        throw new ForbiddenException(
          `Email ${newUser.email} already registered.`,
        )
      })
    delete saved.password
    return saved
  }

  async signIn(auth: Partial<AuthDto>): Promise<User> {
    const user = await this.findOne({ email: auth.email })
    if (!user) {
      throw new ForbiddenException('Invalid credentials (email)')
    }
    console.log(user)
    console.log(await argon.hash(auth.password))
    const match = await argon.verify(user.password, auth.password)
    if (!match) {
      throw new ForbiddenException('Invalid credentials (password)')
    }
    delete user.password
    return user
  }

  findOne(searchParams: { id?: number; email?: string }): Promise<User> {
    const { id, email } = searchParams
    if (id) {
      return this.userRepository.findOne({
        where: { id },
      })
    } else if (email) {
      return this.userRepository.findOne({
        where: { email },
      })
    } else {
      throw new BadRequestException(
        'Need id or email in order to find one user.',
      )
    }
  }

  // update(id: number, _authDto: AuthDto) {
  //   return `This action updates a #${id} auth`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`
  // }
}
