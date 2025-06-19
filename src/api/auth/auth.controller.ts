import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { createAuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles/roles.guard';
import { RoleEnum } from './enums/roles.enum';


@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ){}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() request) {
    return this.authService.generateJwt(request.user);
  }

  @Post('register')
  async register(@Body() payload: createAuthDto) {
    const user = await this.authService.create(payload);
    
    return this.authService.generateJwt(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  async getUser(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(RoleEnum.admin))
  @Get('all')
  async getUsers(@Query('search') search: string) {
    return await this.authService.getUsers(search);
  }
}
