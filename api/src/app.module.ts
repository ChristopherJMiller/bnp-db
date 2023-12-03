import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './db';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

// 3rd Party Modules
const LIBRARY_IMPORTS = [
  ConfigModule.forRoot({ isGlobal: true, envFilePath: [".env.development", ".env"] }),
  TypeOrmModule.forRoot(getDatabaseConfig()),
];

// Application Feature Imports
const FEATURE_IMPORTS = [
  UsersModule,
  AuthModule,
];

// App Module Configuration
@Module({
  imports: [
    ...LIBRARY_IMPORTS,
    ...FEATURE_IMPORTS,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
