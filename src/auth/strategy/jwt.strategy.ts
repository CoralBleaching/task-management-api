import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    })
  }
  async validate(payload: {
    sub: number
    email: string
    tokenVersion: number
  }): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    })
    if (!user) {
      throw new UnauthorizedException()
    }
    if (user.tokenVersion !== payload.tokenVersion) {
      throw new UnauthorizedException('Token is invalid.')
    }
    delete user.password
    return user
  }
}
