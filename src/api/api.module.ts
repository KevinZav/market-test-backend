import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { apiRouter } from './api.routes';

@Module({
  imports: [
    AuthModule,
    RouterModule.register(apiRouter)
  ]
})
export class ApiModule {}
