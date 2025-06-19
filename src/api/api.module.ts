import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { apiRouter } from './api.routes';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    AuthModule,
    RouterModule.register(apiRouter),
    ProductsModule,
  ]
})
export class ApiModule {}
