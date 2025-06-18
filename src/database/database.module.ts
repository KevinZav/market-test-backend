import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configEnvironment from 'src/config/config-environment';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [configEnvironment.KEY],
      useFactory: (configService: ConfigType<typeof configEnvironment>) => {
        const { host, port, user, password, database } = configService.database;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database,
          synchronize: true,
          autoLoadEntities: true
        }
      }
    }),
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
