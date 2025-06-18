import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      database: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT || '', 10),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
    },
    jwtSeed: {
      public: process.env.JWT_SEED_PUBLIC,
      secret: process.env.JWT_SEED_SECRET,
      expireTime: process.env.JWT_SEED_EXPIRETIME
    },
  };
});
