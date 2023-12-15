import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
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

    @Get(':name')
    getTourByName(@Param('name') name: string): Promise<Tour[]> {
        console.log('get tour by name')
        return this.toursService.getTourByName(name);
    };

    @Get(':id')
    getTourById(@Param('id') id): Promise<Tour> {
        return this.toursService.getTourById(id);
    };

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
