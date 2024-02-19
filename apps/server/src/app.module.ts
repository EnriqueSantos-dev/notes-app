import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './@modules/auth/auth.module';
import { DatabaseModule } from './@modules/database/database.module';
import { UsersModule } from './@modules/users/users.module';
import { envSchema } from './@shared/config/env-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => envSchema.parse(config),
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
