import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { authLoginDto, createAuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles/roles.guard';
import { RoleEnum } from './enums/roles.enum';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: authLoginDto })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        token: 'string',
        payload: { role: 'string', email: 'string', name: 'string' },
      },
    },
  })
  async login(@Request() request) {
    return this.authService.generateJwt(request.user);
  }

  @Post('register')
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        token: 'string',
        payload: { role: 'string', email: 'string', name: 'string' },
      },
    },
  })
  async register(@Body() payload: createAuthDto) {
    const user = await this.authService.create(payload);

    return this.authService.generateJwt(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  @ApiResponse({
    status: 200,
    schema: { example: { id: 1, name: 'string', email: '', role: '' } },
  })
  async getUser(@Request() req) {
    return await this.authService.getuserWithoutPassword(req.user.email);
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(RoleEnum.admin))
  @Get('all')
  @ApiResponse({ status: 200, schema: { example: { users: [] } } })
  async getUsers(@Query('search') search: string) {
    const users = await this.authService.getUsers(search);
    return {
      users,
    };
  }
}
