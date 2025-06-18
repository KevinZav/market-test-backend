import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createAuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async create(payload: createAuthDto) {
    const userExists = await this.userRepository.findOneBy({
      email: payload.email
    });
    if (userExists) {
      throw new BadRequestException('Could not create duplicated user');
    }

    const user = this.userRepository.create(payload);
    return await this.userRepository.save(user);
  }

  private async getUser(email: string) {
    const user = await this.userRepository.findOneBy({email});

    if (!user) {
      throw new NotFoundException('Could not be found auth by username');
    }

    return user;
  }

  public async validateAuth(email: string, password: string) {
    const user = await this.getUser(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) return user;

    return null;
  }

  public generateJwt(user: User) {
    const payload = {
      role: user.role,
      email: user.email
    };
    return {
      token: this.jwtService.sign(payload),
      payload
    }
  }
}
