import { Module } from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainController } from './train.controller';
import {TypegooseModule} from "nestjs-typegoose";
import {ConfigModule} from "@nestjs/config";
import {TrainModel} from "./train.model";

@Module({
  providers: [TrainService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TrainModel,
        schemaOptions: {
          collection: 'Train',
        },
      },
    ]),
    ConfigModule,
  ],
  controllers: [TrainController]
})
export class TrainModule {}
