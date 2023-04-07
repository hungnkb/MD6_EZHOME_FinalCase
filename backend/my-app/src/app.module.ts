import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule.register([
      {
        path: 'api/v1/',
        children: [
          {
            path: 'users',
            module: UserModule,
          }
        ]
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
