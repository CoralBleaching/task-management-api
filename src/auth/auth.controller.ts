import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './auth.dto'
import { User } from 'src/user/user.entity'
import { JwtAuthGuard } from './jwt.auth.guard'
import { Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() auth: AuthDto) {
    return this.authService.signUp(auth)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() auth: Partial<AuthDto>) {
    return this.authService.signIn(auth)
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  async signOut(@Req() req: Request) {
    const user = req.user as User
    return this.authService.signOut(user)
  }
}
