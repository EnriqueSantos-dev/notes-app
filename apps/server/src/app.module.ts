import { Module } from '@nestjs/common';
import { AuthModule } from './@modules/auth/auth.module';
import { DatabaseModule } from './@modules/database/database.module';
import { UsersModule } from './@modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate(config) {
        const envSchema = z.object({
          PORT: z.coerce.number().optional().default(3000),
          DATABASE_URL: z.string().url(),
          JWT_SECRET: z.string(),
        });

        return envSchema.parse(config);
      },
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
