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
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(auth: AuthDto): Promise<{ access_token: string }> {
    const hash = await argon.hash(auth.password)
    const user = this.userRepository.create({
      firstName: auth.firstName,
      lastName: auth.lastName,
      email: auth.email,
      password: hash,
    })
    this.userRepository.save(user).catch((_err: QueryFailedError) => {
      throw new ForbiddenException(`Email ${user.email} already registered.`)
    })
    return { access_token: await this.signToken(user.id, user.email) }
  }

  async signIn(auth: Partial<AuthDto>): Promise<{ access_token: string }> {
    const user = await this.findOne({ email: auth.email })
    if (!user) {
      throw new ForbiddenException('Invalid credentials (email)')
    }
    const match = await argon.verify(user.password, auth.password)
    if (!match) {
      throw new ForbiddenException('Invalid credentials (password)')
    }
    return { access_token: await this.signToken(user.id, user.email) }
  }

  signToken(id: number, email: string): Promise<string> {
    const payload = {
      sub: id,
      email,
    }
    const expirationTime = this.configService.get<string>('JWT_EXPIRES_IN')
    console.log(expirationTime)
    return this.jwt.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'), // TODO: get rid of magic strings
      expiresIn: expirationTime,
    })
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
