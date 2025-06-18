import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import configEnvironment from 'src/config/config-environment';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [configEnvironment.KEY],
      useFactory: async (configService: ConfigType<typeof configEnvironment>) => {
        const { secret, expireTime } = configService.jwtSeed;
        return {
          secret,
          signOptions: {
            expiresIn: expireTime,
          },
        };
      },
    }),
  ],
  exports: [JwtModule]
})
export class JwtTokenModule {}
