import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TourDto } from 'src/dto/tour-dto';
import { TourDocument, Tour } from 'src/shemas/tours';
import { Model } from 'mongoose';
import { ITourClient } from '../../interfaces/tour';
import { ITour } from '../../interfaces/tour';


@Injectable()
export class ToursService {
    private toursCount: number = 10;

    constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {}

    generateTours(): void {
        console.log('generate i tours')
        for (let i = 0; i <= this.toursCount; i++) {
            const tour = new TourDto('test' + i, 'test country', 'test city','test desc', 'test operator', 'test price', '')
            const tourData = new this.tourModel(tour)
            tourData.save()
        }
    };

    async getToursByCountry(data: string): Promise<Tour[]> {
        console.log('456')
        return this.tourModel.find({"country": data})
    }

    async deleteTours(): Promise<any> {
        return this.tourModel.deleteMany()
    };

    async deleteTourById(id: string): Promise<Tour> {
        return this.tourModel.findByIdAndDelete(id)
    };

    async getTourById(data: string): Promise<Tour> {
        return this.tourModel.findOne({"_id": data})
    };

    async getAllTours(): Promise<Tour[]> {
        return this.tourModel.find()
    };

    async uploadTour(body: ITourClient) {
        const tour = new TourDto(body.name, body.country, body.city, body.description, body.tourOperator, body.price, body.img)
        const tourData = new this.tourModel(tour)
        await tourData.save()
    };

    async getTourByName(name: string): Promise<ITour[]> {
        return this.tourModel.find({name: { "$regex": name, "$options": "i" }})
    };
 }
