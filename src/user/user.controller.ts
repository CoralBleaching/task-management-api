import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'

@Controller('user')
export class UserController {
  // constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  findOne(@Req() req: Request) {
    console.log('haha')
    return req.user
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() userDto: UserDto) {
  //   return this.userService.update(+id, userDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id)
  // }
}
