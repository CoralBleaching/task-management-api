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
  private expiresIn: string

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {
    this.expiresIn = this.configService.get<string>('JWT_EXPIRES_IN')
  }

  async signUp(auth: AuthDto): Promise<{ access_token: string }> {
    const hash = await argon.hash(auth.password)
    const newUser = this.userRepository.create({
      firstName: auth.firstName,
      lastName: auth.lastName,
      email: auth.email,
      password: hash,
    })
    const user = await this.userRepository
      .save(newUser)
      .catch((_err: QueryFailedError) => {
        throw new ForbiddenException(
          `Email ${newUser.email} already registered.`,
        )
      })
    return {
      access_token: await this.signToken(
        user.id,
        user.email,
        user.tokenVersion,
      ),
    }
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
    return {
      access_token: await this.signToken(
        user.id,
        user.email,
        user.tokenVersion,
      ),
    }
  }

  async signOut(user: User): Promise<any> {
    user.tokenVersion += 1
    await this.userRepository.save(user)
    return { message: 'User signed out successfully.' }
  }

  signToken(id: number, email: string, tokenVersion: number): Promise<string> {
    const payload = {
      sub: id,
      email: email,
      tokenVersion: tokenVersion,
    }
    return this.jwt.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.expiresIn,
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
}
