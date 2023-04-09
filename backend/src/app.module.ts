import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule.register([
      {
        path: 'api/v1/',
        children: [
          {
            path: 'users',
            module: UserModule,
          },
          {
            path: 'auth',
            module: AuthModule,
          }
        ]
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
