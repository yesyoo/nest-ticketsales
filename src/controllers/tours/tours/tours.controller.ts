import { Controller, Get, Param, Delete, Post, Body, Query } from '@nestjs/common';
import { ToursService } from '../../../services/tours/tours.service';
import { Tour } from 'src/shemas/tours';
import { UseGuards } from '@nestjs/common';
import { JwtGuardService } from 'src/services/Authentication/jwt-guard/jwt-guard.service';
import { TourDto } from 'src/dto/tour-dto';


@Controller('tours')
export class ToursController {

    constructor(private toursService: ToursService) {}
    // @UseGuards(JwtGuardService)
    @Get()
    getAllTours(): Promise<Tour[]> {
        console.log('get all tours')
        return this.toursService.getAllTours();
    };

    @Get('tourname')
    getTourByName(@Query() params: any): Promise<Tour[]>{
        console.log('get tour by name')
   
            return this.toursService.getTourByName(params.tourname); 
        
    };

    @Get('id')
    getTourById(@Query() params: any): Promise<Tour> {
        console.log('params.id', params.id)
        return this.toursService.getTourById(params.id);
    };
    
    @Get('country')
    getToursByCountry(@Query() params: any): Promise<Tour[]> {
        console.log('params.country', params.country)
        return this.toursService.getToursByCountry(params.country)
    }

    @Post()
    initTours(): Promise<Tour[]> {
        this.toursService.generateTours();
        return this.toursService.getAllTours()
    };

    @Delete()
    removeAllTours(): void {
       this.toursService.deleteTours();
    };

    @Delete(':id')
    removeById(@Param('id') id): Promise<Tour> {
        console.log('we delete user id:', id)
        return this.toursService.deleteTourById(id)
    };
    
}
