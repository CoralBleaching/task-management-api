import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() auth: AuthDto) {
    return this.authService.signUp(auth)
  }

  @Post('signin')
  signIn(@Body() auth: Partial<AuthDto>) {
    return this.authService.signIn(auth)
  }
}
