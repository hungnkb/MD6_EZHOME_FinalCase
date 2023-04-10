import { Module } from '@nestjs/common';
import { HomeProvider } from './provides/home.provider';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.providers';
import { HomeImageProvider } from './provides/homeImage.provider';
import { CategoryProvider } from './provides/category.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...CategoryProvider,
    ...HomeImageProvider,
    ...HomeProvider,
    ...databaseProviders,
    HomeService
  ],
  controllers: [HomeController]
})
export class HomeModule { }
