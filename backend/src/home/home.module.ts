import { Module } from '@nestjs/common';
import { HomeProvider } from './provides/home.provider';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.providers';
import { HomeImageProvider } from './provides/homeImage.provider';
import { CategoryProvider } from './provides/category.provider';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { UserProvider } from 'src/user/user.provider';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    ...CategoryProvider,
    ...HomeImageProvider,
    ...HomeProvider,
    ...databaseProviders,
    ...UserProvider,
    HomeService,
    UserService,
  ],
  controllers: [HomeController],
})
export class HomeModule {}
