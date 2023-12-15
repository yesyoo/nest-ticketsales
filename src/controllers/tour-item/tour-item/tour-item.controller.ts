import { Controller, Post, UseInterceptors, Body, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ToursService } from '../../../services/tours/tours.service';
import { ITourClient } from '../../../interfaces/tour';



@Controller('tour-item')

export class TourItemController {
    constructor(private toursService: ToursService) {}
    static imgName: string;

    @Post()
    @UseInterceptors(FileInterceptor('img', {
        storage: diskStorage(
            {
                destination: './public/',
                filename: (req, file, newName) => {
                    const imgType = file.mimetype.split('/');
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const imgName = file.fieldname + '-' + uniqueSuffix + '.' + imgType[1];
                    newName(null, imgName)
                    TourItemController.imgName = imgName
                }
            }
        )
    }))
    initTour(@Body() body: ITourClient): void {
        body.img = TourItemController.imgName;
        this.toursService.uploadTour(body)
    };

    @Get(':name')
    getTourByName(@Param('name') name: string): any {
        return this.toursService.getTourByName(name)
    }ж
}
