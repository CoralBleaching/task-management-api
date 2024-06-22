import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './auth.dto'

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
}
