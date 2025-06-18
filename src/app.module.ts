import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { RouterModule } from '@nestjs/core';
import { appRoutes } from './app.routes';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environments/environments';
import { DatabaseModule } from './database/database.module';
import configEnvironment from './config/config-environment';
import * as Joi from 'joi';
import { JwtTokenModule } from './api/auth/jwt-token/jwt-token.module';

@Module({
  imports: [
    ApiModule,
    RouterModule.register(appRoutes),
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV || 'dev'],
      isGlobal: true,
      load: [configEnvironment],
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        JWT_SEED_PUBLIC: Joi.string().required(),
        JWT_SEED_SECRET: Joi.string().required(),
        JWT_SEED_EXPIRETIME: Joi.string().required(),
      })
    }),
    DatabaseModule,
    JwtTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
