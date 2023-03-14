import {Base, TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {Prop} from "@typegoose/typegoose";

export interface TrainModel extends Base{}

export class TrainModel extends TimeStamps{
    @Prop()
    fromPlace:string

    @Prop()
    toPlace:string

    @Prop()
    departureTime: string

    @Prop()
    availablePlaces: number
}

