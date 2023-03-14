import {Injectable, NotFoundException} from '@nestjs/common';
import {TrainModel} from "./train.model";
import {ModelType} from "@typegoose/typegoose/lib/types";
import {InjectModel} from "nestjs-typegoose";
import {TrainDto} from "./dto/train.dto";

@Injectable()
export class TrainService {
    constructor(
        @InjectModel(TrainModel) private readonly TrainModel: ModelType<TrainModel>
    ) {
    }

    async create(dto: TrainDto) {

        const newTrain = await this.TrainModel.create(dto)

        return newTrain

    }

    async getById(_id: string) {
        const train = await this.TrainModel.findById(_id).exec()

        if (!train) throw new NotFoundException('Train not found')

        return train
    }



    async getAll(fromPlace?: string, toPlace?:string) {
        let options = {}

        if (fromPlace && toPlace) {
            options = {
                $and: [
                    {
                        fromPlace: new RegExp(fromPlace, 'i'),
                        toPlace: new RegExp(toPlace, 'i'),
                    },
                ],
            }
            return  this.TrainModel.find(options).select('-createdAt -updatedAt -__v').sort({ departureTime: 'asc', availablePlaces: 'desc' }).exec()
        }

        if (fromPlace) {
            options = {
                $or: [
                    {
                        fromPlace: new RegExp(fromPlace, 'i'),
                    },
                ],
            }
            return  this.TrainModel.find(options).select('-createdAt -updatedAt -__v').sort({ departureTime: 'asc', availablePlaces: 'desc' }).exec()
        }
        if (toPlace) {
            options = {
                $or: [
                    {
                        toPlace: new RegExp(toPlace, 'i'),
                    },
                ],
            }
            return  this.TrainModel.find(options).select('-createdAt -updatedAt -__v').sort({ departureTime: 'asc', availablePlaces: 'desc' }).exec()
        }

        const allTrains = this.TrainModel.find(options).select('-createdAt -updatedAt -__v').sort({ departureTime: 'asc', availablePlaces: 'desc' }).exec()
        return allTrains
    }


    async updateTrain(_id: string, dto:TrainDto) {

        return this.TrainModel.findByIdAndUpdate(_id, dto, { new: true }).exec()
    }


    async delete(id: string) {
        return this.TrainModel.findByIdAndDelete(id).exec()
    }
}

