import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { Request } from 'express'
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard'

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Req() req: Request) {
    return req.user
  }
}
