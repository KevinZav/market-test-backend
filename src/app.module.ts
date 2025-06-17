import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { RouterModule } from '@nestjs/core';
import { appRoutes } from './app.routes';

@Module({
  imports: [
    ApiModule,
    RouterModule.register(appRoutes)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
