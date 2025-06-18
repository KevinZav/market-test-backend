import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { localStrategy } from './strategies/local.strategy';
import { jwtStrategySecret } from './strategies/jwt-secret.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, localStrategy, jwtStrategySecret]
})
export class AuthModule {}
