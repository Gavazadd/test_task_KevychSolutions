import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypegooseModule} from "nestjs-typegoose";
import {getMongoDbConfig} from "./config/mongo.config";
import { TrainModule } from './train/train.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypegooseModule.forRootAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory:getMongoDbConfig
      }),
      TrainModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
